
export const fetchProducts = async (page: number, pageSize: number, sortField: string, sortOrder: string) => {

    const skip = (page - 1) * pageSize;

    const response = await fetch(`https://dummyjson.com/products?limit=${pageSize}&skip=${skip}&sortBy=${sortField}&order=${sortOrder}`);

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    };

    return response.json();
};

export const fetchProductById = async (id: number) => {

    const response = await fetch(`https://dummyjson.com/products/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch product');
    };

    return response.json();
};