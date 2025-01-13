import React from 'react';
import { Assignment, Category } from '../types';
import '../output.css';

interface AssignmentFormProps {
  categories: Category[];
  assignments: Assignment[];
  onAddAssignment: (assignment: Assignment) => void;
  onUpdateAssignment: (assignment: Assignment) => void;
  onDeleteAssignment: (assignmentId: string) => void;
}

export function AssignmentForm({ categories, assignments, onAddAssignment, onUpdateAssignment, onDeleteAssignment }: AssignmentFormProps) {
  const [newAssignment, setNewAssignment] = React.useState<Partial<Assignment>>({
    isGraded: true,
    date: new Date().toISOString().split('T')[0]
  });

  const handleAddAssignment = () => {
    if (newAssignment.name && newAssignment.categoryId && newAssignment.totalPoints !== undefined) {
      const assignment: Assignment = {
        id: Date.now().toString(),
        score: newAssignment.isGraded ? newAssignment.score || 0 : null,
        name: newAssignment.name,
        categoryId: newAssignment.categoryId,
        totalPoints: newAssignment.totalPoints,
        isGraded: newAssignment.isGraded ?? true,
        date: newAssignment.date || new Date().toISOString().split('T')[0]
      };
      onAddAssignment(assignment);
      setNewAssignment({ isGraded: true, date: new Date().toISOString().split('T')[0] });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Assignments</h2>
      {assignments.map(assignment => (
        <div key={assignment.id} className="flex items-center space-x-2">
          <input
            type="text"
            value={assignment.name}
            onChange={(e) => onUpdateAssignment({ ...assignment, name: e.target.value })}
            placeholder="Assignment name"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <select
            value={assignment.categoryId}
            onChange={(e) => onUpdateAssignment({ ...assignment, categoryId: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <input
            type="number"
            value={assignment.score !== null ? assignment.score : ''}
            onChange={(e) => onUpdateAssignment({ ...assignment, score: parseFloat(e.target.value) })}
            placeholder="Score"
            disabled={!assignment.isGraded}
            className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="number"
            value={assignment.totalPoints}
            onChange={(e) => onUpdateAssignment({ ...assignment, totalPoints: parseFloat(e.target.value) })}
            placeholder="Total Points"
            className="w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="date"
            value={assignment.date}
            onChange={(e) => onUpdateAssignment({ ...assignment, date: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="checkbox"
            checked={assignment.isGraded}
            onChange={(e) => onUpdateAssignment({ ...assignment, isGraded: e.target.checked, score: e.target.checked ? assignment.score : null })}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>Graded</span>
          <button
            onClick={() => onDeleteAssignment(assignment.id)}
            className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      ))}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={newAssignment.name || ''}
          onChange={(e) => setNewAssignment({ ...newAssignment, name: e.target.value })}
          placeholder="New assignment name"
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <select
          value={newAssignment.categoryId || ''}
          onChange={(e) => setNewAssignment({ ...newAssignment, categoryId: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <input
          type="number"
          value={newAssignment.score !== null ? newAssignment.score : ''}
          onChange={(e) => setNewAssignment({ ...newAssignment, score: parseFloat(e.target.value) })}
          placeholder="Score"
          disabled={!newAssignment.isGraded}
          className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="number"
          value={newAssignment.totalPoints || ''}
          onChange={(e) => setNewAssignment({ ...newAssignment, totalPoints: parseFloat(e.target.value) })}
          placeholder="Total Points"
          className="w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="date"
          value={newAssignment.date || ''}
          onChange={(e) => setNewAssignment({ ...newAssignment, date: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="checkbox"
          checked={newAssignment.isGraded}
          onChange={(e) => setNewAssignment({ ...newAssignment, isGraded: e.target.checked, score: e.target.checked ? newAssignment.score : null })}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <span>Graded</span>
        <button
          onClick={handleAddAssignment}
          className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Assignment
        </button>
      </div>
    </div>
  );
}

