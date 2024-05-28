import { Module } from '@nestjs/common';
import { ProductStoreController } from './product-store.controller';
import { ProductStoreService } from './product-store.service';
import { ProductService } from '../product/product.service';

@Module({
  controllers: [ProductStoreController],
  providers: [ProductStoreService, ProductService]
})
export class ProductStoreModule {
  
}
