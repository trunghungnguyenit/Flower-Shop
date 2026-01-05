// Utility functions to replace cart functionality with direct order
import { Product } from "@/api/api.type";

// Navigate to product page for direct ordering
export const navigateToOrder = (productSlug: string) => {
  window.location.href = `/product/${productSlug}`;
};

// Show success message for quick actions
export const showOrderSuccess = (productName: string) => {
  // You can implement a toast notification here
  console.log(`Redirecting to order ${productName}...`);
};

// Mock cart functions for compatibility (will redirect to product page)
export const useOrderRedirect = () => {
  const addToCart = (product: any, quantity: number = 1, services: string[] = [], note: string = "") => {
    // Instead of adding to cart, redirect to product page
    const slug = product.slug || product.id;
    navigateToOrder(slug);
  };

  return { addToCart };
};