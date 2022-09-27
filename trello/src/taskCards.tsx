import {
    Box,
    Button,
    Heading,
    Image, Input, InputGroup, InputLeftAddon, List, ListItem,
    Modal,
    ModalBody, ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import {Task} from '../pages'
import {Checkbox, CheckboxGroup} from '@chakra-ui/react';
import {nanoid} from "nanoid";
import {useState} from "react";
import {DeleteIcon} from '@chakra-ui/icons';

export default function TaskCards({task, onDelete}: { task: Task, onDelete: () => void }) {
    const [currentTask, updateCurrentTask] = useState(task.toDoList);
    const {isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose} = useDisclosure();
    const [context, setContext] = useState('');
    return (
        <Box
            justifyContent="space-between"
            display={"flex"}
            bg="white"
            padding={16}
            borderRadius={4}
            shadow={"md"}
            margin={2}
            _hover={{shadow: '2xl'}}
            alignContent={"center"}
            alignItems={"center"}
            onClick={onDetailOpen}
        >
            <Heading fontSize={"2xl"}>
                {task.title}
            </Heading>
            <Text>
                {task.description}
            </Text>
            <Button onClick={() => onDelete()}><DeleteIcon/></Button>

            <Modal isOpen={isDetailOpen} onClose={onDetailClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader> {task.title}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Box display={"flex"} justifyItems={"center"} alignItems={"center"}>
                            <InputGroup bg={"white"} width={"80%"} margin={"2"}>
                                <InputLeftAddon width={"7rem"}> To Do </InputLeftAddon>
                                <Input placeholder='input context' onChange={(e) => setContext(e.currentTarget.value)}/>
                            </InputGroup>
                            <Button onClick={() => {
                                updateCurrentTask([...currentTask, {toDoId: nanoid(),status: false, context: context}]);
                            }
                            }>
                                Add
                            </Button>
                        </Box>
                        <List spacing={2}>
                            {currentTask.map((item) => (
                                <ListItem key={item.toDoId} alignItems={"center"} alignContent={"center"}
                                          justifyContent={"space-between"} display = {"flex"} margin={2}>
                                    <Checkbox
                                        isChecked={item.status}
                                        onChange={(e) => {
                                            const i = currentTask.findIndex((t) => t.toDoId === item.toDoId && t.context === item.context)
                                            updateCurrentTask([...currentTask.slice(0, i), {
                                                toDoId: item.toDoId,
                                                status: !item.status,
                                                context: item.context
                                            }, ...currentTask.slice(i + 1)])
                                        }
                                        }>
                                        {item.context}
                                    </Checkbox>
                                    <Button mr={3} borderWidth={1} bg={"white"} margin={"2"} onClick={() => {
                                        {
                                            const i = currentTask.findIndex((t) => t.toDoId === item.toDoId && t.context === item.context)
                                            updateCurrentTask([...currentTask.slice(0, i), ...currentTask.slice(i + 1)]);
                                        }
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


        </Box>
    )
}