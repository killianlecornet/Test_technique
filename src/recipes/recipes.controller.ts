import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { RecipesService } from './recipes.service';
import { Recipe } from './entities/recipe.entity';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    return this.recipesService.create(createRecipeDto);
  }

  @Get()
  findAll(): Promise<Recipe[]> {
    return this.recipesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Recipe> {
    return this.recipesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: CreateRecipeDto): Promise<Recipe> {
    return this.recipesService.update(+id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.recipesService.remove(+id);
  }
}
