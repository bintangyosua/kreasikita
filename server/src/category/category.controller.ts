import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Response } from 'src/types/response.type';

@Controller('categories')
export class CategoryController {
constructor(private categoryService: CategoryService) {}    
@Get()
@HttpCode(HttpStatus.OK)
async getCategories():Promise<Response> {
    return {
        status: HttpStatus.OK,
        message: 'Data Fetched',
        data: await this.categoryService.findAll(),
    };
}

@Get(':id')
@HttpCode(HttpStatus.OK)
async getCategoryById(@Param('id') id: number):Promise<Response> {
    return {
        status: HttpStatus.OK,
        message: 'Data Fetched',
        data: await this.categoryService.findOne(id),
    }
}

}