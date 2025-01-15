import { React, useState, useEffect } from 'react';
import './output.css';
import { Link } from 'react-router-dom';
import AssignmentList from './components/AssignmentList';
import GradeSummary from './components/GradeSummary';
import UpcomingAssignments from './components/UpcomingAssignments';
import GradingSystemPreview from './components/GradingSystemPreview';
import { useNavigate, useLocation } from 'react-router-dom';
import GradeGraph from './components/GradeGraph.tsx';

export default function ClassPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { classItem } = location.state || {};
    const classId = classItem ? classItem.id : null;

    const [assignments, setAssignments] = useState(() => {
        const savedAssignments = localStorage.getItem('assignments');
        return savedAssignments ? JSON.parse(savedAssignments) : [];
    });

    const [currentSystemId, setCurrentSystemId] = useState(() => {
        return localStorage.getItem('currentSystemId') || null;
    });

    const [gradingSystems] = useState(() => {
        const savedSystems = localStorage.getItem('gradingSystems');
        return savedSystems ? JSON.parse(savedSystems) : [];
    });

    useEffect(() => {
        localStorage.setItem('assignments', JSON.stringify(assignments));
    }, [assignments]);

    useEffect(() => {
        localStorage.setItem('currentSystemId', currentSystemId);
    }, [currentSystemId]);

    const currentSystem = gradingSystems.find(system => system.id === currentSystemId) || gradingSystems[0];

    const handleAddAssignment = (newAssignment) => {
        setAssignments([...assignments, newAssignment]);
    };

    const handleUpdateAssignment = (updatedAssignment) => {
        setAssignments(assignments.map(a => a.id === updatedAssignment.id ? updatedAssignment : a));
    };

    const handleDeleteAssignment = (assignmentId) => {
        setAssignments(assignments.filter(a => a.id !== assignmentId));
    };

    if (!classId) {
        return <div>Class not found</div>;
    }

    return (
        <div>
            <div className="flex">
                <div className="w-1/2 pl-4">
                    <h1 className="text-3xl font-bold mb-4">Grading System</h1>
                    <div className="mb-4 flex justify-between items-center">
                        <select
                            value={currentSystemId || ''}
                            onChange={(e) => setCurrentSystemId(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            {gradingSystems.map(system => (
                                <option key={system.id} value={system.id}>{system.name}</option>
                            ))}
                        </select>
                        <Link to={`/class/${classItem.id}/edit`} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                            Edit Grading System
                        </Link>
                    </div>
                    <div>
                        {currentSystem && currentSystem.categories.length > 0 ? (
                            <AssignmentList
                                assignments={assignments}
                                categories={currentSystem.categories}
                                onAddAssignment={handleAddAssignment}
                                onUpdateAssignment={handleUpdateAssignment}
                                onDeleteAssignment={handleDeleteAssignment}
                            />
                        ) : (
                            <p>Please initialize the grading system to manage assignments.</p>
                        )}
                    </div>
                    <GradeSummary
                        assignments={assignments}
                        categories={currentSystem ? currentSystem.categories : []}
                        useLetterGrades={currentSystem ? currentSystem.useLetterGrades : false}
                        letterGradeCutoffs={currentSystem ? currentSystem.letterGradeCutoffs : []}
                    />
                    <GradeGraph
                        assignments={assignments}
                        categories={currentSystem ? currentSystem.categories : []}
                    />
                    <UpcomingAssignments
                        assignments={assignments}
                        categories={currentSystem ? currentSystem.categories : []}
                    />
                    <GradingSystemPreview system={currentSystem} />
                </div>
            </div>
            <div className="return">
                <button
                    type="button"
                    className="bg-gray-700 text-center w-64 rounded-2xl h-14 relative text-white text-xl font-semibold border-4 border-gray-700 group"
                    onClick={() => navigate('/')}
                >
                    <div
                        className="bg-purple-400 rounded-xl h-12 w-1/5 grid place-items-center absolute left-0 top-0 group-hover:w-full z-10 duration-500"
                    >
                        <svg
                            width="25px"
                            height="25px"
                            viewBox="0 0 1024 1024"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill="#ffffff"
                                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                            ></path>
                            <path
                                fill="#ffffff"
                                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                            ></path>
                        </svg>
                    </div>
                    <p className="translate-x-4 ml-5">Return to Main Page</p>
                </button>
            </div>
        </div>
    );
}
//     const { classItem } = location.state;
//     const navigate = useNavigate();
//     const classId = classItem.id;
    
//     const [categories, setCategories] = React.useState(() => {
//         const savedCategories = localStorage.getItem(`categories_${classId}`);
//         return savedCategories ? JSON.parse(savedCategories) : [];
//     });

//     const [assignments, setAssignments] = React.useState(() => {
//         const savedAssignments = localStorage.getItem(`assignments_${classId}`);
//         return savedAssignments ? JSON.parse(savedAssignments) : [];
//     });

//     const [gradingSystems, setGradingSystems] = React.useState(() => {
//         const savedSystems = localStorage.getItem(`gradingSystems_${classId}`);
//         return savedSystems ? JSON.parse(savedSystems) : [];
//     });

//     const [currentSystemId, setCurrentSystemId] = React.useState(() => {
//         return localStorage.getItem(`currentSystemId_${classId}`) || null;
//     });

//     const [newSystemName, setNewSystemName] = React.useState('');

//     const [useLetterGrades, setUseLetterGrades] = React.useState(() => {
//         const savedUseLetterGrades = localStorage.getItem(`useLetterGrades_${classId}`);
//         return savedUseLetterGrades ? JSON.parse(savedUseLetterGrades) : true;
//     });

//     const [letterGradeCutoffs, setLetterGradeCutoffs] = React.useState(() => {
//         const savedCutoffs = localStorage.getItem(`letterGradeCutoffs_${classId}`);
//         return savedCutoffs ? JSON.parse(savedCutoffs) : defaultLetterGradeCutoffs;
//     });

//     const [targetGrade, setTargetGrade] = React.useState(() => {
//         const savedTargetGrade = localStorage.getItem(`targetGrade_${classId}`);
//         return savedTargetGrade ? parseFloat(savedTargetGrade) : 90;
//     });

//     React.useEffect(() => {
//         localStorage.setItem(`categories_${classId}`, JSON.stringify(categories));
//     }, [categories, classId]);

//     React.useEffect(() => {
//         localStorage.setItem(`assignments_${classId}`, JSON.stringify(assignments));
//     }, [assignments, classId]);

//     React.useEffect(() => {
//         localStorage.setItem(`gradingSystems_${classId}`, JSON.stringify(gradingSystems));
//     }, [gradingSystems, classId]);

//     React.useEffect(() => {
//         localStorage.setItem(`currentSystemId_${classId}`, currentSystemId);
//     }, [currentSystemId, classId]);

//     React.useEffect(() => {
//         localStorage.setItem(`useLetterGrades_${classId}`, JSON.stringify(useLetterGrades));
//     }, [useLetterGrades, classId]);

//     React.useEffect(() => {
//         localStorage.setItem(`letterGradeCutoffs_${classId}`, JSON.stringify(letterGradeCutoffs));
//     }, [letterGradeCutoffs, classId]);

//     React.useEffect(() => {
//         localStorage.setItem(`targetGrade_${classId}`, targetGrade.toString());
//     }, [targetGrade, classId]);

//     const handleAddCategory = (category) => {
//         setCategories([...categories, category]);
//     };

//     const handleUpdateCategory = (updatedCategory) => {
//         setCategories(categories.map(c => c.id === updatedCategory.id ? updatedCategory : c));
//     };

//     const handleDeleteCategory = (categoryId) => {
//         setCategories(categories.filter(c => c.id !== categoryId));
//         setAssignments(assignments.filter(a => a.categoryId !== categoryId));
//     };

//     const handleAddAssignment = (assignment) => {
//         setAssignments([...assignments, assignment]);
//     };

//     const handleUpdateAssignment = (updatedAssignment) => {
//         setAssignments(assignments.map(a => a.id === updatedAssignment.id ? updatedAssignment : a));
//     };

//     const handleDeleteAssignment = (assignmentId) => {
//         setAssignments(assignments.filter(a => a.id !== assignmentId));
//     };

//     const handleSaveSystem = () => {
//         if (newSystemName) {
//             const newSystem = {
//                 id: Date.now().toString(),
//                 name: newSystemName,
//                 categories: categories,
//                 useLetterGrades: useLetterGrades,
//                 letterGradeCutoffs: useLetterGrades ? letterGradeCutoffs : undefined
//             };
//             setGradingSystems([...gradingSystems, newSystem]);
//             setNewSystemName('');
//             setCurrentSystemId(newSystem.id);
//         }
//     };

//     const handleLoadSystem = (systemId) => {
//         const system = gradingSystems.find(s => s.id === systemId);
//         if (system) {
//             setCategories(system.categories);
//             setUseLetterGrades(system.useLetterGrades);
//             setLetterGradeCutoffs(system.letterGradeCutoffs || []);
//             setCurrentSystemId(system.id);
//         }
//     };
    
//     return (
//     <div className="p-0 bg-gray-800 min-h-screen">
//         <header className="bg-gray-900 text-white w-full relative top-0 p-2 align-middle mb-6">
//             <h1 className="text-5xl font-bold text-center text-purple-600">Grade Forecast</h1>
//         </header>

//         <h2 className="text-3xl font-bold">{classItem.name}</h2>
//         <div className="space-y-4">
//         <h2 className="text-2xl font-bold">Grading Systems</h2>
//         <div className="flex items-center space-x-2">
//             <input
//             type="text"
//             value={newSystemName}
//             onChange={(e) => setNewSystemName(e.target.value)}
//             placeholder="New system name"
//             className="px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-gray-700 text-white"
//             />
//             <button
//             onClick={handleSaveSystem}
//             className="px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
//             >
//             Save Current System
//             </button>
//         </div>
//         <select
//             value={currentSystemId || ''}
//             onChange={(e) => handleLoadSystem(e.target.value)}
//             className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-gray-700 text-white"
//         >
//             <option value="">Load a grading system</option>
//             {gradingSystems.map(system => (
//             <option key={system.id} value={system.id}>{system.name}</option>
//             ))}
//         </select>
//         </div>

//         <div className="space-y-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <GradeWeightForm
//             categories={categories}
//             onAddCategory={handleAddCategory}
//             onUpdateCategory={handleUpdateCategory}
//             onDeleteCategory={handleDeleteCategory}
//             />

//             <div className="space-y-8">
//             <LetterGradeCutoffsForm
//                 useLetterGrades={useLetterGrades}
//                 onToggleLetterGrades={setUseLetterGrades}
//                 cutoffs={letterGradeCutoffs}
//                 onUpdate={setLetterGradeCutoffs}
//             />

//             <div>
//                 <h2 className="text-2xl font-bold">Target Grade</h2>
//                 <input
//                 type="number"
//                 value={targetGrade}
//                 onChange={(e) => setTargetGrade(parseFloat(e.target.value))}
//                 placeholder="Target Grade"
//                 className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-gray-700 text-white"
//                 />
//             </div>
//             </div>
//         </div>

//         <AssignmentForm
//             categories={categories}
//             assignments={assignments}
//             onAddAssignment={handleAddAssignment}
//             onUpdateAssignment={handleUpdateAssignment}
//             onDeleteAssignment={handleDeleteAssignment}
//         />

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <GradeDisplay
//             categories={categories}
//             assignments={assignments}
//             useLetterGrades={useLetterGrades}
//             letterGradeCutoffs={letterGradeCutoffs}
//             />
//             <GradeGraph categories={categories} assignments={assignments} />
//         </div>

//         <UpcomingAssignments
//             assignments={assignments}
//             categories={categories}
//             letterGradeCutoffs={letterGradeCutoffs}
//             targetGrade={targetGrade}
//         />
//         </div>
//     </div>
//     );
// }
