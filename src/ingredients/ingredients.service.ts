import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientsRepository: Repository<Ingredient>,
  ) {}

  create(createIngredientDto: CreateIngredientDto): Promise<Ingredient> {
    const ingredient = this.ingredientsRepository.create(createIngredientDto);
    return this.ingredientsRepository.save(ingredient);
  }

  findAll(): Promise<Ingredient[]> {
    return this.ingredientsRepository.find();
  }

  findOne(id: number): Promise<Ingredient | null> {
    return this.ingredientsRepository.findOneBy({ id });
  }
  
  async remove(id: number): Promise<void> {
    await this.ingredientsRepository.delete(id);
  }
}
