import Image from "next/image";
import './globals.css';
import Link from "next/link";
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'


export default async function Home() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if(session?.user) {
    redirect('/dashboard')
  }
  

  return (
    <div className="pt-30 flex justify-between items-center h-full w-full px-4 2xl:px-16">
      <main>
        
        <h1 className="text-6xl"> 
          Welcome
        </h1>
        <Link
          href="/login"
          className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400/70"
        >
          Get started
        </Link>
        
      </main>
    </div>
  );
}
