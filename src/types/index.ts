export interface AppRoute {
    href: string;
    text: string;
}

export interface Category {
    id: number;
    image: string;
    name: string;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
    category: Category;
}

export interface ProductsResponse {
    products: Product[];
    totalCount?: number;
    request: {
        subtitle?: string;
        offset?: number;
        limit?: number;
        include?: number[];
    }
}