import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function EditGradingSystem() {
  const [gradingSystems, setGradingSystems] = useState(() => {
    const savedSystems = localStorage.getItem('gradingSystems');
    return savedSystems ? JSON.parse(savedSystems) : [];
  });

  const [currentSystemId, setCurrentSystemId] = useState(() => {
    return localStorage.getItem('currentSystemId') || null;
  });

  const [currentSystem, setCurrentSystem] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const system = gradingSystems.find(s => s.id === currentSystemId) || gradingSystems[0];
    setCurrentSystem(system ? { ...system } : createNewSystem());
  }, [currentSystemId, gradingSystems]);

  useEffect(() => {
    localStorage.setItem('gradingSystems', JSON.stringify(gradingSystems));
  }, [gradingSystems]);

  const createNewSystem = () => ({
    id: Date.now().toString(),
    name: 'New Grading System',
    categories: [],
    useLetterGrades: true,
    letterGradeCutoffs: [
      { letter: 'A', minScore: 90 },
      { letter: 'B', minScore: 80 },
      { letter: 'C', minScore: 70 },
      { letter: 'D', minScore: 60 },
      { letter: 'F', minScore: 0 },
    ],
    targetGrade: 90,
  });

  const handleSave = () => {
    if (currentSystem) {
      const updatedSystems = currentSystemId
        ? gradingSystems.map(s => s.id === currentSystemId ? currentSystem : s)
        : [...gradingSystems, currentSystem];
      setGradingSystems(updatedSystems);
      setCurrentSystemId(currentSystem.id);
      localStorage.setItem('currentSystemId', currentSystem.id);
    }
    history.push('/');
  };

  const handleAddCategory = () => {
    setCurrentSystem({
      ...currentSystem,
      categories: [
        ...currentSystem.categories,
        { id: Date.now().toString(), name: 'New Category', weight: 0 }
      ]
    });
  };

  const handleUpdateCategory = (updatedCategory) => {
    setCurrentSystem({
      ...currentSystem,
      categories: currentSystem.categories.map(c => 
        c.id === updatedCategory.id ? updatedCategory : c
      )
    });
  };

  const handleDeleteCategory = (categoryId) => {
    setCurrentSystem({
      ...currentSystem,
      categories: currentSystem.categories.filter(c => c.id !== categoryId)
    });
  };

  const handleToggleLetterGrades = () => {
    setCurrentSystem({
      ...currentSystem,
      useLetterGrades: !currentSystem.useLetterGrades
    });
  };

  const handleUpdateLetterGradeCutoffs = (updatedCutoffs) => {
    setCurrentSystem({
      ...currentSystem,
      letterGradeCutoffs: updatedCutoffs
    });
  };

  if (!currentSystem) return null;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Edit Grading System</h1>
      <div>
        <label className="block mb-2">System Name</label>
        <input
          type="text"
          value={currentSystem.name}
          onChange={(e) => setCurrentSystem({ ...currentSystem, name: e.target.value })}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        {currentSystem.categories.map(category => (
          <div key={category.id} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={category.name}
              onChange={(e) => handleUpdateCategory({ ...category, name: e.target.value })}
              className="flex-grow px-2 py-1 border rounded"
            />
            <input
              type="number"
              value={category.weight}
              onChange={(e) => handleUpdateCategory({ ...category, weight: parseFloat(e.target.value) })}
              className="w-20 px-2 py-1 border rounded"
            />
            <button
              onClick={() => handleDeleteCategory(category.id)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        ))}
        <button
          onClick={handleAddCategory}
          className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
        >
          Add Category
        </button>
      </div>
      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={currentSystem.useLetterGrades}
            onChange={handleToggleLetterGrades}
          />
          <span>Use Letter Grades</span>
        </label>
      </div>
      {currentSystem.useLetterGrades && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Letter Grade Cutoffs</h2>
          {currentSystem.letterGradeCutoffs.map((cutoff, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={cutoff.letter}
                onChange={(e) => {
                  const updatedCutoffs = [...currentSystem.letterGradeCutoffs];
                  updatedCutoffs[index].letter = e.target.value;
                  handleUpdateLetterGradeCutoffs(updatedCutoffs);
                }}
                className="w-20 px-2 py-1 border rounded"
              />
              <input
                type="number"
                value={cutoff.minScore}
                onChange={(e) => {
                  const updatedCutoffs = [...currentSystem.letterGradeCutoffs];
                  updatedCutoffs[index].minScore = parseFloat(e.target.value);
                  handleUpdateLetterGradeCutoffs(updatedCutoffs);
                }}
                className="w-20 px-2 py-1 border rounded"
              />
            </div>
          ))}
        </div>
      )}
      <div>
        <label className="block mb-2">Target Grade</label>
        <input
          type="number"
          value={currentSystem.targetGrade}
          onChange={(e) => setCurrentSystem({ ...currentSystem, targetGrade: parseFloat(e.target.value) })}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => history.push('/')}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}

