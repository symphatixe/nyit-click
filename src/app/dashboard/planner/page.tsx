import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function PlannerPage() {
  // const supabase = await createClient()
  // const { data: { user }, } = await supabase.auth.getUser()
  // if (!user) {
  //   return <p>Unauthorized</p>
  // }

  const supabase = await createClient();
  
  const { data, error: userError } = await supabase.auth.getUser();
  if (userError || !data?.user) {
    redirect('/login');
  }

  const {data: userData, error} = await supabase.from('users').select('first_name, last_name, email, created_at').eq('id', data.user.id).single();
  //need RLS
  if(error) {
    console.error('Error fetching userData');
    return <div>Error grabbing data</div>
  }
  return (
    <div className="pt-24">
      <p>Planner: Hello {data.user.email}</p>
      <p>ID: {data.user.id}</p>
      <p>{userData.email}</p>
      <p>Name: {userData.first_name} {userData.last_name}</p>
    </div>
  )
}
