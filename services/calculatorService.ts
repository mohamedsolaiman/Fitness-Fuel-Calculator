
import type { CalculationParams, Results } from '../types';

const activityMultipliers = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very: 1.725,
  extra: 1.9,
};

export const calculateCalories = (params: CalculationParams): Results => {
  const { age, gender, weight, height, activityLevel } = params;

  let bmr: number;

  if (gender === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }

  const tdee = bmr * activityMultipliers[activityLevel];

  const maintain = Math.round(tdee);
  const mildLoss = Math.round(tdee - 250);
  const normalLoss = Math.round(tdee - 500);
  const extremeLoss = Math.round(tdee - 1000);

  return { maintain, mildLoss, normalLoss, extremeLoss };
};
