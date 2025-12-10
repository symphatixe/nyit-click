import Link from "next/link";
import { signup } from "@/app/(auth)/actions";

export default function RegisterPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-50 to-gray-100 px-4">
			<div className="max-w-md w-full">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-blue-900">NYIT Click</h1>
					<p className="mt-2 text-gray-600">Create your account</p>
				</div>

				<div className="bg-white rounded-lg shadow-lg p-8">
					<h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
						Sign Up
					</h2>
					<form action={signup} className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="first_name"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									First Name
								</label>
								<input
									id="first_name"
									type="text"
									name="first_name"
									placeholder="John"
									required
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
								/>
							</div>

							<div>
								<label
									htmlFor="last_name"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Last Name
								</label>
								<input
									id="last_name"
									type="text"
									name="last_name"
									placeholder="Doe"
									required
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Email
							</label>
							<input
								id="email"
								type="email"
								name="email"
								placeholder="you@nyit.edu"
								required
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
							/>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 mb-1"
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
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
							/>
							<p className="mt-1 text-xs text-gray-500">
								Must be at least 8 characters
							</p>
						</div>

						<button
							type="submit"
							className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
						>
							Sign Up
						</button>
					</form>

					<div className="mt-6 text-center">
						<p className="text-sm text-gray-600">
							Already have an account?{" "}
							<Link
								href="/login"
								className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
							>
								Sign in
							</Link>
						</p>
					</div>
				</div>

				{/* <p className="mt-8 text-center text-sm text-gray-500">
					By signing up, you agree to our{" "}
					<Link href="/terms" className="text-blue-600 hover:underline">
						Terms of Service
					</Link>{" "}
					and{" "}
					<Link href="/privacy" className="text-blue-600 hover:underline">
						Privacy Policy
					</Link>
				</p> */}
			</div>
		</div>
	);
}
