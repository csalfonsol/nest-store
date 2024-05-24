export enum ProductType {
    PERECEDERO = 'Perecedero',
    NO_PERECEDERO = 'No perecedero'
}

export class Product {
    id: string;
    name: string;
    price: number;
    type: ProductType;
}