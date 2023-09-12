import axios from 'axios';
import { Category, Product, ProductsResponse } from 'types';
import { cacheable } from 'utils/cacheble';

const BASE_URL = 'https://kts-store-api.glitch.me/api';

export const enum ENDPOINTS {
    Products = 'products',
    Product = 'product',
    Categories = 'categories',
}

class Api {
    private readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    @cacheable
    public fetchCategories(): Promise<Category[]> {
        return this.get<Category[]>(ENDPOINTS.Categories);
    }

    @cacheable
    public fetchCategory(id: number): Promise<Category> {
        return this.get<Category>(Api.getPathWithId(ENDPOINTS.Categories, id));
    }

    public fetchProducts(initial: boolean, offset: number, limit: number, substring?: string, filters?: number[]): Promise<ProductsResponse> {
        const loadAllItems = initial || offset === 0;
        const fixedLimit = loadAllItems ? undefined : limit;
        const include = filters ? filters.join('|') : undefined;

        const params = {
            offset,
            limit: fixedLimit,
            substring,
            include,
        }

        return this.get<Category[]>(ENDPOINTS.Products, params).then(products => ({
            products: loadAllItems ? products.slice(0, limit) : products,
            totalCount: loadAllItems ? products.length ?? 0 : undefined,
            request: {
                offset,
                limit,
                substring,
                include,
            }
        }));
    }

    @cacheable
    public fetchProduct(id: number): Promise<Product> {
        return this.get<Product>(Api.getPathWithId(ENDPOINTS.Product, id));
    }

    private get<T>(path: string, params?: any): Promise<T> {
        return axios.get<T>(this.getUrl(path), { params }).then(response => response.data);
    }

    private getUrl(path: string): string {
        return `${this.baseUrl}/${path}`;
    }

    private static getPathWithId(path: string, id: number | string): string {
        return `${path}/${id}`;
    }
}

export default new Api(BASE_URL);