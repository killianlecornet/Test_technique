import { IsString, IsEnum, IsArray } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  readonly name: string;

  @IsEnum({ breakfast: 'breakfast', lunch: 'lunch', dinner: 'dinner' })
  readonly type: 'breakfast' | 'lunch' | 'dinner';

  @IsArray()
  readonly ingredients: number[]; // IDs of ingredients

  @IsString()
  readonly instructions: string;
}
