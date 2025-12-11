import { createClient } from "@/lib/utils/database/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
	const supabase = await createClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (session?.user) {
		redirect("/dashboard");
	}

	const features = [
		{
			title: "AI Planner",
			description:
				"Get class recommendations based on your course map. Avoid stress and let us do the work for you!",
			href: "/login",
			icon: "🤖",
		},
		{
			title: "Match Schedule",
			description:
				"Find students with similar schedules for similar course interests and support.",
			href: "/login",
			icon: "🤝",
		},
		{
			title: "Resource Central",
			description:
				"Browse and share notes, materials, and useful links uploaded by your classmates to make your coursework easier!",
			href: "/login",
			icon: "📚",
		},
		{
			title: "Ratings & Feedback",
			description:
				"Read and submit anonymous feedback on courses and professors to better serve the interests of your peers.",
			href: "/login",
			icon: "⭐",
		},
	];

	return (
		<div className="min-h-screen bg-linear-to-b from-[#002D72] to-[#001a44]">
			<section className="container mx-auto px-6 pt-20 pb-16">
				<div className="max-w-4xl mx-auto text-center">
					<h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
						Welcome to NYIT Click!
					</h1>
					<p className="text-[#F2A900] text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
						Organize your college journey at NYIT with our newly launched AI
						schedule advisor, course planner, schedule match, and ratings from
						your fellow peers!
					</p>
				</div>
			</section>

			<section className="container mx-auto px-6 pb-20">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
					{features.map((feature) => (
						<Link
							key={feature.title}
							href={feature.href}
							className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
						>
							<div className="flex items-start gap-4">
								<span className="text-4xl" aria-hidden="true">
									{feature.icon}
								</span>
								<div className="flex-1">
									<h3 className="text-[#002D72] text-2xl font-bold mb-3 group-hover:text-[#F2A900] transition-colors">
										{feature.title}
									</h3>
									<p className="text-gray-700 leading-relaxed">
										{feature.description}
									</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</section>

			<section className="container mx-auto px-6 pb-20">
				<div className="max-w-4xl mx-auto text-center bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20">
					<h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
						Ready to get started?
					</h2>
					<p className="text-white/90 text-lg mb-8">Join NYIT Click today!</p>
					<Link
						href="/login"
						className="inline-block bg-[#F2A900] hover:bg-[#e29500] text-[#002D72] px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg hover:shadow-xl"
					>
						Get Started Today
					</Link>
				</div>
			</section>
		</div>
	);
}
