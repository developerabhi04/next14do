import { TodoItem } from '@/components/ServerComponents'
import { cookies } from 'next/headers';
import React from 'react'


const fetchTodo = async (token) => {
    try {
        const res = await fetch(`${process.env.URL}/api/mytask`, {
            cache: "no-cache",
            // credentials: "include"
            headers: {
                cookie: `token=${token}`,
            }
        });

        const data = await res.json();
        // console.log(data);

        if (!data.success) return [];

        return data.tasks;
    } catch (error) {
        return [];
    }
}

const todos = async () => {

    const token = cookies().get("token")?.value;
    // console.log(token);
    const tasks = await fetchTodo(token);

    return (
        <section className='todosContainer'>
            {tasks?.map((i) => (
                <TodoItem
                    title={i.title}
                    description={i.description}
                    id={i._id}
                    key={i._id}
                    completed={i.isCompleted}
                />
            ))}
        </section>
    )
}

export default todos