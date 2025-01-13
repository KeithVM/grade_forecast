import React from 'react';
import { Link } from 'react-router-dom';
import './main.css';
import { GradeCard } from './components/grade-card.tsx';
import { GPAChart } from './components/gpa-chart.tsx';

const MainPage = () => {
  const testclasses = [
    { id: 1, name: 'College Writing', grade: 'A', points: 6, professor: 'Dr. Smith', lastUpdated: '2025-01-15' },
    { id: 2, name: 'Introduction to Multivariable Calculus', grade: 'B', points: 6, professor: 'Dr. Johnson', lastUpdated: '2025-01-10' },
    { id: 3, name: 'Introduction to Microeconomics', grade: 'A', points: 12, professor: 'Dr. Lee', lastUpdated: '2025-01-12' },
    { id: 4, name: 'Analytical Physics 1', grade: 'C', points: 12, professor: 'Dr. Brown', lastUpdated: '2025-01-08' },
    { id: 5, name: 'Introduction to Engineering', grade: 'B+', points: 6, professor: 'Dr. Davis', lastUpdated: '2025-01-14' },
    { id: 6, name: 'Introduction to Computer Science', grade: 'D', points: 2, professor: 'Dr. Wilson', lastUpdated: '2025-01-11' },
  ];

  return (
    <div className="main-page p-6 bg-gray-100 min-h-screen">
      <header className="main-header mb-6">
        <h1 className="text-5xl font-bold text-center text-purple-600">Grade Forecast</h1>
      </header>

      <div className="semester-toggle flex justify-between items-center mb-6">
        <button className="change-semester bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">Test API</button>
        <p className="current-semester text-xl font-bold text-gray-700">Current: Spring 2025</p>
      </div>
      <div className="main-content flex flex-col md:flex-row gap-6">
        <div className="class-list scrollable flex-1 overflow-y-auto">
          {testclasses.map((classItem) => (
            <Link to={`/class/${classItem.id}`} state={{ classItem }} key={classItem.id} className="no-underline block mb-4">
              <GradeCard
                courseName={classItem.name}
                grade={classItem.grade}
                credits={classItem.points}
                professor={classItem.professor}
                lastUpdated={classItem.lastUpdated}
              />
            </Link>
          ))}
        </div>
        <div className="gpa-section flex-1 bg-white p-6 rounded shadow-md">
          <header className="gpa-header mb-4">
            <h2 className="text-purple-400 text-3xl font-semibold">Current Term GPA: 3.82</h2>
          </header>
          <div className="text-center mb-4">
            <p className="projected-text">Projected</p>
            <h3 className="gpa-large">GPA: 3.79</h3>
            <p className="text-lg text-gray-500">
              From Fall 2024 - Spring 2025
            </p>
          </div>
          <div className="chart-container mb-4">
            <GPAChart />
          </div>
          <div className="mt-4 text-lg text-gray-500">
            GPA: 3.76
            <br />
            From Fall 2024 - Fall 2024
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;