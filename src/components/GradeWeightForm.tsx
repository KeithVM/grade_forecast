import React from 'react';
import { Category } from '../types';

interface GradeWeightFormProps {
  categories: Category[];
  onAddCategory: (category: Category) => void;
  onUpdateCategory: (category: Category) => void;
  onDeleteCategory: (categoryId: string) => void;
}

export function GradeWeightForm({ categories, onAddCategory, onUpdateCategory, onDeleteCategory }: GradeWeightFormProps) {
  const [newCategoryName, setNewCategoryName] = React.useState('');
  const [newCategoryWeight, setNewCategoryWeight] = React.useState('');

  const handleAddCategory = () => {
    if (newCategoryName && newCategoryWeight) {
      onAddCategory({
        id: Date.now().toString(),
        name: newCategoryName,
        weight: parseFloat(newCategoryWeight)
      });
      setNewCategoryName('');
      setNewCategoryWeight('');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Grade Weights</h2>
      {categories.map(category => (
        <div key={category.id} className="flex items-center space-x-2">
          <input
            type="text"
            value={category.name}
            onChange={(e) => onUpdateCategory({ ...category, name: e.target.value })}
            placeholder="Category name"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="number"
            value={category.weight}
            onChange={(e) => onUpdateCategory({ ...category, weight: parseFloat(e.target.value) })}
            placeholder="Weight (%)"
            className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={() => onDeleteCategory(category.id)}
            className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      ))}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New category name"
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="number"
          value={newCategoryWeight}
          onChange={(e) => setNewCategoryWeight(e.target.value)}
          placeholder="Weight (%)"
          className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          onClick={handleAddCategory}
          className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Category
        </button>
      </div>
    </div>
  );
}

