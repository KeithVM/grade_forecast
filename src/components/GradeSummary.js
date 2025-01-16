import React from 'react';

export default function GradeSummary({ assignments, categories, useLetterGrades, letterGradeCutoffs }) {
  const calculateCategoryGrade = (categoryId) => {
    const categoryAssignments = assignments.filter(a => a.categoryId === categoryId && a.graded);
    if (categoryAssignments.length === 0) return 100;
    const total = categoryAssignments.reduce((sum, a) => sum + (a.score / a.totalPoints), 0);
    return (total / categoryAssignments.length) * 100;
  };

  const calculateFinalGrade = () => {
    const weightSum = categories.reduce((sum, category) => sum + category.weight, 0);
    const weightedGrade = categories.reduce((sum, category) => {
      const categoryGrade = calculateCategoryGrade(category.id);
      return sum + (categoryGrade * (category.weight / weightSum));
    }, 0);
    return weightedGrade;
  };

  const getLetterGrade = (grade) => {
    if (!useLetterGrades || !letterGradeCutoffs) return '';
    const letterGrade = letterGradeCutoffs.find(cutoff => grade >= cutoff.minScore);
    return letterGrade ? letterGrade.letter : 'F';
  };

  const finalGrade = calculateFinalGrade();
  const letterGrade = getLetterGrade(finalGrade);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Grade Summary</h2>
      {categories.map(category => (
        <div key={category.id} className="flex justify-between mb-2">
          <span>{category.name}</span>
          <span>{calculateCategoryGrade(category.id).toFixed(2)}%</span>
        </div>
      ))}
      <div className="font-bold mt-4">
        Final Grade: {finalGrade.toFixed(2)}% {letterGrade && `(${letterGrade})`}
      </div>
    </div>
  );
}

