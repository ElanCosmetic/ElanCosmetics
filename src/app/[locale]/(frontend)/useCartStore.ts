import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
    productId: string;
    name: string;
    price: number;
    comparePrice: number | null;
    quantity: number;
    img: string | null;
    imgWidth: number | null;
    imgHeight: number | null;
};

type Discount = {
    code: string;
    value: number;
    type: "fixed" | "percent"; // "fixed" means a set amount, "percent" means percentage off
} | null;

type CartState = {
    items: CartItem[];
    discount: Discount;
    addToCart: (item: CartItem) => void;
    decreaseQuantity: (item: CartItem) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    applyDiscount: (code: string, value: number, type: "fixed" | "percent") => void;
    removeDiscount: () => void;
};

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            discount: null,
            addToCart: (item) =>
                set((state) => {
                    const existingItem = state.items.find((i) => i.productId === item.productId);
                    if (existingItem) {
                        return {
                            items: state.items.map((i) =>
                                i.productId === item.productId
                                    ? { ...i, quantity: i.quantity + item.quantity }
                                    : i
                            ),
                        };
                    }
                    return { items: [...state.items, item] };
                }),
            decreaseQuantity: (item) =>
                set((state) => {
                    const existingItem = state.items.find((i) => i.productId === item.productId);
                    if (existingItem) {
                        if (existingItem.quantity === 1) {
                            return {
                                items: state.items.filter((i) => i.productId !== item.productId),
                            };
                        } else {
                            return {
                                items: state.items.map((i) =>
                                    i.productId === item.productId
                                        ? { ...i, quantity: i.quantity - 1 }
                                        : i
                                ),
                            };
                        }
                    }
                    return { items: [...state.items] };
                }),
            removeFromCart: (productId) =>
                set((state) => ({
                    items: state.items.filter((item) => item.productId !== productId),
                })),
            clearCart: () => set({ items: [], discount: null }),
            applyDiscount: (code, value, type) => set({ discount: { code, value, type } }),
            removeDiscount: () => set({ discount: null }),
        }),
        {
            name: "cart-storage",
        }
    )
);
