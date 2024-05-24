enum ProductType {
    PERECEDERO = 'Perecedero',
    NO_PERECEDERO = 'No Perecedero'
}

export class Product {
    id: string;
    name: string;
    price: number;
    type: ProductType;
}