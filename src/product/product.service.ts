import { Injectable } from '@nestjs/common';
import { Product, ProductType } from './product.entity';

@Injectable()
export class ProductService {
    
  private products: any[] = [
    {
      id: 'P1',
      name: 'Default Apple',
      price: 300,
      type: 'Perecedero'
    }
  ]


  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const result = this.products.find(product => product.id === id);
    if (result === undefined) {
      return {
        error: "Producto no encontrado"
      };
    }
    return result;
  }

  create(id: string, name: string, price: number, type: string) {
    const product = {
      id,
      name,
      price,
      type
    }
    if (type === "Perecedero" || type === "No perecedero") {  
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
    const result = this.products.find(product => product.id === id);
    if (result === undefined) {
      return {
        error: "Producto no encontrado"
      };
    }  
    this.products = this.products.filter(product => product.id !== id);
    return "Producto eliminado exitosamente";
  }
}
