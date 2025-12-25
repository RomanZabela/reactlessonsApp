

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchProducts = async (page: number, pageSize: number, sortField: string, sortOrder: string) => {
    await delay(1000);

    if (Math.random() < 0.5) {
        throw new Error("Simulated error after loading!");
    }

    const skip = (page - 1) * pageSize;

    const response = await fetch(`https://dummyjson.com/products?limit=${pageSize}&skip=${skip}&sortBy=${sortField}&order=${sortOrder}`);

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    };

    return response.json();
};

export const fetchProductById = async (id: number) => {
    
    await delay(1000);

    const response = await fetch(`https://dummyjson.com/products/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch product');
    };

    return response.json();
};