import React from 'react';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GradeGraph = ({ assignments, categories }) => {
  // Sort assignments by date
  const sortedAssignments = [...assignments].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Calculate cumulative grade over time
  const data = sortedAssignments.map((assignment, index) => {
    const assignmentsUpToNow = sortedAssignments.slice(0, index + 1);
    const cumulativeGrade = calculateOverallGrade(assignmentsUpToNow, categories);
    return {
      name: assignment.name,
      date: new Date(assignment.date).toLocaleDateString(),
      grade: cumulativeGrade
    };
  });

  return (
    <div className="w-full mt-4 bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Grade Progress</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="grade" stroke="#8884d8" name="Grade" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Helper function to calculate overall grade
const calculateOverallGrade = (assignments, categories) => {
  const categoryGrades = categories.map(category => {
    const categoryAssignments = assignments.filter(a => a.categoryId === category.id);
    if (categoryAssignments.length === 0) return 0;
    const total = categoryAssignments.reduce((sum, a) => sum + (parseFloat(a.score) / parseFloat(a.totalPoints)), 0);
    return (total / categoryAssignments.length) * category.weight;
  });

  const totalWeight = categories.reduce((sum, category) => sum + category.weight, 0);
  const overallGrade = categoryGrades.reduce((sum, grade) => sum + grade, 0) / totalWeight * 100;
  return Math.round(overallGrade * 100) / 100; // Round to 2 decimal places
};

export default GradeGraph;

