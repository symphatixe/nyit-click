"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { signup } from "@/app/(auth)/actions";

export default function RegisterPage() {
	const router = useRouter();
	const [state, formAction, pending] = useActionState(signup, null);

	return (
		<div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-50 to-gray-100 px-4">
			<div className="max-w-md w-full">
				<div className="text-center mb-8">
					<Link href="/" className="text-4xl font-bold text-maincolor">
						NYIT Click
					</Link>
					<p className="mt-2 text-muted-foreground">Create your account</p>
				</div>

				<div className="bg-card rounded-lg shadow-lg p-8">
					<h2 className="text-2xl font-bold text-center text-card-foreground mb-6">
						Sign Up
					</h2>

					{state?.error && (
						<div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
							<div className="flex items-start gap-3">
								<AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
								<div className="flex-1">
									<p className="text-sm text-red-800 font-medium mb-1">
										{state.error}
									</p>
									{state.error.includes("already registered") && (
										<p className="text-xs text-red-700 mt-2">
											Already have an account?{" "}
											<button
												type="button"
												onClick={() => router.push("/login")}
												className="font-semibold underline hover:text-red-900"
											>
												Sign in here
											</button>
										</p>
									)}
								</div>
							</div>
						</div>
					)}

					<form action={formAction} className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="first_name"
									className="block text-sm font-medium text-card-foreground mb-1"
								>
									First Name
								</label>
								<input
									id="first_name"
									type="text"
									name="first_name"
									placeholder="John"
									required
									disabled={pending}
									className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-maincolor focus:border-maincolor transition-colors disabled:opacity-50"
								/>
							</div>

							<div>
								<label
									htmlFor="last_name"
									className="block text-sm font-medium text-card-foreground mb-1"
								>
									Last Name
								</label>
								<input
									id="last_name"
									type="text"
									name="last_name"
									placeholder="Doe"
									required
									disabled={pending}
									className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-maincolor focus:border-maincolor transition-colors disabled:opacity-50"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-card-foreground mb-1"
							>
								Email
							</label>
							<input
								id="email"
								type="email"
								name="email"
								placeholder="you@nyit.edu"
								required
								disabled={pending}
								className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-maincolor focus:border-maincolor transition-colors disabled:opacity-50"
							/>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-card-foreground mb-1"
							>
								Password
							</label>
							<input
								id="password"
								type="password"
								name="password"
								placeholder="••••••••"
								required
								minLength={8}
								disabled={pending}
								className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-maincolor focus:border-maincolor transition-colors disabled:opacity-50"
							/>
							<p className="mt-1 text-xs text-muted-foreground">
								Must be at least 8 characters
							</p>
						</div>

						<button
							type="submit"
							disabled={pending}
							className="w-full bg-maincolor hover:bg-maincolor-dark text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{pending ? "Creating account..." : "Sign Up"}
						</button>
					</form>

					<div className="mt-6 text-center">
						<p className="text-sm text-muted-foreground">
							Already have an account?{" "}
							<Link
								href="/login"
								className="text-maincolor hover:opacity-80 font-semibold hover:underline"
							>
								Sign in
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
