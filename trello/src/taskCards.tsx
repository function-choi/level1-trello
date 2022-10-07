import {
    Box,
    Button,
    Heading,
    Input,
    InputGroup,
    InputLeftAddon,
    List,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    Editable,
    EditableInput,
    EditablePreview,
} from "@chakra-ui/react";
import {Task} from '../pages'
import {Checkbox} from '@chakra-ui/react';
import {nanoid} from "nanoid";
import {useState} from "react";
import {AddIcon, DeleteIcon, EditIcon} from '@chakra-ui/icons';
import {ToDo} from "../pages";


export default function TaskCards({
                                      task,
                                      onDelete,
                                      dragProvided
                                  }: { task: Task, onDelete: () => void, dragProvided: any }) {
    const [currentTask, updateCurrentTask] = useState(task.toDoList);
    const {isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose} = useDisclosure();
    const {isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose} = useDisclosure();
    const [context, setContext] = useState('');
    const [newTitle, setNewTitle] = useState(task.title);
    const [newDescription, setNewDescription] = useState(task.description);

    const changeToDoStatus = (item: ToDo) => {
        const i = currentTask.findIndex((t) => t.toDoId === item.toDoId && t.context === item.context)
        updateCurrentTask([...currentTask.slice(0, i), {
            toDoId: item.toDoId,
            status: !item.status,
            context: item.context
        }, ...currentTask.slice(i + 1)])
    }
    const addNewToDo = () => {
        updateCurrentTask([...currentTask, {
            toDoId: nanoid(),
            status: false,
            context: context
        }]);
        setContext("");
    }

    const deleteToDo = (item: ToDo) => {
        const i = currentTask.findIndex((t) => t.toDoId === item.toDoId && t.context === item.context)
        updateCurrentTask([...currentTask.slice(0, i), ...currentTask.slice(i + 1)]);
    }

    return (
        <Box
            justifyContent="space-between"
            display={"flex"}
            bg="white"
            padding={6}
            borderRadius={4}
            shadow={"md"}
            margin={2}
            _hover={{shadow: '2xl'}}
            alignContent={"center"}
            alignItems={"center"}
            //onClick={onDetailOpen}
            ref={dragProvided.innerRef}{...dragProvided.draggableProps}{...dragProvided.dragHandleProps}
        >
            <Heading fontSize={"2xl"}>
                {task.title}
            </Heading>
            <Text>
                {task.description}
            </Text>
            <Box display={"flex"} justifyContent={"space-between"} m={3}>
                <Button onClick={(e) => {
                    e.stopPropagation();
                    onEditOpen()
                    setNewTitle(task.title);
                    setNewDescription(task.description);
                }}>
                    <EditIcon/>
                </Button>
                <Box w={2}></Box>
                <Button onClick={() => onDelete()}><DeleteIcon/></Button>
            </Box>


            <Modal isOpen={isDetailOpen} onClose={onDetailClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader w={"50%"}>
                        <Editable defaultValue={task.title = newTitle}>
                            <EditablePreview/>
                            <EditableInput onChange={(e) => setNewTitle(e.currentTarget.value)}/>
                        </Editable></ModalHeader>

                    <ModalCloseButton/>
                    <ModalBody>
                        <Box display={"flex"} justifyItems={"center"} alignItems={"center"}>
                            <InputGroup bg={"white"} width={"80%"} margin={"2"}>
                                <InputLeftAddon width={"7rem"}> To Do </InputLeftAddon>
                                <Input placeholder='enter context' value={context}
                                       onChange={(e) => setContext(e.currentTarget.value)}/>
                            </InputGroup>
                            <Button onClick={addNewToDo}>
                                <AddIcon/>
                            </Button>
                        </Box>
                        <List spacing={2}>
                            {currentTask.map((item) => (
                                <ListItem key={item.toDoId} alignItems={"center"} alignContent={"center"}
                                          justifyContent={"space-between"} display={"flex"} margin={2}>
                                    <Checkbox
                                        isChecked={item.status}
                                        onChange={(e) => {
                                            changeToDoStatus(item)
                                        }
                                        }>
                                        {item.context}
                                    </Checkbox>
                                    <Button mr={3} borderWidth={1} bg={"white"} margin={"2"} onClick={() => {
                                        deleteToDo(item)
                                    }}>
                                        <DeleteIcon/>
                                    </Button>
                                </ListItem>
                            ))}
                        </List>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isEditOpen} onClose={onEditClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>{task.title}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <InputGroup bg={"white"} width={"80%"} margin={"2"}>
                            <InputLeftAddon width={"7rem"}> title </InputLeftAddon>
                            <Input placeholder='input title' onChange={(e) => setNewTitle(e.currentTarget.value)}/>
                        </InputGroup>
                        <InputGroup bg={"white"} width={"80%"} margin={"2"}>
                            <InputLeftAddon width={"7rem"}> description </InputLeftAddon>
                            <Input placeholder='input description'
                                   onChange={(e) => setNewDescription(e.currentTarget.value)}/>
                        </InputGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} borderWidth={1} bg={"white"} margin={"2"} onClick={() => {
                            task.title = newTitle;
                            task.description = newDescription;
                            onEditClose();
                        }}>
                            Edit Task
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}