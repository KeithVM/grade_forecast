import React from 'react';

export default function GradingSystemPreview({ system }) {
  if (!system) return null;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Grading System Preview</h2>
      <h3 className="text-xl font-semibold mb-2">Grade Weights</h3>
      {system.categories.map(category => (
        <div key={category.id} className="flex justify-between mb-1">
          <span>{category.name}</span>
          <span>{category.weight}%</span>
        </div>
      ))}
      {system.useLetterGrades && (
        <>
          <h3 className="text-xl font-semibold mt-4 mb-2">Letter Grade Cutoffs</h3>
          {system.letterGradeCutoffs.map((cutoff, index) => (
            <div key={index} className="flex justify-between mb-1">
              <span>{cutoff.letter}</span>
              <span>{cutoff.minScore}%</span>
            </div>
          ))}
        </>
      )}
      <div className="mt-4">
        <span className="font-semibold">Target Grade: </span>
        <span>{system.targetGrade}%</span>
      </div>
    </div>
  );
}

