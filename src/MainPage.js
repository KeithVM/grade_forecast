import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => {
  const testclasses = [
    { id: 1, name: 'College Writing', grade: 'A', points: 6 },
    { id: 2, name: 'Introduction to Multivariable Calculus', grade: 'B', points: 6 },
    { id: 3, name: 'Introduction to Microeconomics', grade: 'A', points: 12 },
    { id: 4, name: 'Analytical Physics 1', grade: 'C', points: 12 },
    { id: 5, name: 'Introduction to Engineering', grade: 'B+', points: 6 },
    { id: 6, name: 'Introduction to Computer Science', grade: 'D', points: 2},
  ];

  return (
    <div className="main-page">
      <header>
        <h1>Grade Forecast</h1>
      </header>

      <div className="test-api-call">
        <button class="btn">Change Semester</button>
        <p class="current-semester">Current: Spring 2025</p>
      </div>

      <div className="class-list scrollable">
        {testclasses.map((classItem) => (
          <div key={classItem.id} className="class-item">
            <Link to={`/class/${classItem.id}`} state={{classItem}}>
              <h2 class="class-name">{classItem.name}</h2>
              <p>Grade: {classItem.grade}</p>
            </Link>
          </div>
        ))}
      </div>

      <div className="gpa-section">
        <h2>Current Term GPA: 3.82</h2>
        <div className="gpa-chart">{/* Chart Placeholder */}</div>
      </div>
    </div>
  );
};

export default MainPage;