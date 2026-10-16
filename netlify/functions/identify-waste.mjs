import { GoogleGenAI } from "@google/genai";


const MODEL =
  "gemini-3.5-flash-lite";


const SUPPORTED_WASTE_TYPES = [
  "PET plastic bottle",
  "HDPE plastic container",
  "plastic bag or film",
  "paper",
  "cardboard",
  "glass bottle or jar",
  "aluminium can",
  "other metal can",
  "food or organic waste",
  "household battery",
  "electronic waste",
  "textile or clothing",
  "used cooking oil",
  "medical or hazardous waste",
  "unknown or unsupported",
];


const responseSchema = {
  type: "object",

  properties: {
    identified: {
      type: "boolean",
    },

    itemName: {
      type: "string",
    },

    material: {
      type: "string",
    },

    category: {
      type: "string",

      enum: [
        "Plastic",
        "Paper / Cardboard",
        "Glass",
        "Metal",
        "Organic",
        "Battery",
        "E-Waste",
        "Textile",
        "Oil",
        "Hazardous / Medical",
        "Other",
        "Unknown",
      ],
    },

    matchedWasteType: {
      type: "string",
      enum:
        SUPPORTED_WASTE_TYPES,
    },

    confidence: {
      type: "number",
    },

    description: {
      type: "string",
    },

    uncertaintyReason: {
      type: "string",
    },
  },

  required: [
    "identified",
    "itemName",
    "material",
    "category",
    "matchedWasteType",
    "confidence",
    "description",
    "uncertaintyReason",
  ],
};



export default async function handler(
  request
) {
  if (
    request.method !== "POST"
  ) {
    return Response.json(
      {
        success: false,
        error:
          "Method not allowed.",
      },
      {
        status: 405,
      }
    );
  }


  const apiKey =
    process.env.GEMINI_API_KEY;


  if (!apiKey) {
    console.error(
      "GEMINI_API_KEY is missing."
    );


    return Response.json(
      {
        success: false,

        error:
          "Climatica AI is not configured.",
      },
      {
        status: 500,
      }
    );
  }


  try {
    const body =
      await request.json();


    const imageData =
      body?.imageData;


    const mimeType =
      body?.mimeType;


    if (
      !imageData ||
      typeof imageData !==
        "string"
    ) {
      return Response.json(
        {
          success: false,

          error:
            "No image was supplied.",
        },
        {
          status: 400,
        }
      );
    }


    if (
      !mimeType ||
      !mimeType.startsWith(
        "image/"
      )
    ) {
      return Response.json(
        {
          success: false,

          error:
            "Invalid image type.",
        },
        {
          status: 400,
        }
      );
    }


    /*
     * Protect the serverless
     * function from huge uploads.
     */

    if (
      imageData.length >
      5_000_000
    ) {
      return Response.json(
        {
          success: false,

          error:
            "The image is too large. Please use a smaller photo.",
        },
        {
          status: 413,
        }
      );
    }


    const ai =
      new GoogleGenAI({
        apiKey,
      });


    const response =
      await ai.models.generateContent({
        model:
          MODEL,

        contents: [
          {
            inlineData: {
              mimeType,
              data:
                imageData,
            },
          },

          {
            text: `
You are Climatica's waste-identification system.

Study the image and identify the MAIN physical item
the user is likely trying to dispose of, recycle,
reuse or understand.

Your job is classification only.

Do NOT:
- invent recycling locations
- provide disposal instructions
- claim local recycling availability
- invent environmental facts

Climatica's verified waste database will provide
that information separately.

Choose the closest supported waste type:

${SUPPORTED_WASTE_TYPES
  .map(
    (type) =>
      `- ${type}`
  )
  .join("\n")}

Rules:

1. Focus on the clearest main object.
2. Identify the likely material where possible.
3. confidence must be between 0 and 1.
4. If the object is unclear, set identified to false.
5. If confidence is below 0.55, set identified to false.
6. Do not pretend certainty.
7. Keep description short and factual.
8. uncertaintyReason should be empty when identification is clear.

Return only the requested structured JSON.
            `,
          },
        ],

        config: {
          responseMimeType:
            "application/json",

          responseSchema,
        },
      });


    if (
      !response.text
    ) {
      throw new Error(
        "Gemini returned an empty response."
      );
    }


    const result =
      JSON.parse(
        response.text
      );


    const confidence =
      Number(
        result.confidence
      );


    const safeConfidence =
      Number.isFinite(
        confidence
      )
        ? Math.max(
            0,
            Math.min(
              1,
              confidence
            )
          )
        : 0;


    const safeResult = {
      identified:
        Boolean(
          result.identified
        ) &&
        safeConfidence >=
          0.55,

      itemName:
        result.itemName ||
        "Unknown item",

      material:
        result.material ||
        "Unknown",

      category:
        result.category ||
        "Unknown",

      matchedWasteType:
        SUPPORTED_WASTE_TYPES.includes(
          result.matchedWasteType
        )
          ? result.matchedWasteType
          : "unknown or unsupported",

      confidence:
        safeConfidence,

      description:
        result.description ||
        "",

      uncertaintyReason:
        result.uncertaintyReason ||
        "",
    };


    return Response.json(
      {
        success: true,

        result:
          safeResult,
      }
    );

  } catch (error) {
    console.error(
      "Climatica AI error:",
      error
    );


    /*
     * Temporary AI overload.
     */

    if (
      error?.status === 503 ||
      String(
        error?.message
      ).includes("503")
    ) {
      return Response.json(
        {
          success: false,

          error:
            "Climatica AI is temporarily busy. Please try again in a moment.",
        },
        {
          status: 503,
        }
      );
    }


    return Response.json(
      {
        success: false,

        error:
          "Climatica could not analyse this image. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}


export const config = {
  path:
    "/api/identify-waste",
};