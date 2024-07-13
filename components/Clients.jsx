"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";


export const Context = createContext({ user: {} });

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    // useEffect(() => {
    //     fetch("/api/auth/me")
    //         .then((res) => res.json())
    //         .then((data => {
    //             if (data.success) setUser(data.user)
    //         }))
    // }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/auth/me");
                const data = await res.json();
                if (data.success) setUser(data.user);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();

    }, []);

    return (
        <Context.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
            <Toaster />
        </Context.Provider>
    )

}




export const LogoutBtn = () => {
    const { user, setUser } = useContext(Context);


    const logoutHandler = async () => {
        try {
            const res = await fetch("/api/auth/logout");

            const data = await res.json();

            if (!data.success) return toast.error(data.message);

            setUser({});

            toast.success(data.message);

        } catch (error) {
            return toast.error(error)
        }
    }



    return (
        <>
            {user._id ? (
                <button className="btn" onClick={logoutHandler}>Logout</button>
            ) : (
                <Link href={"/login"}>Login</Link>
            )}

        </>

    )
};




export const TodoButton = ({ id, completed }) => {

    const router = useRouter();

    //delete
    const deleteHandler = async (id) => {
        try {
            const res = await fetch(`/api/task/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();
            if (!data.success) return toast.error(data.message)
            toast.success(data.message);
            router.refresh()
        } catch (error) {
            return toast.error(error)
        }
    }

    // update
    const updateHandler = async (id) => {
        try {
            const res = await fetch(`/api/task/${id}`, {
                method: "PUT",
            })

            const data = await res.json();

            if (!data.success) return toast.error(data.message)
            toast.success(data.message);
            router.refresh();
        } catch (error) {
            return toast.error(error)
        }
    }
    return (
        <>
            <input type="checkbox" checked={completed} onChange={() => updateHandler(id)} />
            <button
                className="btn"
                onClick={() => deleteHandler(id)}
            >
                Delete
            </button>
        </>
    )
}