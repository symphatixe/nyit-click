import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { logout } from '../(auth)/actions'
import LogoutButton from '../components/LogoutButton'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return(
    <div className="pt-24">
      <p >Dash: Hello {data.user.email}</p>
      <LogoutButton />
    </div>
    
  )
  
}