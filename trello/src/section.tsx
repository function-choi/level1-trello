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
import {useState, useContext, useEffect} from 'react';
import {nanoid} from "nanoid";
import TaskCards from "../src/taskCards";
import {AddIcon} from '@chakra-ui/icons';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {Task, TrelloContext} from "../pages/index"


export default function Section({title, sectionIndex}: { title: string, sectionIndex: number }) {
    const [initialized, setInitialized] = useState(false);
    const {addTask: handleAddTask, tasks: sections, deleteTask: handleDeleteTask} = useContext(TrelloContext);
    const tasks = sections[sectionIndex];
    const [taskTitle, setTitle] = useState('');
    const [taskDescription, setDescription] = useState('');
    const {isOpen: isToDoOpen, onOpen: onToDoOpen, onClose: onToDoClose} = useDisclosure();
    const [, setTasks] = useState<Task[]>(
        []
    );

    const addTask = () => {
        {
            handleAddTask?.(sectionIndex, {
                id: nanoid(),
                title: taskTitle,
                description: taskDescription,
                toDoList: []
            });
            setTitle("")
            setDescription("")
            onToDoClose();
        }
    }


    useEffect(() => {
        setInitialized(true);
    }, []);
    return (<>
            {initialized && (
                <Droppable droppableId={sectionIndex.toString()}>
                    {(dropProvided) => (
                        <Box width={"32%"}
                             margin={6}
                             borderWidth={1}
                             padding={2}
                             height={"max-content"}
                             bg={"#EBECF0"} borderRadius={"10"}
                             ref={dropProvided.innerRef}{...dropProvided.droppableProps}>
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
                                            <Button mr={3} borderWidth={1} bg={"white"} margin={"2"}
                                                    onClick={() => addTask()}>
                                                Add Task
                                            </Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                                {tasks.map((task: Task, idx: number) => (
                                    <Draggable draggableId={task.id} index={idx} key={task.id}>
                                        {(dragProvided) =>
                                            <TaskCards task={task}
                                                       key={task.id}
                                                       onDelete={
                                                           () => handleDeleteTask(sectionIndex, task)
                                                       }
                                                       dragProvided={dragProvided}/>
                                        }
                                    </Draggable>
                                ))}
                                {dropProvided.placeholder}
                            </Box>
                        </Box>
                    )}
                </Droppable>
            )}
        </>
    )
}







