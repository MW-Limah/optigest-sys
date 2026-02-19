/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.productsService.create({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      name: body.name,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      cod_ean: body.cod_ean,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      description: body.description,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      category: body.category,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      expiration_date: body.expiration_date || null,
      active: true,
    });
  }
}
