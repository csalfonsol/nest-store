import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductStoreService {

  private productsStore = [
    {
      idProduct: 'A1',
      idStore: 'S1',
    }
  ]

}
