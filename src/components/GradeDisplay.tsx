import React from 'react';
import { Category, Assignment, LetterGradeCutoff } from '../types';
import { calculateCategoryAverage, calculateFinalGrade } from '../utils/calculations.ts';
import '../output.css';

interface GradeDisplayProps {
  categories: Category[];
  assignments: Assignment[];
  useLetterGrades: boolean;
  letterGradeCutoffs?: LetterGradeCutoff[];
}

export function GradeDisplay({ categories, assignments, useLetterGrades, letterGradeCutoffs }: GradeDisplayProps) {
  const finalGrade = calculateFinalGrade(categories, assignments);
  const letterGrade = useLetterGrades && letterGradeCutoffs
    ? letterGradeCutoffs
        .sort((a, b) => b.minScore - a.minScore)
        .find(cutoff => finalGrade >= cutoff.minScore)?.letter || 'F'
    : null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Grade Summary</h2>
      {categories.map(category => {
        const categoryAverage = calculateCategoryAverage(assignments, category.id);
        return (
          <div key={category.id} className="flex justify-between">
            <span>{category.name} ({category.weight}%):</span>
            <span>{categoryAverage.toFixed(2)}%</span>
          </div>
        );
      })}
      <div className="flex justify-between font-bold">
        <span>Final Grade:</span>
        <span>
          {finalGrade.toFixed(2)}%
          {letterGrade && ` (${letterGrade})`}
        </span>
      </div>
    </div>
  );
}

