import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { StoreService } from './store.service';

@Controller('stores')
export class StoreController {

    constructor(private storeService: StoreService) {}

    @Get('findAll')
    findAll() {
      return this.storeService.findAll();
    }

    @Get('findOne/:id')
    findOne(@Param('id') id: string) {
      return this.storeService.findOne(id);
    }

    @Post('create')
    create(@Body() newStore: any) {
      return this.storeService.create(newStore.id, newStore.name, newStore.city, newStore.address);
    }

    @Put('update/:id')
    update(@Param('id') id: string, @Body() updatedStore: any) {
      return this.storeService.update(id, updatedStore);
    }

    @Delete('delete/:id')
    delete(@Param('id') id: string) {
      return this.storeService.delete(id);
    }
}
