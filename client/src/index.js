import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/homepage/Homepage';
import StudentForm from './components/student form/StudentForm';
import UpdateStudentData from './components/update/UpdateStudentData';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/studentform' element={<StudentForm />} />
      <Route path='/updatestudent/:id' element={<UpdateStudentData />} />
    </Routes>
  </BrowserRouter>
);
