import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ExamDetails from '../components/ExamDetails';

const SchoolPlanning = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Check if the "Exams" radio button is selected
  const isExamsSelected = pathname.includes('/school/exams');

  // Redirect to "Exams" by default if no option is selected
  if (!isExamsSelected) {
    navigate('/school/exams');
  }

  return (
    <div>
      {/* Render ExamDetails only when "Exams" is selected */}
      {isExamsSelected && <ExamDetails />}
    </div>
  );
};

export default SchoolPlanning;
