import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function PlannerPage() {
  // const supabase = await createClient()
  // const { data: { user }, } = await supabase.auth.getUser()
  // if (!user) {
  //   return <p>Unauthorized</p>
  // }

  const supabase = await createClient()
  
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
      redirect('/login')
    }
  return (
    <div className="pt-24">
      <p>Planner: Hello {data.user.email}</p>
      <p>ID: {data.user.id}</p>
      
    </div>
  )
}
