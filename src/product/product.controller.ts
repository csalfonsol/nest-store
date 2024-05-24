import { Controller, Get } from '@nestjs/common';

@Controller('product')
export class ProductController {

    @Get()
    findAll() {
        return 'All products';
    }
}
