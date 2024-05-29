import { Injectable } from '@nestjs/common';
import { Store } from './store.entity';

@Injectable()
export class StoreService {

    private stores: Store[] = [
      {
        id: 'S1',
        name: 'Surtimax',
        city: 'BOG',
        address: 'Calle 12 #45'
      }
    ]


    findAll() {
      return this.stores;
    }

    findAllByIds(storeIdList) {
      return this.stores.filter(store => {
        return storeIdList.some(id => id.idStore === store.id);
      });
    }

    findOne(id: string) {
      const result = this.stores.find(store => store.id === id);
      if (result === undefined) {
        return {
          error: "Tienda no encontrada"
        };
      }  
      return result;
    }

    create(id: string, name: string, city: string, address: string) {
      const store = {
        id,
        name,
        city,
        address
      }
      if (this.isValidCityCode(city)) {
        this.stores.push(store);
        return store;
      }
      return {
        error: "Código de ciudad inválido"
      };
    }

    update(id: string, newData: any) {
      const store = this.findOne(id);
      const updatedStore = Object.assign(store, newData);
      this.stores = this.stores.map(store => store.id === id ? updatedStore : store);
      return updatedStore;
    }

    delete(id: string) {
      const result = this.stores.find(store => store.id === id);
      if (result === undefined) {
        return {
          error: "Tienda no encontrada"
        };
      }  
      this.stores = this.stores.filter(store => store.id !== id);
      return "Tienda eliminada exitosamente";
    }


    isValidCityCode(cityStr: string) {
      return /^[A-Z]{3}$/.test(cityStr);
    } 
}
