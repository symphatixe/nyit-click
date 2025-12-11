"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/database/supabase/server";

type ActionState = {
	error?: string;
};

export async function login(
	prevState: ActionState | null,
	formData: FormData,
): Promise<ActionState> {
	const supabase = await createClient();

	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		if (error.message.includes("Invalid login credentials")) {
			return { error: "invalid_credentials" };
		}
		return { error: error.message };
	}

	revalidatePath("/", "layout");
	redirect("/dashboard/profile");
}

export async function signup(
	prevState: ActionState | null,
	formData: FormData,
): Promise<ActionState> {
	const supabase = await createClient();

	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const firstName = formData.get("first_name") as string;
	const lastName = formData.get("last_name") as string;

	const { data: authResponse, error: authError } = await supabase.auth.signUp({
		email,
		password,
	});

	if (authError) {
		console.log(authError);
		if (authError.message.includes("already registered")) {
			return {
				error: "This email is already registered. Please log in instead.",
			};
		}
		return { error: authError.message };
	}

	if (authResponse.user) {
		const { error: userError } = await supabase.from("users").insert({
			id: authResponse.user.id,
			first_name: firstName,
			last_name: lastName,
			email: email,
			created_at: new Date().toISOString(),
		});

		if (userError) {
			console.log(userError);
			return { error: "Failed to create user profile" };
		}
	}

	revalidatePath("/", "layout");
	redirect("/dashboard/semester-map");
}

export async function logout() {
	const supabase = await createClient();
	await supabase.auth.signOut();
	redirect("/login");
}

export async function resetPassword(
	prevState: ActionState | null,
	formData: FormData,
): Promise<ActionState> {
	const supabase = await createClient();

	const email = formData.get("email") as string;

	if (!email) {
		return { error: "Email is required" };
	}

	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
	});

	if (error) {
		console.error("Password reset error:", error);
		return { error: error.message };
	}

	return { error: "success" };
}
