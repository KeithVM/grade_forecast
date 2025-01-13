import React from 'react';
import { LetterGradeCutoff } from '../types';
import '../output.css';

interface LetterGradeCutoffsFormProps {
  useLetterGrades: boolean;
  onToggleLetterGrades: (use: boolean) => void;
  cutoffs: LetterGradeCutoff[];
  onUpdate: (cutoffs: LetterGradeCutoff[]) => void;
}

export function LetterGradeCutoffsForm({ useLetterGrades, onToggleLetterGrades, cutoffs, onUpdate }: LetterGradeCutoffsFormProps) {
  const [newLetter, setNewLetter] = React.useState('');
  const [newMinScore, setNewMinScore] = React.useState('');

  const handleUpdate = (index: number, field: 'letter' | 'minScore', value: string) => {
    const updatedCutoffs = [...cutoffs];
    if (field === 'letter') {
      updatedCutoffs[index].letter = value;
    } else {
      updatedCutoffs[index].minScore = parseFloat(value);
    }
    onUpdate(updatedCutoffs);
  };

  const handleAdd = () => {
    if (newLetter && newMinScore) {
      onUpdate([...cutoffs, { letter: newLetter, minScore: parseFloat(newMinScore) }]);
      setNewLetter('');
      setNewMinScore('');
    }
  };

  const handleDelete = (index: number) => {
    const updatedCutoffs = cutoffs.filter((_, i) => i !== index);
    onUpdate(updatedCutoffs);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={useLetterGrades}
          onChange={(e) => onToggleLetterGrades(e.target.checked)}
          id="use-letter-grades"
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <label htmlFor="use-letter-grades" className="text-sm font-medium text-gray-700">Use Letter Grades</label>
      </div>
      {useLetterGrades && (
        <>
          <h2 className="text-2xl font-bold">Letter Grade Cutoffs</h2>
          {cutoffs.map((cutoff, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={cutoff.letter}
                onChange={(e) => handleUpdate(index, 'letter', e.target.value)}
                placeholder="Letter Grade"
                className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="number"
                value={cutoff.minScore}
                onChange={(e) => handleUpdate(index, 'minScore', e.target.value)}
                placeholder="Minimum Score"
                className="w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={() => handleDelete(index)}
                className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newLetter}
              onChange={(e) => setNewLetter(e.target.value)}
              placeholder="New Letter Grade"
              className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              value={newMinScore}
              onChange={(e) => setNewMinScore(e.target.value)}
              placeholder="Minimum Score"
              className="w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleAdd}
              className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Grade
            </button>
          </div>
        </>
      )}
    </div>
  );
}

