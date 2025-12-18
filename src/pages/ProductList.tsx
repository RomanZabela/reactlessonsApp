import { useState } from "react";
import { ErrorMessage, Loading } from "../shared/components";
import { Link } from "react-router-dom";
import type { Product } from "../shared/components/types/product";
import { UseGetProductList } from "../hooks/product";

export const ProductList = () => {
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const { data, error, isLoading } = UseGetProductList(page, pageSize);

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
                {data?.products?.map((product: Product) => (
                    <li key={product.id} className="mb-1">
                        <Link to={`/products/${product.id}`} className="flex justify-between w-full">
                            <span className="font-semibold">{product.title} - </span>
                            <span className="text-gray-600">${product.price}</span>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="mt-5 flex items-center gap-4">
                <button
                    onClick={() => setPage((p => p - 1))}
                    disabled={page === 1}
                    araia-label="Previous Page"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                    Previous
                </button>

                <span className="text-gray-700 font-medium">
                    Page {page} / {totalPages}
                </span>

                <button
                    onClick={() => setPage((old) => old + 1)}
                    disabled={page >= totalPages}
                    aria-label="Next Page"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                    Next
                </button>
            </div>
        </div>
    )
}