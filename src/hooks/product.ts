import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProductById, fetchProducts } from "../api/product";

export const useGetProductById = (productId: number) =>useQuery({
        queryKey: ['product', productId],
        queryFn: () => fetchProductById(productId),
    });

export const useGetProductList = (page: number, pageSize: number) => useQuery({
        queryKey: ['products', page, pageSize],
        queryFn: () => fetchProducts(page, pageSize),
        placeholderData: keepPreviousData,
    });