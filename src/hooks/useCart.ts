import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart는 CartProvider 안에서만 사용할 수 있습니다.');
    }
    return context;
}