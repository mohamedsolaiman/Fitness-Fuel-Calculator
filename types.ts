
export type Gender = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very' | 'extra';
export type Language = 'en' | 'ar';
export type Theme = 'light' | 'dark';

export interface FormData {
  age: string;
  gender: Gender;
  weight: string;
  height: string;
  activityLevel: ActivityLevel;
}

export interface CalculationParams {
  age: number;
  gender: Gender;
  weight: number;
  height: number;
  activityLevel: ActivityLevel;
}

export interface Results {
  maintain: number;
  mildLoss: number;
  normalLoss: number;
  extremeLoss: number;
}
