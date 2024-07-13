/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Context } from '@/components/Clients';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';



const Page = () => {
    const [email, setEmail] = useState("");
    const [password, setPasword] = useState("");

    // 
    const { user, setUser } = useContext(Context)

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            // console.log(data);

            if (!data.success) return toast.error(data.message)
            setUser(data.user);
            toast.success(data.message)

        } catch (error) {
            return toast.error(error);
        }
    }

    if (user._id) return redirect("/")

    return (
        <div className='login'>
            <section>
                <form onSubmit={loginHandler}>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type='email'
                        placeholder='Enter Email'
                    />
                    <input
                        onChange={(e) => setPasword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder='Enter Password'
                    />

                    <button type='submit'>LogIn</button>
                    <p>OR</p>
                    <Link href={"/register"}>New User</Link>
                </form>
            </section>
        </div>
    )
}

export default Page

// export const metadata = {
//     title: 'Login',
//     description: 'This is Login Page',
// }