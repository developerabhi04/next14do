import Link from 'next/link';
import React from 'react';
import { LogoutBtn } from "../components/Clients";


const header = () => {
    return (
        <div className="header">
            <div>
                <Link href={'/'}>TODO</Link>
            </div>

            <article>
                <Link href={"/"}>Home</Link>
                <Link href={"/profile"}>Profile</Link>

                <LogoutBtn />
            </article>
        </div>
    )
}

export default header