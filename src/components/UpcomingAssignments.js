import React from 'react';

export default function UpcomingAssignments({ assignments, categories }) {
  const today = new Date();
  const upcomingAssignments = assignments
    .filter(a => new Date(a.date) > today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Upcoming Assignments</h2>
      {upcomingAssignments.map(assignment => {
        const category = categories.find(c => c.id === assignment.categoryId);
        return (
          <div key={assignment.id} className="mb-2">
            <div className="font-semibold">{assignment.name}</div>
            <div>Category: {category ? category.name : 'Unknown'}</div>
            <div>Due: {assignment.date}</div>
          </div>
        );
      })}
    </div>
  );
}

