(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/contexts/cart-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartProvider",
    ()=>CartProvider,
    "useCart",
    ()=>useCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
// Initial state
const initialState = {
    items: [
        // Sample items for demo
        {
            id: 1,
            name: "Hồng Pastel Ngọt Ngào",
            price: 450000,
            originalPrice: 550000,
            image: "/pastel-pink-roses-bouquet-soft-elegant.jpg",
            quantity: 1,
            variant: "Size M",
            category: "Hoa tươi"
        },
        {
            id: 2,
            name: "Lẵng Hoa Hồng Đỏ",
            price: 680000,
            image: "/red-roses-luxury-basket-arrangement.jpg",
            quantity: 1,
            variant: "Size L",
            category: "Lẵng hoa"
        }
    ],
    isOpen: false
};
// Reducer
function cartReducer(state, action) {
    switch(action.type){
        case "ADD_ITEM":
            {
                const existingItem = state.items.find((item)=>item.id === action.payload.id);
                if (existingItem) {
                    return {
                        ...state,
                        items: state.items.map((item)=>item.id === action.payload.id ? {
                                ...item,
                                quantity: item.quantity + 1
                            } : item)
                    };
                }
                return {
                    ...state,
                    items: [
                        ...state.items,
                        {
                            ...action.payload,
                            quantity: 1
                        }
                    ]
                };
            }
        case "REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter((item)=>item.id !== action.payload)
            };
        case "UPDATE_QUANTITY":
            if (action.payload.quantity <= 0) {
                return {
                    ...state,
                    items: state.items.filter((item)=>item.id !== action.payload.id)
                };
            }
            return {
                ...state,
                items: state.items.map((item)=>item.id === action.payload.id ? {
                        ...item,
                        quantity: action.payload.quantity
                    } : item)
            };
        case "CLEAR_CART":
            return {
                ...state,
                items: []
            };
        case "TOGGLE_CART":
            return {
                ...state,
                isOpen: !state.isOpen
            };
        case "OPEN_CART":
            return {
                ...state,
                isOpen: true
            };
        case "CLOSE_CART":
            return {
                ...state,
                isOpen: false
            };
        default:
            return state;
    }
}
// Context
const CartContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function CartProvider({ children }) {
    _s();
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducer"])(cartReducer, initialState);
    // Calculate derived values
    const totalItems = state.items.reduce((sum, item)=>sum + item.quantity, 0);
    const subtotal = state.items.reduce((sum, item)=>sum + item.price * item.quantity, 0);
    const shipping = subtotal > 500000 ? 0 : 30000 // Free shipping over 500k
    ;
    const total = subtotal + shipping;
    // Actions
    const addItem = (item)=>{
        dispatch({
            type: "ADD_ITEM",
            payload: item
        });
    };
    const removeItem = (id)=>{
        dispatch({
            type: "REMOVE_ITEM",
            payload: id
        });
    };
    const updateQuantity = (id, quantity)=>{
        dispatch({
            type: "UPDATE_QUANTITY",
            payload: {
                id,
                quantity
            }
        });
    };
    const clearCart = ()=>{
        dispatch({
            type: "CLEAR_CART"
        });
    };
    const toggleCart = ()=>{
        dispatch({
            type: "TOGGLE_CART"
        });
    };
    const openCart = ()=>{
        dispatch({
            type: "OPEN_CART"
        });
    };
    const closeCart = ()=>{
        dispatch({
            type: "CLOSE_CART"
        });
    };
    const value = {
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
        totalItems,
        subtotal,
        total,
        shipping
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CartContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/contexts/cart-context.tsx",
        lineNumber: 205,
        columnNumber: 5
    }, this);
}
_s(CartProvider, "6JWkGZ32UPfojeNx+xqn8ZU8A0Q=");
_c = CartProvider;
function useCart() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
_s1(useCart, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "CartProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=contexts_cart-context_tsx_1ae6f694._.js.map