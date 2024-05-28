import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from '../product/product.service';

@Controller()
export class ProductStoreController {

  constructor(private productService: ProductService) {}

  @Get('products/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

}
