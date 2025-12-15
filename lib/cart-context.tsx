"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import type { Product as LibProduct } from "./products"
import type { Product as ApiProduct } from "@/api/api.type"

// Union type to support both product types
export type Product = LibProduct | ApiProduct

export interface CartItem {
  product: Product
  quantity: number
  additionalServices: string[]
  note?: string
  selected: boolean
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, quantity: number, services: string[], note?: string) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  toggleSelectItem: (productId: string) => void
  selectAllItems: (selected: boolean) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getSelectedItems: () => CartItem[]
  getSelectedTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function getProductPrice(product: Product): number {
  if (typeof product.price === 'number') {
    // API Product type
    return product.price
  } else if (typeof product.price === 'string') {
    // Lib Product type
    if (product.price.includes('Liên hệ') || product.price.includes('liên hệ')) {
      return 0 // Handle "Liên hệ báo giá" case
    }
    const priceMatch = product.price.match(/[\d.]+/)
    if (priceMatch) {
      return parseFloat(priceMatch[0].replace(/\./g, '')) || 0
    }
  }
  return 0
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error loading cart:", error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items, isLoaded])

  const addToCart = (product: Product, quantity: number, services: string[], note?: string) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.product.id === product.id)

      if (existingItemIndex > -1) {
        // Update existing item
        const newItems = [...prevItems]
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity,
          additionalServices: Array.from(
            new Set([...newItems[existingItemIndex].additionalServices, ...services])
          ),
          note: note || newItems[existingItemIndex].note,
        }
        return newItems
      } else {
        // Add new item (selected by default)
        return [...prevItems, { product, quantity, additionalServices: services, note, selected: true }]
      }
    })
  }

  const toggleSelectItem = (productId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, selected: !item.selected } : item
      )
    )
  }

  const selectAllItems = (selected: boolean) => {
    setItems((prevItems) => prevItems.map((item) => ({ ...item, selected })))
  }

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setItems((prevItems) =>
      prevItems.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = getProductPrice(item.product)
      return total + price * item.quantity
    }, 0)
  }

  const getSelectedItems = () => {
    return items.filter((item) => item.selected)
  }

  const getSelectedTotalPrice = () => {
    return items.reduce((total, item) => {
      if (!item.selected) return total
      const price = getProductPrice(item.product)
      return total + price * item.quantity
    }, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleSelectItem,
        selectAllItems,
        clearCart,
        getTotalItems,
        getTotalPrice,
        getSelectedItems,
        getSelectedTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
