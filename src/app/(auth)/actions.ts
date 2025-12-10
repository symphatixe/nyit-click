"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/database/supabase/server";

export async function login(formData: FormData) {
	const supabase = await createClient();

	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		redirect("/error");
	}

	revalidatePath("/", "layout");
	redirect("/dashboard/profile");
}

export async function signup(formData: FormData) {
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
		redirect("/error");
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
			redirect("/error");
		}
	}

	revalidatePath("/", "layout");
	redirect("/dashboard/profile");
}

export async function logout() {
	const supabase = await createClient();
	await supabase.auth.signOut();
	redirect("/login");
}
