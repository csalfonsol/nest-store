import { Injectable } from '@nestjs/common';
import { StoreService } from '../store/store.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class ProductStoreService {

  constructor(private productService: ProductService, private storeService: StoreService) {}

  private productStore = []

  addStoreToProduct(idProduct: string, idStore: string) {
    const product = this.productService.findOne(idProduct);
    if ('error' in product){
      return "El producto con id ".concat(idProduct).concat(" no existe");
    }
    const store = this.storeService.findOne(idStore);
    if ('error' in store){
      return "La tienda con id ".concat(idStore).concat(" no existe");
    }
    if (this.productStore.some(product => product.idProduct === idProduct && product.idStore === idStore)) {
      return "El producto con id ".concat(idProduct).concat(" ya está asociado a la tienda con id ").concat(idStore);  
    }

    const newAsociation = {
      idProduct: idProduct,
      idStore: idStore
    };
    this.productStore.push(newAsociation);

    return newAsociation;
  }

  findStoresFromProduct(idProduct: string){
    const storeIdList = this.productStore
      .filter(item => item.idProduct === idProduct)
      .map(item => ({ idStore: item.idStore }));
    const storeList = this.storeService.findAllByIds(storeIdList);
    return storeList;
  }

  findStoreFromProduct(idProduct: string, idStore: string){
    if (this.productStore.some(duple => duple.idProduct === idProduct && duple.idStore === idStore)) {
      return this.storeService.findOne(idStore);
    }
    return "El producto con id ".concat(idProduct).concat(" No está asociado a la tienda con id ").concat(idStore);  
  }

  updateStoresFromProduct(idProduct: string, newData: any){
    const storeList = this.findStoresFromProduct(idProduct);
    let storesUpdated = [];
    storeList.forEach(store => {
      storesUpdated.push(this.storeService.update(store.id, newData));
    });
    return storesUpdated;
  }


  deleteStoresFromProduct(idProduct: string){
    const storeList = this.findStoresFromProduct(idProduct);
    let storesDeleted = [];
    storeList.forEach(store => {
      this.productStore = this.productStore.filter(item => item.idStore !== store.id);
      storesDeleted.push(this.storeService.delete(store.id));
    });
    return storesDeleted;
  }


}
