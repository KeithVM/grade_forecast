import React from 'react';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Assignment, Category } from '../types';
import { calculateFinalGrade } from '../utils/calculations.ts';
import '../output.css';

interface GradeGraphProps {
  assignments: Assignment[];
  categories: Category[];
}

export function GradeGraph({ assignments, categories }: GradeGraphProps) {
  console.log('GradeGraph component is rendering');
  console.log('Assignments:', assignments);
  console.log('Categories:', categories);
  const sortedAssignments = [...assignments].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const data = sortedAssignments.map((_, index) => {
    const assignmentsUpToNow = sortedAssignments.slice(0, index + 1);
    return {
      date: sortedAssignments[index].date,
      grade: calculateFinalGrade(categories, assignmentsUpToNow)
    };
  });

  return (
    <div className="w-full" style={{ height: '400px' }}>
      <p>GradeGraph Component</p>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="grade" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

