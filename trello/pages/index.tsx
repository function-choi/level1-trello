import {Box} from '@chakra-ui/react'
import type {NextPage} from 'next'
import Section from "../src/section"
import {NextSeo} from 'next-seo';
import React, {useState} from 'react'
import {DragDropContext} from "react-beautiful-dnd";

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

    interface SectionIndex {
        section: string;
        sectionIndex: number;
    }

    const trello: SectionIndex[] = [{section: "To Do", sectionIndex: 0}, {section: "Doing", sectionIndex: 1}, {
        section: "Done",
        sectionIndex: 2
    }]

    const updateTaskOrdering = (result: any) => {

        const {destination, source, draggableId} = result;
        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
        const sourceTasks: Task[] = tasks[+source.droppableId]
        const sourceTask : Task = sourceTasks.find(
            (target) => target.id === draggableId
        ) as Task
        const sourceUpdatedTasks: Task[] = tasks[+source.droppableId]
        const destinationUpdatedTasks: Task[] = tasks[+destination.droppableId]
        sourceUpdatedTasks.splice(source.index, 1);
        destinationUpdatedTasks.splice(destination.index, 0, sourceTask);
        setTasks([...tasks.slice(0,+source.droppableId),sourceUpdatedTasks,...tasks.slice(+source.droppableId+1)]);
        setTasks([...tasks.slice(0,+destination.droppableId),destinationUpdatedTasks,...tasks.slice(+destination.droppableId+1)]);
    };

    return (
        <TrelloContext.Provider value={{tasks, addTask, deleteTask}}>
            <NextSeo
                title="woohyeok.trello.lv1"
                openGraph={{
                    title: "woohyeok.trello.lv1",
                    description: "3주차",
                    images: [
                        {url: "https://static.wikia.nocookie.net/wii/images/8/89/Pikachu.jpg/revision/latest?cb=20140209205851"}
                    ]
                }
                }/>
            <DragDropContext onDragEnd={updateTaskOrdering}>
                <Box display={"flex"}
                     justifyContent={"space-between"}
                     bgGradient='linear(to-r, #8687F3, #FEA5D1)'
                     width={"100%"}
                     height="100vh">
                    <Section title={trello[0].section} sectionIndex={trello[0].sectionIndex}/>
                    <Section title={trello[1].section} sectionIndex={trello[1].sectionIndex}/>
                    <Section title={trello[2].section} sectionIndex={trello[2].sectionIndex}/>
                </Box>
            </DragDropContext>
        </TrelloContext.Provider>
    )
}

export default Home
