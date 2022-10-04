import {
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftAddon,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Modal
} from '@chakra-ui/react'
import {useState, useContext} from 'react';
import {nanoid} from "nanoid";
import TaskCards from "../src/taskCards";
import {AddIcon} from '@chakra-ui/icons';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Task, TrelloContext } from "../pages/index"


export default function Section({title, index}: { title: string, index:number}) {
    const { addTask: handleAddTask, tasks: sections, deleteTask : handleDeleteTask } = useContext(TrelloContext);
    const tasks = sections[index];
    const [taskTitle, setTitle] = useState('');
    const [taskDescription, setDescription] = useState('');
    const {isOpen: isToDoOpen, onOpen: onToDoOpen, onClose: onToDoClose} = useDisclosure();
    const [, setTasks] = useState<Task[]>(
        [
            {
                id: nanoid(),
                title: "title 1",
                description: "description 1",
                toDoList: []
            },
            {
                id: nanoid(),
                title: "title 2",
                description: "description 2",
                toDoList: [{toDoId: nanoid(), status: false, context: "1"}, {
                    toDoId: nanoid(),
                    status: true,
                    context: "2"
                }]
            },
            {
                id: nanoid(),
                title: "title 3",
                description: "description 3",
                toDoList: [{toDoId: nanoid(), status: true, context: "1"}, {
                    toDoId: nanoid(),
                    status: false,
                    context: "2"
                }]
            }
        ]
    );

    const addTask = () => {
            {
                handleAddTask?.(index, {
                    id: nanoid(),
                    title: taskTitle,
                    description : taskDescription,
                    toDoList: []
                });
                setTitle("")
                setDescription("")
                onToDoClose();
            }
    }
    return(
    <Box width={"32%"}
         margin={6}
         borderWidth={1}
         padding={2}
         height={"max-content"}
         bg={"#EBECF0"} borderRadius={"10"}>
        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
            <Box
                textAlign={"left"}
                fontSize={"2xl"}
                fontWeight={"bold"}
                m={3}
            >
                {title}
            </Box>
            <Button m={2} bg={"white"} onClick={onToDoOpen}><AddIcon/> </Button>
        </Box>
        <Box display={"flex"} flexDirection={"column"}>
            <Modal isOpen={isToDoOpen} onClose={onToDoClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Add Task : {title} </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Box>
                            <InputGroup bg={"white"} width={"80%"} margin={"2"}>
                                <InputLeftAddon width={"7rem"}> title </InputLeftAddon>
                                <Input placeholder='input title'
                                       onChange={(e) => setTitle(e.currentTarget.value)}/>
                            </InputGroup>
                            <InputGroup bg={"white"} width={"80%"} margin={"2"}>
                                <InputLeftAddon width={"7rem"}> description </InputLeftAddon>
                                <Input placeholder='input description'
                                       onChange={(e) => setDescription(e.currentTarget.value)}/>
                            </InputGroup>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} borderWidth={1} bg={"white"} margin={"2"} onClick={() => addTask()}>
                            Add Task
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {tasks.map((task: Task) => (
                    <TaskCards task={task} key={task.id} onDelete={
                        () => handleDeleteTask(index,task)
                    }/>
            ))}
        </Box>
    </Box>)
}