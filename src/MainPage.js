import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';
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
    <div className="main-page">
      <header className="main-header">
        <h1>Grade Forecast</h1>
      </header>

      <div className="semester-toggle">
        <button className="btn">Test API</button>
        <p className="current-semester">Current: Spring 2025</p>
      </div>
      <div className="main-content">
        <div className="class-list scrollable">
          {testclasses.map((classItem) => (
            <Link to={`/class/${classItem.id}`} state={{ classItem }} key={classItem.id} className="no-underline">
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
        <div className="gpa-section">
          <header className="gpa-header">
            <h2 className="text-purple-400 current-term">Current Term GPA: 3.82</h2>
          </header>
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold mb-1">GPA: 3.79</h3>
            <p className="text-sm text-muted-foreground">
              From Fall 2024 - Spring 2025
            </p>
          </div>
          <div class="chart-container">
            <GPAChart />
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
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