"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { login } from "@/app/(auth)/actions";

export default function Login() {
	const router = useRouter();
	const [state, formAction, pending] = useActionState(login, null);

	return (
		<div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-50 to-gray-100 px-4">
			<div className="max-w-md w-full">
				<div className="text-center mb-8">
					<Link href="/" className="text-4xl font-bold text-maincolor">
						NYIT Click
					</Link>
					<p className="mt-2 text-muted-foreground">Welcome back!</p>
				</div>

				<div className="bg-card rounded-lg shadow-lg p-8">
					<h2 className="text-2xl font-bold text-center text-card-foreground mb-6">
						Sign In
					</h2>

					{state?.error && (
						<div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
							<div className="flex items-start gap-3">
								<AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
								<div className="flex-1">
									<p className="text-sm text-red-800 font-medium mb-1">
										{state.error === "invalid_credentials"
											? "Invalid email or password"
											: state.error}
									</p>
									{state.error === "invalid_credentials" && (
										<p className="text-xs text-red-700 mt-2">
											Don&apos;t have an account?{" "}
											<button
												type="button"
												onClick={() => router.push("/register")}
												className="font-semibold underline hover:text-red-900"
											>
												Create one here
											</button>
										</p>
									)}
								</div>
							</div>
						</div>
					)}

					<form action={formAction} className="space-y-4">
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
								disabled={pending}
								className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-maincolor focus:border-maincolor transition-colors disabled:opacity-50"
							/>
						</div>

						<div className="flex items-center justify-end">
							<Link
								href="/forgot-password"
								className="text-sm text-maincolor hover:opacity-80 hover:underline"
							>
								Forgot password?
							</Link>
						</div>

						<button
							type="submit"
							disabled={pending}
							className="w-full bg-maincolor hover:bg-maincolor-dark text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{pending ? "Signing in..." : "Sign In"}
						</button>
					</form>

					<div className="mt-6 text-center">
						<p className="text-sm text-muted-foreground">
							Don&apos;t have an account?{" "}
							<Link
								href="/register"
								className="text-maincolor hover:opacity-80 font-semibold hover:underline"
							>
								Sign up
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
