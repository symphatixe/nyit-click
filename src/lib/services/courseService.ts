import { createClient } from "@/lib/utils/database/supabase/client";
import type { Course } from "@/types";

export async function searchCourses(query: string): Promise<Course[]> {
  const client = createClient();

  if (!query.trim()) {
    // Return top 5 courses when no query
    const { data, error } = await client
      .from("courses")
      .select("*")
      .limit(5)
      .order("course_code", { ascending: true });

    if (error) {
      console.error("Error fetching courses:", error);
      return [];
    }

    return data || [];
  }

  // Search by course name or course code
  const { data, error } = await client
    .from("courses")
    .select("*")
    .or(`name.ilike.%${query}%,course_code.ilike.%${query}%`)
    .limit(5)
    .order("course_code", { ascending: true });

  if (error) {
    console.error("Error searching courses:", error);
    return [];
  }

  return data || [];
}

// export async function getCourseById(courseId: string): Promise<Course | null> {
//   if (!courseId) {
//     return null;
//   }
//   const client = createClient();

//   const { data, error } = await client
//     .from("courses")
//     .select("*")
//     .eq("id", courseId)
//     .single(); // return as one record and not a list of records, bc we only want 1 thing

//   if (error) {
//     console.error("Error fetching course by ID:", error);
//     return null;
//   }

//   if (!data) {
//     return null;
//   }
//   // data returns a list but we only want 1 course bc id is unique.
//   return {
//     id: data?.id,
//     course_code: data?.course_code,
//     name: data?.name,
//     description: data?.description,
//     credits: data?.credits,
//     dept_id: data?.dept_id,
//   };
// }
