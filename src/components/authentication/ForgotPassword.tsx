"use client";

import { useActionState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle, Mail } from "lucide-react";
import { resetPassword } from "@/app/(auth)/actions";

export default function ForgotPassword() {
	const [state, formAction, pending] = useActionState(resetPassword, null);

	return (
		<div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-50 to-gray-100 px-4">
			<div className="max-w-md w-full">
				<div className="text-center mb-8">
					<Link href="/" className="text-4xl font-bold text-maincolor">
						NYIT Click
					</Link>
					<p className="mt-2 text-muted-foreground">Reset your password</p>
				</div>

				<div className="bg-card rounded-lg shadow-lg p-8">
					<div className="text-center mb-6">
						<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<Mail className="w-8 h-8 text-maincolor" />
						</div>
						<h2 className="text-2xl font-bold text-card-foreground mb-2">
							Forgot Password?
						</h2>
						<p className="text-sm text-muted-foreground">
							Enter your email address and we&apos;ll send you a link to reset
							your password.
						</p>
					</div>

					{state?.error === "success" && (
						<div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
							<div className="flex items-start gap-3">
								<CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
								<div className="flex-1">
									<p className="text-sm text-green-800 font-medium mb-1">
										Check your email
									</p>
									<p className="text-xs text-green-700">
										We&apos;ve sent a password reset link to your email address.
									</p>
								</div>
							</div>
						</div>
					)}

					{state?.error && state.error !== "success" && (
						<div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
							<div className="flex items-start gap-3">
								<AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
								<p className="text-sm text-red-800 font-medium">
									{state.error}
								</p>
							</div>
						</div>
					)}

					<form action={formAction} className="space-y-4">
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-card-foreground mb-1"
							>
								Email Address
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

						<button
							type="submit"
							disabled={pending}
							className="w-full bg-maincolor hover:bg-maincolor-dark text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{pending ? "Sending..." : "Send Reset Link"}
						</button>
					</form>

					<div className="mt-6 text-center">
						<p className="text-sm text-muted-foreground">
							Remember your password?{" "}
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
