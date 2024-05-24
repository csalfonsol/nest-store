import { Injectable } from '@nestjs/common';
import { Product, ProductType } from './product.entity';

@Injectable()
export class ProductService {
    
    private products: Product[] = [
      {
        id: 'A1',
        name: 'Default Apple',
        price: 300,
        type: ProductType.PERECEDERO
      }
    ]


    findAll() {
      return this.products;
    }

    findOne(id: string) {
      return this.products.find(product => product.id === id);
    }

    create(id: string, name: string, price: number, type: ProductType) {
      const product = {
        id,
        name,
        price,
        type
      }
      if (Object.values(ProductType).includes(type)) {  
        this.products.push(product);
        return product;
      }
      return "El tipo de producto debe ser: Perecedero o No perecedero";
    }

    update(id: string, newData: any) {
      const product = this.findOne(id);
      const updatedProduct = Object.assign(product, newData);
      this.products = this.products.map(product => product.id === id ? updatedProduct : product);
      return updatedProduct;
    }

    delete(id: string) {
      this.products = this.products.filter(product => product.id !== id);
    }
}
