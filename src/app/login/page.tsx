import Link from 'next/link'
import { login, signup } from './actions'

export default function LoginPage() {
    return (
        //password need to be aty least 6 characters
        // <form>
        //     <label htmlFor="email">Email:</label>
        //     <input id="email" name="email" type="email" required />
        //     <label htmlFor="password">Password:</label>
        //     <input id="password" name="password" type="password" required />
        //     <button formAction={login}>Log in</button>
        //     <button formAction={signup}>Sign up</button>
        // </form>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-700">Sign in to your account</h2>
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
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-700">Password</label>
                            <div className="text-sm">
                                <Link href="/auth/forget-pass" className="font-semibold text-indigo-400 hover:text-indigo-300">Forgot password?</Link>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input id="password" type="password" name="password" required autoComplete="current-password" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-indigo-800 outline-1 -outline-offset-1 outline-indigo-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" placeholder="Enter your password" />
                        </div>
                    </div>

                    <div>
                        <button formAction={login} className="flex w-full justify-center rounded-md bg-[var(--color-primary)] px-3 py-1.5 text-sm/6 font-semibold text-white cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign in</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Don&apos;t have an account? {' '}
                    <Link href="/auth/register" className="font-semibold text-indigo-400 hover:text-indigo-300">Register here.</Link>
                </p>
            </div>
        </div>
    )
}