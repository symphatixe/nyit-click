'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from 'src/utils/supabase/server'


export async function login(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        redirect('/error');
    }

    revalidatePath('/', 'layout');
    redirect('/dashboard');
}

export async function signup(formData: FormData) {
    const supabase = await createClient();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const firstName = formData.get('first_name') as string;
    const lastName = formData.get('last_name') as string;

    const { data: authResponse, error: authError } = await supabase.auth.signUp({
        email,
        password,
    })

    if (authError) {
        redirect('/error');
    }

    if (authResponse.user) {
        const { error: userError } = await supabase
            .from('users')
            .insert({
                id: authResponse.user.id,
                first_name: firstName,
                last_name: lastName,
                email: email,
                created_at: new Date().toISOString(),
            })

        if (userError) {
            redirect('/error');
        }
    }

    revalidatePath('/', 'layout');
    redirect('/dashboard');
}

export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/login');
}