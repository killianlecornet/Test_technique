import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: 'breakfast' | 'lunch' | 'dinner';

  @ManyToMany(() => Ingredient)
  @JoinTable()
  ingredients: Ingredient[];

  @Column()
  instructions: string;
}
