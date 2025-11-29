
// import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Header from "../components/header";
import { createClient } from "src/utils/supabase/server";


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