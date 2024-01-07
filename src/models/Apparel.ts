const apparelData = require("../../data.json");

export interface Apparel {
  code: string;
  name: string;
  color: string;
  category: string;
  sizes: { size: string; quantity: number, price: Number }[];
}

// Validate data structure and uniqueness of codes
apparelData.forEach((item: Apparel) => {
  if (
    !item.code ||
    !Array.isArray(item.sizes) ||
    !item.sizes.every((size) => size.size && size.quantity !== undefined && size.price !== undefined)
  ) {
    throw new Error("Invalid data structure for apparel items");
  }
});

// Check uniqueness of codes
const uniqueCodes = new Set<string>();
apparelData.forEach((item: Apparel) => {
  if (uniqueCodes.has(item.code)) {
    throw new Error("Duplicate code found for apparel items");
  }
  uniqueCodes.add(item.code);
});
