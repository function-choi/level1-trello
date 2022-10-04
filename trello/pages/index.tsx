import {Box} from '@chakra-ui/react'
import type {NextPage} from 'next'
import Section from "../src/section"
import { NextSeo } from 'next-seo';
import React, { useState } from 'react'

export type Task = {
    id: string;
    title: string;
    description: string;
    toDoList: ToDo[];
}

export type Tasks = {
    tasks: Task[][];
    addTask(sectionIndex: number, newTask: Task): void,
    deleteTask(sectionIndex: number, newTask: Task): void,
}

export const TrelloContext = React.createContext<Tasks>({
    tasks: [],
} as any);

export type ToDo = {
    toDoId: string;
    status: boolean;
    context: string;
}


const Home: NextPage = () => {
    const [tasks, setTasks] = useState<Task[][]>([
        [],
        [],
        [],
    ]);
    const addTask = (sectionIndex: number, newTask: Task) => {
        setTasks(prev => {
            return [
                ...prev.slice(0, sectionIndex),
                [newTask, ...prev[sectionIndex]],
                ...prev.slice(sectionIndex + 1),
            ]
        });
    }
    const deleteTask = (sectionIndex: number, task: Task) => {
        setTasks(prev => {
            const idx = prev[sectionIndex].findIndex(t => t.id === task.id);
            return [
                ...prev.slice(0, sectionIndex),
                [
                    ...prev[sectionIndex].slice(0, idx),
                    ...prev[sectionIndex].slice(idx + 1),
                ],
                ...prev.slice(sectionIndex + 1),
            ]
        });
    }
    return (
        <TrelloContext.Provider value={{ tasks, addTask, deleteTask}}>
            <NextSeo
                title= "woohyeok.trello.lv1"
                openGraph={{
                    title: "woohyeok.trello.lv1",
                    description:"3주차",
                    images: [
                        {url:"https://static.wikia.nocookie.net/wii/images/8/89/Pikachu.jpg/revision/latest?cb=20140209205851"}
                    ]}
                }/>
            <Box display={"flex"}
                 justifyContent={"space-between"}
                 bgGradient='linear(to-r, #8687F3, #FEA5D1)'
                 width={"100%"}
                 height="100vh">
                <Section title={"To Do"} index={0}/>
                <Section title={"Doing"} index={1}/>
                <Section title={"Done"} index={2}/>
            </Box>
        </TrelloContext.Provider>
    )
}

export default Home
