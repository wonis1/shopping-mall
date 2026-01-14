import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";

// Custom Hook: useProducts
export function useProducts() {
  const context = useContext(ProductContext);

  if (context === undefined) {
    throw new Error(
      "useProducts는 ProductProvider 안에서만 사용할 수 있습니다."
    );
  }

  return context;
}
