import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductStoreService } from './product-store.service';

@Controller()
export class ProductStoreController {

  constructor(private productStoreService: ProductStoreService) {}

  @Post('product/:idProduct/stores/:idStore')
  addStoreToProduct(@Param('idProduct') idProduct: string, @Param('idStore') idStore: string) {
    return this.productStoreService.addStoreToProduct(idProduct, idStore);
  }

  @Get('product/:idProduct/stores')
  findStoresFromProduct(@Param('idProduct') idProduct: string) {
    return this.productStoreService.findStoresFromProduct(idProduct);
  }

  @Get('product/:idProduct/store/:idStore')
  findStoreFromProduct(@Param('idProduct') idProduct: string, @Param('idStore') idStore: string) {
    return this.productStoreService.findStoreFromProduct(idProduct, idStore);
  }

  @Put('product/:idProduct/stores')
  updateStoresFromProduct(@Param('idProduct') idProduct: string, @Body() updatedStore: any) {
    return this.productStoreService.updateStoresFromProduct(idProduct, updatedStore);
  }

  @Delete('product/:idProduct/stores')
  deleteStoreFromProduct(@Param('idProduct') idProduct: string) {
    return this.productStoreService.deleteStoresFromProduct(idProduct);
  }

}
