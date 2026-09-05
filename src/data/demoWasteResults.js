const demoWasteResults = {
  "Plastic bottle": {
    name: "PET Plastic Bottle",
    material: "PET Plastic",
    category: "Plastic",
    confidence: "High",
    recyclable: true,
    summary:
      "A common clear plastic bottle typically used for water and soft drinks.",
    impact:
      "Keeping PET plastic out of general waste gives the material a better chance of being recovered and recycled.",
  },

  Battery: {
    name: "Household Battery",
    material: "Mixed metals & chemicals",
    category: "Battery / Hazardous Waste",
    confidence: "High",
    recyclable: true,
    summary:
      "A household battery that should be kept separate from general household waste.",
    impact:
      "Batteries can contain materials that should be recovered through specialised collection instead of being dumped.",
  },

  "Aluminium can": {
    name: "Aluminium Drink Can",
    material: "Aluminium",
    category: "Metal",
    confidence: "High",
    recyclable: true,
    summary:
      "A lightweight aluminium beverage container that can usually be recycled.",
    impact:
      "Aluminium can be recovered repeatedly, making recycling a strong option when suitable facilities are available.",
  },

  "Old laptop": {
    name: "Used Laptop",
    material: "Mixed Electronics",
    category: "E-Waste",
    confidence: "Medium–High",
    recyclable: true,
    summary:
      "An electronic device containing reusable parts, metals, plastics and other components.",
    impact:
      "Working electronics may be reused or resold, while damaged devices should enter an appropriate e-waste stream.",
  },
};

export default demoWasteResults;