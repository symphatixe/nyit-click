'use client';
import SemesterMap from '@/app/components/SemesterMap';


export default function SemesterMapPage() {
   

    const handleSubmit = (completedCourses: string[]) => {
        console.log('Completed courses:', completedCourses);
        // You can add additional logic here after successful submission
    };



    return (
      <div className="min-h-screen bg-gray-50 py-8 pt-24">
            <SemesterMap onSubmit={handleSubmit} />
        </div>
    );
}