import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { Ingredient } from '../ingredients/entities/ingredient.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>,
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const recipe = new Recipe();
    recipe.name = createRecipeDto.name;
    recipe.type = createRecipeDto.type;
    recipe.instructions = createRecipeDto.instructions;

    if (createRecipeDto.ingredients && createRecipeDto.ingredients.length > 0) {
      const ingredients = await this.ingredientRepository.findByIds(createRecipeDto.ingredients);
      if (ingredients.length !== createRecipeDto.ingredients.length) {
        throw new NotFoundException('One or more ingredients not found.');
      }
      recipe.ingredients = ingredients;
    }

    return this.recipesRepository.save(recipe);
  }

  findAll(): Promise<Recipe[]> {
    return this.recipesRepository.find({ relations: ['ingredients'] });
  }

  async findOne(id: number): Promise<Recipe> {
    const recipe = await this.recipesRepository.findOne({ where: { id }, relations: ['ingredients'] });
    if (!recipe) {
      throw new NotFoundException(`Recipe with ID "${id}" not found.`);
    }
    return recipe;
  }

  async update(id: number, updateRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const recipe = await this.recipesRepository.findOneBy({ id });
    if (!recipe) {
      throw new NotFoundException(`Recipe with ID "${id}" not found.`);
    }

    if (recipe.name !== updateRecipeDto.name) {
      console.log('BAZINGA');
      recipe.name = updateRecipeDto.name;
    }

    recipe.type = updateRecipeDto.type;
    recipe.instructions = updateRecipeDto.instructions;

    if (updateRecipeDto.ingredients) {
      const ingredients = await this.ingredientRepository.findByIds(updateRecipeDto.ingredients);
      if (ingredients.length !== updateRecipeDto.ingredients.length) {
        throw new NotFoundException('One or more ingredients not found.');
      }
      recipe.ingredients = ingredients;
    }

    return this.recipesRepository.save(recipe);
  }

  async remove(id: number): Promise<void> {
    const result = await this.recipesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Recipe with ID "${id}" not found.`);
    }
  }
}
