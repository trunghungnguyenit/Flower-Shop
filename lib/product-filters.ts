import { Product } from "@/api/api.type";

// Mapping scenarios to occasionIds
export const scenarioToOccasionMap: Record<string, string> = {
  "tinh-yeu": "tinh-yeu",
  "sinh-nhat": "sinh-nhat", 
  "tang-me": "tang-me",
  "khai-truong": "khai-truong",
  "cuoi": "cuoi",
  "trang-tri": "trang-tri",
  "chia-buon": "chia-buon",
  "tet": "tet",
  "chuc-mung": "chuc-mung",
  "su-kien": "su-kien"
};

// Mapping gift guides to giftGuideIds
export const giftGuideToIdMap: Record<string, string> = {
  "nguoi-yeu": "nguoi-yeu",
  "me": "me",
  "ban-than": "ban-than", 
  "sep": "sep",
  "vo-chong": "vo-chong"
};

// Get product count by occasion
export const getProductCountByOccasion = (products: Product[], occasionId: string): number => {
  return products.filter(product => 
    product.isActive && product.occasionIds?.includes(occasionId)
  ).length;
};

// Get product count by category
export const getProductCountByCategory = (products: Product[], categoryId: string): number => {
  return products.filter(product => 
    product.isActive && product.categoryIds?.includes(categoryId)
  ).length;
};

// Get product count by gift guide
export const getProductCountByGiftGuide = (products: Product[], giftGuideId: string): number => {
  return products.filter(product => 
    product.isActive && product.giftGuideIds?.includes(giftGuideId)
  ).length;
};

// Filter products by category, occasion, and gift guide
export const filterProducts = (
  products: Product[], 
  selectedCategory: string, 
  selectedOccasion: string,
  selectedGiftGuide?: string
): Product[] => {
  return products.filter(product => {
    if (!product.isActive) return false;
    
    const categoryMatch = selectedCategory === "all" || product.categoryIds?.includes(selectedCategory);
    const occasionMatch = selectedOccasion === "all" || product.occasionIds?.includes(selectedOccasion);
    const giftGuideMatch = !selectedGiftGuide || selectedGiftGuide === "all" || product.giftGuideIds?.includes(selectedGiftGuide);
    
    return categoryMatch && occasionMatch && giftGuideMatch;
  });
};