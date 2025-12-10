'use client';
import React from 'react'
import SemesterMap from '@/components/semester-map/SemesterMap';
import LogoutButton from '@/components/authentication/Logout';

export default function Landing() {
    const handleSubmit = (completedCourses: string[]) => {
        console.log('Completed courses:', completedCourses);
    }
    return (
        <div>
            <SemesterMap onSubmit={handleSubmit} />
        </div>
    );
}