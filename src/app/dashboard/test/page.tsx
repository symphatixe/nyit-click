
import { redirect } from 'next/navigation';
import React from 'react'
import LogoutButton from 'src/app/components/LogoutButton';
import { createClient } from 'src/utils/supabase/server';

export default async function Test() {
  const supabase = await createClient()
  const { data, error: userError } = await supabase.auth.getUser()



  if (userError || !data?.user) {

    redirect('/login')
  }
  const { data: userData, error } = await supabase.from('users').select('first_name, last_name, email, created_at').eq('id', data.user.id).single()
  return (
    <div>
      <LogoutButton />
      <p>{userData?.email}</p>
    </div>
  );
}
