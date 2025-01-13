import { Category, Assignment } from '../types';

export function calculateCategoryAverage(assignments: Assignment[], categoryId: string): number {
  const categoryAssignments = assignments.filter(a => a.categoryId === categoryId && a.isGraded);
  if (categoryAssignments.length === 0) return 100; // Default to 100% if no graded assignments

  const totalScore = categoryAssignments.reduce((sum, a) => sum + (a.score || 0), 0);
  const totalPoints = categoryAssignments.reduce((sum, a) => sum + a.totalPoints, 0);

  return (totalScore / totalPoints) * 100;
}

export function calculateFinalGrade(categories: Category[], assignments: Assignment[]): number {
  const weightSum = categories.reduce((sum, category) => sum + category.weight, 0);
  
  return categories.reduce((sum, category) => {
    const categoryAverage = calculateCategoryAverage(assignments, category.id);
    return sum + (categoryAverage * (category.weight / weightSum));
  }, 0);
}

