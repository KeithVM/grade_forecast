import React, { useState } from 'react';

export default function AssignmentList({ assignments, categories, onAddAssignment, onUpdateAssignment, onDeleteAssignment }) {
  const [openCategory, setOpenCategory] = useState(null);
  const [newAssignment, setNewAssignment] = useState({
    id: '',
    name: '',
    categoryId: '',
    score: '',
    totalPoints: '',
    date: new Date().toISOString().split('T')[0],
    graded: false
  });

  const toggleCategory = (categoryId) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  const handleAssignmentUpdate = (updatedAssignment) => {
    const existingAssignment = assignments.find(a => a.id === updatedAssignment.id);
    if (existingAssignment) {
      const updatedAssignmentFull = {
        ...existingAssignment,
        ...updatedAssignment
      };
      onUpdateAssignment(updatedAssignmentFull);
    }
  };
  
  const calculateCategoryAverage = (categoryId) => {
    const categoryAssignments = assignments.filter(a => a.categoryId === categoryId && a.graded);
    if (categoryAssignments.length === 0) return '100.00%';
    const total = categoryAssignments.reduce((sum, a) => sum + (parseFloat(a.score) / parseFloat(a.totalPoints)), 0);
    return ((total / categoryAssignments.length) * 100).toFixed(2) + '%';
  };

  const uncategorizedAssignments = assignments.filter(a => !categories.some(c => c.id === a.categoryId));

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Assignments</h2>
      {categories.map(category => (
        <div key={category.id} className="border rounded-md">
          <div
            className="flex justify-between items-center p-3 bg-gray-100 cursor-pointer"
            onClick={() => toggleCategory(category.id)}
          >
            <span>{category.name}</span>
            <span>{calculateCategoryAverage(category.id)}</span>
          </div>
          {openCategory === category.id && (
            <div className="p-3">
              {assignments
                .filter(a => a.categoryId === category.id)
                .map(assignment => (
                  <div key={assignment.id} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={assignment.name}
                      onChange={(e) => handleAssignmentUpdate({ ...assignment, name: e.target.value })}
                      className="flex-grow px-2 py-1 border rounded"
                    />
                    <input
                      type="number"
                      value={assignment.score}
                      onChange={(e) => handleAssignmentUpdate({ ...assignment, score: parseFloat(e.target.value) })}
                      className="w-16 px-2 py-1 border rounded"
                    />
                    <span>/</span>
                    <input
                      type="number"
                      value={assignment.totalPoints}
                      onChange={(e) => handleAssignmentUpdate({ ...assignment, totalPoints: parseFloat(e.target.value) })}
                      className="w-16 px-2 py-1 border rounded"
                    />
                    <input
                      type="date"
                      value={assignment.date}
                      onChange={(e) => handleAssignmentUpdate({ ...assignment, date: e.target.value })}
                      className="px-2 py-1 border rounded"
                    />
                    <select
                      value={assignment.categoryId}
                      onChange={(e) => handleAssignmentUpdate({ ...assignment, categoryId: e.target.value })}
                      className="w-32 px-2 py-1 border rounded"
                    >
                      <option value="">-</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={assignment.graded}
                        onChange={(e) => handleAssignmentUpdate({ ...assignment, graded: e.target.checked })}
                      />
                      <span>Graded</span>
                    </label>
                    <button
                      onClick={() => onDeleteAssignment(assignment.id)}
                      className="px-2 py-1 bg-red-500 text-black rounded"
                    >
                      Delete
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
      {uncategorizedAssignments.length > 0 && (
        <div className="border rounded-md">
          <div
            className="flex justify-between items-center p-3 bg-gray-100 cursor-pointer"
            onClick={() => toggleCategory('uncategorized')}
          >
            <span>Uncategorized Assignments/Exams</span>
          </div>
          {openCategory === 'uncategorized' && (
            <div className="p-3">
              {uncategorizedAssignments.map(assignment => (
                <div key={assignment.id} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={assignment.name}
                    onChange={(e) => handleAssignmentUpdate({ ...assignment, name: e.target.value })}
                    className="flex-grow px-2 py-1 border rounded"
                  />
                  <input
                    type="number"
                    value={assignment.score}
                    onChange={(e) => handleAssignmentUpdate({ ...assignment, score: parseFloat(e.target.value) })}
                    className="w-16 px-2 py-1 border rounded"
                  />
                  <span>/</span>
                  <input
                    type="number"
                    value={assignment.totalPoints}
                    onChange={(e) => handleAssignmentUpdate({ ...assignment, totalPoints: parseFloat(e.target.value) })}
                    className="w-16 px-2 py-1 border rounded"
                  />
                  <input
                    type="date"
                    value={assignment.date}
                    onChange={(e) => handleAssignmentUpdate({ ...assignment, date: e.target.value })}
                    className="w-32 px-2 py-1 border rounded"
                  />
                  <select
                    value={assignment.categoryId}
                    onChange={(e) => handleAssignmentUpdate({ ...assignment, categoryId: e.target.value })}
                    className="w-32 px-2 py-1 border rounded"
                  >
                    <option value="">-</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                  <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={assignment.graded}
                        onChange={(e) => handleAssignmentUpdate({ ...assignment, graded: e.target.checked })}
                      />
                      <span>Graded</span>
                    </label>
                  <button
                    onClick={() => onDeleteAssignment(assignment.id)}
                    className="px-2 py-1 bg-red-500 text-black rounded"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="mt-4 p-4 border rounded-md">
        <h3 className="text-xl font-semibold mb-2">Add New Assignment</h3>
        <div className="space-y-2">
          <input
            type="text"
            value={newAssignment.name}
            onChange={(e) => setNewAssignment({ ...newAssignment, name: e.target.value })}
            placeholder="Assignment Name"
            className="w-full px-3 py-2 border rounded"
          />
          <select
            value={newAssignment.categoryId}
            onChange={(e) => setNewAssignment({ ...newAssignment, categoryId: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <input
            type="number"
            value={newAssignment.score}
            onChange={(e) => setNewAssignment({ ...newAssignment, score: e.target.value })}
            placeholder="Score"
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="number"
            value={newAssignment.totalPoints}
            onChange={(e) => setNewAssignment({ ...newAssignment, totalPoints: e.target.value })}
            placeholder="Total Points"
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="date"
            value={newAssignment.date}
            onChange={(e) => setNewAssignment({ ...newAssignment, date: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={newAssignment.graded}
              onChange={(e) => setNewAssignment({ ...newAssignment, graded: e.target.checked })}
            />
            <span>Graded</span>
          </label>
          <button
            onClick={() => {
              onAddAssignment(newAssignment);
              setNewAssignment({
                name: '',
                categoryId: '',
                score: '',
                totalPoints: '',
                date: new Date().toISOString().split('T')[0]
              });
            }}
            className="w-full px-3 py-2 bg-blue-600 text-white rounded"
          >
            Add Assignment
          </button>
        </div>
      </div>
    </div>
  );
}

