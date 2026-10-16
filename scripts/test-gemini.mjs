import fs from "node:fs";
import path from "node:path";
import { GoogleGenAI } from "@google/genai";


/* =========================================================
   CHECK API KEY
========================================================= */

const apiKey =
  process.env.GEMINI_API_KEY;


if (!apiKey) {
  console.error(
    "❌ GEMINI_API_KEY was not found."
  );

  console.error(
    "Make sure your .env file exists in the project root."
  );

  process.exit(1);
}



/* =========================================================
   IMAGE
========================================================= */

const imagePath =
  path.resolve(
    "src/assets/identify-bottle-demo.jpg"
  );


if (
  !fs.existsSync(imagePath)
) {
  console.error(
    "❌ Test image not found:"
  );

  console.error(
    imagePath
  );

  process.exit(1);
}


const imageBase64 =
  fs.readFileSync(
    imagePath,
    {
      encoding: "base64",
    }
  );



/* =========================================================
   GEMINI CLIENT
========================================================= */

const ai =
  new GoogleGenAI({
    apiKey,
  });



/* =========================================================
   RESPONSE SCHEMA
========================================================= */

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
      enum: [
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
      ],
    },

    confidence: {
      type: "number",
    },

    description: {
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
  ],
};



/* =========================================================
   RUN TEST
========================================================= */

async function testGemini() {
  console.log(
    "🌱 Climatica AI Test"
  );

  console.log(
    "📷 Sending bottle image to Gemini..."
  );


  try {
    const response =
      await ai.models.generateContent({
        model:
  "gemini-3.5-flash-lite",

        contents: [
          {
            inlineData: {
              mimeType:
                "image/jpeg",

              data:
                imageBase64,
            },
          },

          {
            text: `
You are the waste-identification system for Climatica.

Study this image and identify the MAIN physical object.

Your job is only to classify the item.

Do not invent recycling centres.
Do not provide recycling advice.
Do not provide disposal instructions.

Choose the closest supported Climatica waste type.

If the image is unclear, set identified to false.

confidence must be between 0 and 1.

Return only the requested structured result.
            `,
          },
        ],

        config: {
          responseMimeType:
            "application/json",

          responseSchema,
        },
      });


    console.log(
      "\n✅ Gemini responded!\n"
    );


    const result =
      JSON.parse(
        response.text
      );


    console.log(
      JSON.stringify(
        result,
        null,
        2
      )
    );


    console.log(
      "\n🌱 Climatica AI connection is working."
    );

  } catch (error) {
    console.error(
      "\n❌ GEMINI TEST FAILED\n"
    );


    console.error(
      error?.message ||
      error
    );


    if (
      error?.status
    ) {
      console.error(
        "Status:",
        error.status
      );
    }
  }
}


testGemini();