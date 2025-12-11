import { redirect } from "next/navigation";
import { createClient } from "@/lib/utils/database/supabase/server";
import NavBar from "@/components/layout/NavBar";

export default async function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="min-h-screen flex flex-col">
			<NavBar />

			<main className="flex-1 bg-gray-50">{children}</main>
		</div>
	);
}
