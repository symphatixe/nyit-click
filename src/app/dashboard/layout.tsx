
// import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Header from "@/components/layout/NavBar";
import { createClient } from "@/lib/utils/database/supabase/server";



export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }
    return (


        <div>
            <Header />
            {children}
        </div>



    );
}