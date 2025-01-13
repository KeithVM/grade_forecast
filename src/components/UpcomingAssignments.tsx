import React from 'react';
import { Assignment, Category, LetterGradeCutoff } from '../types.ts';
import { calculateFinalGrade } from '../utils/calculations.ts';

interface UpcomingAssignmentsProps {
  assignments: Assignment[];
  categories: Category[];
  letterGradeCutoffs: LetterGradeCutoff;
  targetGrade: number;
}

export function UpcomingAssignments({ assignments, categories, letterGradeCutoffs, targetGrade }: UpcomingAssignmentsProps) {
  const currentGrade = calculateFinalGrade(categories, assignments);
  const currentLetterGrade = Object.entries(letterGradeCutoffs)
    .sort(([, a], [, b]) => b - a)
    .find(([, cutoff]) => currentGrade >= cutoff)?.[0] || 'F';

  const upcomingAssignments = assignments
    .filter(a => !a.isGraded && new Date(a.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const calculateNeededScore = (assignment: Assignment, targetScore: number) => {
    const simulatedAssignments = assignments.map(a => 
      a.id === assignment.id ? { ...a, score: targetScore, isGraded: true } : a
    );
    return calculateFinalGrade(categories, simulatedAssignments);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Upcoming Assignments</h2>
      {upcomingAssignments.map(assignment => {
        const categoryWeight = categories.find(c => c.id === assignment.categoryId)?.weight || 0;
        const maintainGradeScore = assignment.totalPoints * (currentGrade / 100);
        const targetGradeScore = assignment.totalPoints * (targetGrade / 100);

        return (
          <div key={assignment.id} className="border p-4 rounded-md">
            <h3 className="font-bold">{assignment.name}</h3>
            <p>Date: {assignment.date}</p>
            <p>Category: {categories.find(c => c.id === assignment.categoryId)?.name}</p>
            <p>Total Points: {assignment.totalPoints}</p>
            <p>To maintain {currentLetterGrade}: {maintainGradeScore.toFixed(2)} ({(maintainGradeScore / assignment.totalPoints * 100).toFixed(2)}%)</p>
            <p>To reach target grade: {targetGradeScore.toFixed(2)} ({(targetGradeScore / assignment.totalPoints * 100).toFixed(2)}%)</p>
          </div>
        );
      })}
    </div>
  );
}

