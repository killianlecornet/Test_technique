import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { Ingredient } from '../ingredients/entities/ingredient.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe, Ingredient]), 
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
