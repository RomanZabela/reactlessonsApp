import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProductById, fetchProducts } from "../api/product";

export const useGetProductById = (productId: number) =>useQuery({
        queryKey: ['product', productId],
        queryFn: () => fetchProductById(productId),
    });

export const useGetProductList = (page: number, pageSize: number, sortField: string, sortOrder: string) => useQuery({
        queryKey: ['products', page, pageSize, sortField, sortOrder],
        queryFn: () => fetchProducts(page, pageSize, sortField, sortOrder),
        placeholderData: keepPreviousData,
    });