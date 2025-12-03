'use client';
import React from 'react'
import SemesterMap from '../components/SemesterMap';

export default function Landing() {
  const handleSubmit = (completedCourses: string[]) => {
    console.log('Completed courses:', completedCourses);
  }
  return (
    <div>
      <h1>NYIT Link</h1>
      <p>We&apos;ll make college simple for you.</p>
      <SemesterMap onSubmit={handleSubmit}/>
    </div>
  );
}
