import { Controller, Get, Param, Post } from '@nestjs/common';
import { ProductStoreService } from './product-store.service';

@Controller()
export class ProductStoreController {

  constructor(private productStoreService: ProductStoreService) {}

  @Post('products/:idProduct/stores/:idStore')
  addStoreToProduct(@Param('idProduct') idProduct: string, @Param('idStore') idStore: string) {
    return this.productStoreService.addStoreToProduct(idProduct, idStore);
  }

}
