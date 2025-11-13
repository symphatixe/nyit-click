import NavBar from "@/app/components/NavBar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if(!user){
        redirect('/login');
    }
    return (
       
            
        <div>
            <NavBar />
            {children}
        </div>        
                
            
        
    );
}
