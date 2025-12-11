"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle, Lock } from "lucide-react";
import { createClient } from "@/lib/utils/database/supabase/client";

export default function ResetPassword() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		const formData = new FormData(e.currentTarget);
		const password = formData.get("password") as string;
		const confirmPassword = formData.get("confirm_password") as string;

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			setLoading(false);
			return;
		}

		if (password.length < 8) {
			setError("Password must be at least 8 characters");
			setLoading(false);
			return;
		}

		try {
			const supabase = createClient();
			const { error } = await supabase.auth.updateUser({
				password: password,
			});

			if (error) throw error;

			setSuccess(true);
			setTimeout(() => {
				router.push("/login");
			}, 2000);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to reset password");
		}
	};

	let buttonLabel = "Reset Password";

	if (loading) {
		buttonLabel = "Resetting...";
	} else if (success) {
		buttonLabel = "Success!";
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-50 to-gray-100 px-4">
			<div className="max-w-md w-full">
				<div className="text-center mb-8">
					<Link href="/" className="text-4xl font-bold text-maincolor">
						NYIT Click
					</Link>
					<p className="mt-2 text-muted-foreground">Set new password</p>
				</div>

				<div className="bg-card rounded-lg shadow-lg p-8">
					<div className="text-center mb-6">
						<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<Lock className="w-8 h-8 text-maincolor" />
						</div>
						<h2 className="text-2xl font-bold text-card-foreground mb-2">
							Reset Password
						</h2>
						<p className="text-sm text-muted-foreground">
							Enter your new password below
						</p>
					</div>

					{success && (
						<div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
							<div className="flex items-start gap-3">
								<CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
								<div className="flex-1">
									<p className="text-sm text-green-800 font-medium mb-1">
										Password reset successful!
									</p>
									<p className="text-xs text-green-700">
										Redirecting to login...
									</p>
								</div>
							</div>
						</div>
					)}

					{error && (
						<div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
							<div className="flex items-start gap-3">
								<AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
								<p className="text-sm text-red-800 font-medium">{error}</p>
							</div>
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-card-foreground mb-1"
							>
								New Password
							</label>
							<input
								id="password"
								type="password"
								name="password"
								placeholder="••••••••"
								required
								minLength={8}
								disabled={loading || success}
								className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-maincolor focus:border-maincolor transition-colors disabled:opacity-50"
							/>
						</div>

						<div>
							<label
								htmlFor="confirm_password"
								className="block text-sm font-medium text-card-foreground mb-1"
							>
								Confirm New Password
							</label>
							<input
								id="confirm_password"
								type="password"
								name="confirm_password"
								placeholder="••••••••"
								required
								minLength={8}
								disabled={loading || success}
								className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-maincolor focus:border-maincolor transition-colors disabled:opacity-50"
							/>
							<p className="mt-1 text-xs text-muted-foreground">
								Must be at least 8 characters
							</p>
						</div>

						<button
							type="submit"
							disabled={loading || success}
							className="w-full bg-maincolor hover:bg-maincolor-dark text-white font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{buttonLabel}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
