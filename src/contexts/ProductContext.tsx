import { createContext, useState, type ReactNode } from "react";
import type { Category, FilterState, Product } from "../types";
import { PRODUCTS } from "../data/products";

interface ProductcontextType {
  products: Product[];
  getProduct: (id: number) => Product | undefined;
  getBestProducts: () => Product[];
  getNewProducts: () => Product[];
  getProductsByCategory: (category: Category | "all") => Product[];
  filterProducts: (filter: FilterState) => Product[];
}

export const ProductContext = createContext<ProductcontextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export function ProductProvider({ children }: ProductProviderProps) {
  const [products] = useState<Product[]>(PRODUCTS);
  // setProducts는 전체 상품이고 수정할 필요 없으므로 생략(문법적으로 가능. 구조분해 시 필요한 것만 가능)

  // 상품 ID로 찾기
  const getProduct = (id: number): Product | undefined => {
    return products.find((product) => product.id === id);
  };

  // 베스트 상품 가져오기
  const getBestProducts = (): Product[] => {
    return products.filter((product) => product.isBest);
  };

  // 신상품 가져오기
  const getNewProducts = (): Product[] => {
    return products.filter((product) => product.isNew);
  };

  // 카테고리별 상품 가져오기
  const getProductsByCategory = (category: Category | "all"): Product[] => {
    if (category === "all") return products;
    return products.filter((product) => product.category === category);
  };

  const filterProducts = (filter: FilterState): Product[] => {
    let filtered = products;

    // 카테고리 필터
    if (filter.category !== "all") {
      filtered = filtered.filter((p) => p.category === filter.category);
    }

    // 가격 필터
    filtered = filtered.filter(
      (p) => p.price >= filter.minPrice && p.price <= filter.maxPrice
    );

    // 정렬
    switch (filter.sortBy) {
      case "price-low":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "popular":
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered = [...filtered].sort((a, b) => b.id - a.id);
        break;
    }

    return filtered;
  };

  const value: ProductcontextType = {
    products,
    getProduct,
    getBestProducts,
    getNewProducts,
    getProductsByCategory,
    filterProducts,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
