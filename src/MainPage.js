import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './output.css';
import { GradeCard } from './components/grade-card.tsx';
import { GPAChart } from './components/gpa-chart.tsx';

const MainPage = () => {
    const [classes, setClasses] = useState([]);
    const [newClass, setNewClass] = useState({
      name: '',
      points: '',
      professor: ''
    });
  
    useEffect(() => {
      const storedClasses = JSON.parse(localStorage.getItem('classes')) || [];
      const updatedClasses = storedClasses.map(classItem => {
        const assignments = JSON.parse(localStorage.getItem(`assignments_${classItem.id}`)) || [];
        const gradingSystems = JSON.parse(localStorage.getItem(`gradingSystems_${classItem.id}`)) || [];
        const currentSystemId = localStorage.getItem(`currentSystemId_${classItem.id}`);
        const currentSystem = gradingSystems.find(system => system.id === currentSystemId) || gradingSystems[0];
  
        const totalScore = assignments.reduce((sum, a) => sum + (a.graded ? a.score : 0), 0);
        const totalPoints = assignments.reduce((sum, a) => sum + (a.graded ? a.totalPoints : 0), 0);
        const grade = totalPoints > 0 ? ((totalScore / totalPoints) * 100).toFixed(2) : 'N/A';
  
        const letterGrade = currentSystem
          ? currentSystem.letterGradeCutoffs.find(cutoff => grade >= cutoff.minScore)?.letter || 'N/A'
          : 'N/A';
  
        const lastUpdated = assignments.length > 0
          ? new Date(Math.max(...assignments.map(a => new Date(a.date).getTime()))).toISOString().split('T')[0]
          : 'N/A';
  
        return {
          ...classItem,
          grade: letterGrade,
          lastUpdated
        };
      });
      setClasses(updatedClasses);
    }, []);
  
    const handleAddClass = () => {
      const newClassItem = {
        id: Date.now().toString(),
        name: newClass.name,
        points: parseFloat(newClass.points),
        professor: newClass.professor,
        grade: 'N/A',
        lastUpdated: 'N/A'
      };
      const updatedClasses = [...classes, newClassItem];
      setClasses(updatedClasses);
      localStorage.setItem('classes', JSON.stringify(updatedClasses));
      setNewClass({ name: '', points: '', professor: '' });
    };
  
    const handleDeleteClass = (classId) => {
      const updatedClasses = classes.filter(classItem => classItem.id !== classId);
      setClasses(updatedClasses);
      localStorage.setItem('classes', JSON.stringify(updatedClasses));
    };

  return (
    <div className="p-0 bg-gray-800 min-h-screen flex flex-col items-center">
      
      <header className="bg-gray-900 text-white w-full relative top-0 p-2 align-middle mb-6">
        <h1 className="text-5xl font-bold text-center text-purple-600">Grade Forecast</h1>
      </header>

      <div className="flex mb-5 items-center">
        <button className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">Test API</button>
        <p className="m-0 text-left text-purple-300 flex text-2xl items-center h-full mt-5 ml-5 font-light text-xl font-bold">Current: Spring 2025</p>
      </div>
      {classes.length > 0 && (
        <div className="flex justify-around items-start mt-5 flex flex-col md:flex-row gap-6">
          <div className="rounded-lg mx-8 w-2/5 bg-gray-300 inline-block align-top max-w-[70vh] max-h-[68vh] ml-[10vw] scrollable flex-1 overflow-y-auto">
            {classes.map((classItem) => (
              <div key={classItem.id} className="relative">
                <Link to={`/class/${classItem.id}`} state={{ classItem }} key={classItem.id} className="no-underline block mb-4">
                  <GradeCard
                    courseName={classItem.name}
                    grade={classItem.grade}
                    credits={classItem.points}
                    professor={classItem.professor}
                    lastUpdated={classItem.lastUpdated}
                  />
                </Link>
                <button
                  onClick={() => handleDeleteClass(classItem.id)}
                  className="absolute top-0 right-0 mt-2 mr-2 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          <div className="mt-4 p-4 border rounded-md bg-gray-300 w-full">
            <h3 className="text-xl font-semibold mb-2">Add New Class</h3>
            <div className="space-y-2">
              <input
                type="text"
                value={newClass.name}
                onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                placeholder="Class Name"
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="number"
                value={newClass.points}
                onChange={(e) => setNewClass({ ...newClass, points: e.target.value })}
                placeholder="Credits"
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="text"
                value={newClass.professor}
                onChange={(e) => setNewClass({ ...newClass, professor: e.target.value })}
                placeholder="Professor"
                className="w-full px-3 py-2 border rounded"
              />
              <button
                onClick={handleAddClass}
                className="w-full px-3 py-2 bg-blue-600 text-white rounded"
              >
                Add Class
              </button>
            </div>
          </div>
          </div>
          <div className="text-center mt-0 mr-[10vw] inline-block align-top bg-gray-300 w-[45vw] h-[68vh] rounded-3xl shadow-lg max-w-[70vh] flex-1 bg-white p-6 rounded shadow-md">
            <header className="text-center align-top bg-gray-300 box-border rounded-t-3xl p-2 relative top-0 w-full mb-4">
              <h2 className="text-purple-400 text-3xl font-semibold">Current Term GPA: 3.82</h2>
            </header>
            <div className="text-center mb-4">
              <p className=" text-2xl text-gray-600 mt-[-2.5]">Projected</p>
              <h3 className="text-4xl font-bold">GPA: 3.79</h3>
              <p className="text-lg text-gray-500">
                From Fall 2024 - Spring 2025
              </p>
            </div>
            <div className="mr-[5vw] w-[90%] h-[300px] flex justify-center items-center mb-4">
              <GPAChart />
            </div>
            <div className="mt-4 text-lg text-gray-500">
              GPA: 3.76
              <br />
              From Fall 2024 - Fall 2024
            </div>
          </div>
      </div>
      )}
      {classes.length === 0 && (
      <div className="mt-4 p-4 border rounded-md bg-gray-300 max-w-[70vh] ">
        <h3 className="text-xl font-semibold mb-2">Add New Class</h3>
        <div className="space-y-2">
          <input
            type="text"
            value={newClass.name}
            onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
            placeholder="Class Name"
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="number"
            value={newClass.points}
            onChange={(e) => setNewClass({ ...newClass, points: e.target.value })}
            placeholder="Credits"
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            value={newClass.professor}
            onChange={(e) => setNewClass({ ...newClass, professor: e.target.value })}
            placeholder="Professor"
            className="w-full px-3 py-2 border rounded"
          />
          <button
            onClick={handleAddClass}
            className="w-full px-3 py-2 bg-blue-600 text-white rounded"
          >
            Add Class
          </button>
        </div>
      </div>
      )}
    </div>
  );
};

export default MainPage;