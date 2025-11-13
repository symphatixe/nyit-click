import { X } from 'lucide-react';

interface CourseChipProps {
  course: string;
  onRemove: () => void;
}

export default function CourseChip({ course, onRemove }: CourseChipProps) {
  return (
    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-3 py-1 rounded text-sm">
      <span>{course}</span>
      <button onClick={onRemove} className="hover:bg-blue-200 rounded">
        <X size={15} />
      </button>
    </div>
  );
}
