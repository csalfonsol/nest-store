import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Get('findAll')
    findAll() {
      return this.productService.findAll();
    }

    @Get('findOne/:id')
    findOne(@Param('id') id: string) {
      return this.productService.findOne(id);
    }

    @Post('create')
    create(@Body() newProduct: any) {
      return this.productService.create(newProduct.id, newProduct.name, newProduct.price, newProduct.type);
    }

    @Put('update/:id')
    update(@Param('id') id: string, @Body() updatedProduct: any) {
      return this.productService.update(id, updatedProduct);
    }

    @Delete('delete/:id')
    delete(@Param('id') id: string) {
      return this.productService.delete(id);
    }
}
