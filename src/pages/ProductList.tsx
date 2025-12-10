import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {fetchProducts} from "../hooks/product";
import { ErrorMessage, Loading } from "../shared/modules";
import { Link } from "react-router-dom";

export default function ProductList() {
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const { data, error, isLoading } = useQuery({
        queryKey: ['products', page],
        queryFn: () => fetchProducts(page, pageSize),
        placeholderData: keepPreviousData,
    });

    const totalPages = data ? Math.ceil(data.total / pageSize) : 0;

    if (!data && isLoading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorMessage message="Error loading products." />;
    }

    return(
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Product List</h1>
            <ul className="list-disc pl-5">
                {data?.products?.map((product: { id: number; title: string, price: string }) => (
                    <li key={product.id} className="mb-2">
                        <Link to={`/products/${product.id}`} className="block">
                            <div className="font-semibold">{product.title}</div>
                            <div className="text-gray-600">${product.price}</div>
                        </Link>
                    </li>
                ))}
            </ul>

            <div style={{ marginTop: 20}}>
                <button
                    onClick={() => setPage((p => p - 1))}
                    disabled={page === 1}
                >
                    Previous
                </button>

                <span style={{ margin: '0 10px' }}>
                    Page {page} / {totalPages}
                </span>

                <button
                    onClick={() => setPage((old) => old + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    )
}