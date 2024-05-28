import { Module } from '@nestjs/common';
import { ProductStoreController } from './product-store.controller';
import { ProductStoreService } from './product-store.service';
import { ProductService } from '../product/product.service';
import { ProductModule } from '../product/product.module';
import { StoreService } from '../store/store.service';
import { StoreModule } from 'src/store/store.module';

@Module({
  imports: [ProductModule, StoreModule],
  controllers: [ProductStoreController],
  providers: [ProductStoreService]
})
export class ProductStoreModule {}
