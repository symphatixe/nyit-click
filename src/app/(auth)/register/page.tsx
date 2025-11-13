import React from "react";
import Link from "next/link";
import { signup } from "../actions";

export default function Register() {
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-700">Create your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" method="POST" className="space-y-6">

                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-700">Email address</label>
                        <div className="mt-2">
                            <input id="email" type="email" name="email" required autoComplete="email" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-indigo-800 outline-1 -outline-offset-1 outline-indigo-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" placeholder="Enter your email" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-sm/6 font-medium text-gray-700">Name</label>
                        <div className="mt-2">
                            <input id="first_name" type="text" name="first_name" required autoComplete="first_name" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-indigo-800 outline-1 -outline-offset-1 outline-indigo-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" placeholder="Enter your first name" />
                        </div>
                        <div className="mt-2">
                            <input id="last_name" type="text" name="last_name" required autoComplete="last_name" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-indigo-800 outline-1 -outline-offset-1 outline-indigo-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" placeholder="Enter your last name" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-700">Password</label>
                        <div className="mt-2">
                            <input id="password" type="password" name="password" required autoComplete="new-password" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-indigo-800 outline-1 -outline-offset-1 outline-indigo-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" placeholder="Enter your password" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirm-password" className="block text-sm/6 font-medium text-gray-700">Confirm Password</label>
                        <div className="mt-2">
                            <input id="confirm-password" type="password" name="confirm-password" required autoComplete="new-password" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-indigo-800 outline-1 -outline-offset-1 outline-indigo-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" placeholder="Confirm your password" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" formAction={signup} className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Register</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Already have an account? {' '}
                    <Link href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">Sign in here.</Link>
                </p>
            </div>
        </div>
    );
}