import { Injectable } from '@nestjs/common';
import { StoreService } from '../store/store.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class ProductStoreService {

  constructor(private productService: ProductService, private storeService: StoreService) {}

  private productStore = [
    {
      idProduct: 'P1',
      idStore: 'S1',
    }
  ]

  addStoreToProduct(idProduct: string, idStore: string) {
    const product = this.productService.findOne(idProduct);
    if ('error' in product){
      return "El producto con id ".concat(idProduct).concat(" no existe");
    }
    const store = this.storeService.findOne(idStore);
    if ('error' in store){
      return "La tienda con id ".concat(idStore).concat(" no existe");
    }
    this.productStore.push(
      {
        idProduct: idProduct,
        idStore: idStore
      }
    );

    return this.productStore;
  }


}
