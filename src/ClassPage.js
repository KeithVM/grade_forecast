import React from 'react';
import { useParams } from 'react-router-dom';
import './ClassPage.css';
import { useLocation } from 'react-router-dom';

const ClassPage = () => {
    const location = useLocation();
    const { classItem } = location.state;

    const classDetails = {
        homework: '79.87%',
        projects: '89.34%',
        participation: '100%',
        midterms: '85.61%',
        final: '',
        weight: {
        homework: 10,
        projects: 20,
        participation: 5,
        midterms: 40,
        finalExam: 25,
        },
    };

    return (
        <div className="class-page">
        <header>
            <h1>Grade Forecast</h1>
        </header>

        <div className="class-details">
            <h2>{classItem.name}</h2>
            <p>Current Grade: 86.8%</p>
            <p>Target Grade: 85%</p>
            <div className="grade-chart">{/* Chart Placeholder */}</div>

            <div className="upcoming-section">
            <h3>Upcoming Assignments/Exams</h3>
            <ul>
                <li>Problem Set 8: <span>Due Feb 29, 2025</span></li>
                <li>Midterm 2: <span>April 8, 2025</span></li>
            </ul>
            </div>

            <div className="grade-weight">
            <h3>Grade Weight</h3>
            <ul>
                {Object.entries(classDetails.weight).map(([key, value]) => (
                <li key={key}>
                    {key}: {value}%
                </li>
                ))}
            </ul>
            </div>
        </div>
        </div>
    );
};

export default ClassPage;