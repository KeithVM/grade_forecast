import React from 'react';
import { useNavigate } from 'react-router-dom';
import './main.css';
import { useLocation } from 'react-router-dom';
import { GradeWeightForm } from './components/GradeWeightForm.tsx';
import { AssignmentForm } from './components/AssignmentForm.tsx';
import { GradeDisplay } from './components/GradeDisplay.tsx';
import { LetterGradeCutoffsForm } from './components/LetterGradeCutoffsForm.tsx';
import { GradeGraph } from './components/GradeGraph.tsx';
import { UpcomingAssignments } from './components/UpcomingAssignments.tsx';
import { Category, Assignment, GradingSystem, LetterGradeCutoff } from './types.ts';

const defaultLetterGradeCutoffs = [
    { letter: 'A', minScore: 90 },
    { letter: 'B', minScore: 80 },
    { letter: 'C', minScore: 70 },
    { letter: 'D', minScore: 60 },
    { letter: 'F', minScore: 0 },
];

export default function ClassPage() {
    const [categories, setCategories] = React.useState([]);
    const [assignments, setAssignments] = React.useState([]);
    const [gradingSystems, setGradingSystems] = React.useState([]);
    const [currentSystemId, setCurrentSystemId] = React.useState(null);
    const [newSystemName, setNewSystemName] = React.useState('');
    const [useLetterGrades, setUseLetterGrades] = React.useState(true);
    const [letterGradeCutoffs, setLetterGradeCutoffs] = React.useState(defaultLetterGradeCutoffs);
    const [targetGrade, setTargetGrade] = React.useState(90);
    const location = useLocation();
    const { classItem } = location.state;
    const navigate = useNavigate();
    

    React.useEffect(() => {
    const storedSystems = localStorage.getItem('gradingSystems');
    if (storedSystems) {
        setGradingSystems(JSON.parse(storedSystems));
    }
    }, []);

    React.useEffect(() => {
    localStorage.setItem('gradingSystems', JSON.stringify(gradingSystems));
    }, [gradingSystems]);

    const handleAddCategory = (category) => {
    setCategories([...categories, category]);
    };

    const handleUpdateCategory = (updatedCategory) => {
    setCategories(categories.map(c => c.id === updatedCategory.id ? updatedCategory : c));
    };

    const handleDeleteCategory = (categoryId) => {
    setCategories(categories.filter(c => c.id !== categoryId));
    setAssignments(assignments.filter(a => a.categoryId !== categoryId));
    };

    const handleAddAssignment = (assignment) => {
    setAssignments([...assignments, assignment]);
    };

    const handleUpdateAssignment = (updatedAssignment) => {
    setAssignments(assignments.map(a => a.id === updatedAssignment.id ? updatedAssignment : a));
    };

    const handleDeleteAssignment = (assignmentId) => {
    setAssignments(assignments.filter(a => a.id !== assignmentId));
    };

    const handleSaveSystem = () => {
    if (newSystemName) {
        const newSystem = {
        id: Date.now().toString(),
        name: newSystemName,
        categories: categories,
        useLetterGrades: useLetterGrades,
        letterGradeCutoffs: useLetterGrades ? letterGradeCutoffs : undefined
        };
        setGradingSystems([...gradingSystems, newSystem]);
        setNewSystemName('');
        setCurrentSystemId(newSystem.id);
    }
    };

    const handleLoadSystem = (systemId) => {
    const system = gradingSystems.find(s => s.id === systemId);
    if (system) {
        setCategories(system.categories);
        setUseLetterGrades(system.useLetterGrades);
        setLetterGradeCutoffs(system.letterGradeCutoffs || []);
        setCurrentSystemId(system.id);
    }
    };

    return (
    <div className="container mx-auto p-4 space-y-8">
        <header class="bg-gray-900 text-white w-full relative top-0 p-2 align-middle">
            <h1>Grade Forecast</h1>
        </header>

        <div className="space-y-4">
        <h2 className="text-2xl font-bold">Grading Systems</h2>
        <div className="flex items-center space-x-2">
            <input
            type="text"
            value={newSystemName}
            onChange={(e) => setNewSystemName(e.target.value)}
            placeholder="New system name"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <button
            onClick={handleSaveSystem}
            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
            Save Current System
            </button>
        </div>
        <select
            value={currentSystemId || ''}
            onChange={(e) => handleLoadSystem(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
            <option value="">Load a grading system</option>
            {gradingSystems.map(system => (
            <option key={system.id} value={system.id}>{system.name}</option>
            ))}
        </select>
        </div>

        <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GradeWeightForm
            categories={categories}
            onAddCategory={handleAddCategory}
            onUpdateCategory={handleUpdateCategory}
            onDeleteCategory={handleDeleteCategory}
            />

            <div className="space-y-8">
            <LetterGradeCutoffsForm
                useLetterGrades={useLetterGrades}
                onToggleLetterGrades={setUseLetterGrades}
                cutoffs={letterGradeCutoffs}
                onUpdate={setLetterGradeCutoffs}
            />

            <div>
                <h2 className="text-2xl font-bold">Target Grade</h2>
                <input
                type="number"
                value={targetGrade}
                onChange={(e) => setTargetGrade(parseFloat(e.target.value))}
                placeholder="Target Grade"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            </div>
        </div>

        <AssignmentForm
            categories={categories}
            assignments={assignments}
            onAddAssignment={handleAddAssignment}
            onUpdateAssignment={handleUpdateAssignment}
            onDeleteAssignment={handleDeleteAssignment}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GradeDisplay
            categories={categories}
            assignments={assignments}
            useLetterGrades={useLetterGrades}
            letterGradeCutoffs={letterGradeCutoffs}
            />
            <GradeGraph categories={categories} assignments={assignments} />
        </div>

        <UpcomingAssignments
            assignments={assignments}
            categories={categories}
            letterGradeCutoffs={letterGradeCutoffs}
            targetGrade={targetGrade}
        />
        </div>
        <div className="return">
            <button
                type="button"
                class="bg-white text-center w-64 rounded-2xl h-14 relative text-black text-xl font-semibold border-4 border-white group"
                onClick={() => navigate('/')}
                >
                <div
                    class="bg-purple-400 rounded-xl h-12 w-1/5 grid place-items-center absolute left-0 top-0 group-hover:w-full z-10 duration-500"
                >
                    <svg
                    width="25px"
                    height="25px"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        fill="#000000"
                        d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                    ></path>
                    <path
                        fill="#000000"
                        d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                    ></path>
                    </svg>
                </div>
                <p class="translate-x-4 ml-5">Return to Main Page</p>
            </button>
        </div>
    </div>
    );
}
