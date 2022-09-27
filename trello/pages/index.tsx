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
import type { NextPage } from 'next'
import { useState } from 'react';
import {nanoid} from "nanoid";
import TaskCards from "../src/taskCards";
import {AddIcon, DeleteIcon} from '@chakra-ui/icons';

export type Task = {
  id:string;
  title : string;
  description : string;
  status : string;
  toDoList : ToDo[];
}

export type ToDo = {
    toDoId:string;
    status:boolean;
    context:string;
}


const Home: NextPage = () => {
  const [data, setData] = useState(
    [
        {  id:nanoid(),
            title : "title",
            description : "description",
            status :"To Do",
            toDoList:[]
            },
        {  id:nanoid(),
            title : "title",
            description : "description",
            status :"Doing",
            toDoList : [{toDoId: nanoid(), status: false, context: "1"},{toDoId: nanoid(), status: true, context: "2"}]},
        {  id:nanoid(),
            title : "title",
            description : "description",
            status :"Done",
            toDoList : [{toDoId: nanoid(), status: true, context: "1"},{toDoId: nanoid(), status: false, context: "2"}]}
    ]
  );

const [taskTitle, setTitle] = useState('');
const [taskDescription, setDescription] = useState('');
const {isOpen : isToDoOpen, onOpen : onToDoOpen, onClose : onToDoClose} = useDisclosure();
const {isOpen : isDoingOpen, onOpen : onDoingOpen, onClose : onDoingClose} = useDisclosure();
const {isOpen : isDoneOpen, onOpen : onDoneOpen, onClose : onDoneClose} = useDisclosure();
    return (
      <Box display={"flex"} justifyContent={"space-between"} bgGradient='linear(to-r, #8687F3, #FEA5D1)' width={"100%"} height="100vh">
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
                    To Do
                  </Box>
                  <Button m={2} bg={"white"} onClick={onToDoOpen }><AddIcon/> </Button>
              </Box>
              <Box display={"flex"} flexDirection={"column"} >
                  <Modal isOpen={isToDoOpen} onClose={onToDoClose} >
                      <ModalOverlay />
                      <ModalContent>
                          <ModalHeader>Add Task : To Do </ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                              <Box>
                                  <InputGroup bg={"white"} width={"80%"} margin={"2"}>
                                      <InputLeftAddon  width={"7rem"} > title </InputLeftAddon>
                                      <Input placeholder='input title' onChange={(e) => setTitle(e.currentTarget.value)} />
                                  </InputGroup>
                                  <InputGroup bg={"white"} width={"80%"} margin={"2"}>
                                      <InputLeftAddon  width={"7rem"} > description </InputLeftAddon>
                                      <Input placeholder='input description' onChange={(e) => setDescription(e.currentTarget.value)} />
                                  </InputGroup>
                              </Box>
                          </ModalBody>
                          <ModalFooter>
                              <Button mr={3} borderWidth={1} bg={"white"} margin={"2"} onClick={()=> {{
                                  setData([...data,{id:nanoid(),title:taskTitle, description:taskDescription, status:"To Do", toDoList: [{toDoId: nanoid(), status:true,context:'dd'}]}]);
                                  onToDoClose();
                                  }
                              }}>
                                  Add Task
                              </Button>
                          </ModalFooter>
                      </ModalContent>
                  </Modal>
                  {data.map((task:Task) => (
                      task.status === "To Do" ?
                      <TaskCards task={task} key={task.id} onDelete={
                          ()=> {
                              const i = data.findIndex((t)=>t===task)
                              setData([...data.slice(0,i),...data.slice(i+1)]);
                          }
                      }/>
                          : <></>
                  ))}
              </Box>
          </Box>
          <Box width={"32%"}
               marginTop={6}
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
                      Doing
                  </Box>
                  <Button m={2} bg={"white"} onClick={onDoingOpen}><AddIcon/> </Button>
              </Box>
              <Box display={"flex"} flexDirection={"column"} >
                  <Modal isOpen={isDoingOpen} onClose={onDoingClose} >
                      <ModalOverlay />
                      <ModalContent>
                          <ModalHeader>Add Task : Doing</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                              <InputGroup bg={"white"} width={"80%"} margin={"2"}>
                                  <InputLeftAddon  width={"7rem"} > title </InputLeftAddon>
                                  <Input placeholder='input title' onChange={(e) => setTitle(e.currentTarget.value)} />
                              </InputGroup>
                              <InputGroup bg={"white"} width={"80%"} margin={"2"}>
                                  <InputLeftAddon  width={"7rem"} > description </InputLeftAddon>
                                  <Input placeholder='input description' onChange={(e) => setDescription(e.currentTarget.value)} />
                              </InputGroup>
                          </ModalBody>
                          <ModalFooter>
                              <Button mr={3} borderWidth={1} bg={"white"} margin={"2"} onClick={()=> {{
                                  setData([...data,{id:nanoid(),title:taskTitle, description:taskDescription, status:"Doing", toDoList: []}]);
                                  onDoingClose();
                              }
                              }}>
                                  Add Task
                              </Button>
                          </ModalFooter>
                      </ModalContent>
                  </Modal>
                  {data.map((task:Task) => (
                      task.status === "Doing" ?
                          <TaskCards task={task} key={task.id} onDelete={
                              ()=> {
                                  const i = data.findIndex((t)=>t===task)
                                  setData([...data.slice(0,i),...data.slice(i+1)]);
                              }
                          }/>
                          : <></>
                  ))}
              </Box>
          </Box>
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
                      Done
                  </Box>
                  <Button m={2} bg={"white"} onClick={onDoneOpen }><AddIcon/> </Button>
              </Box>
              <Box display={"flex"} flexDirection={"column"} >
                  <Modal isOpen={isDoneOpen} onClose={onDoneClose} >
                      <ModalOverlay />
                      <ModalContent>
                          <ModalHeader>Add Task : Done</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                              <InputGroup bg={"white"} width={"80%"} margin={"2"}>
                                  <InputLeftAddon  width={"7rem"} > title </InputLeftAddon>
                                  <Input placeholder='input title' onChange={(e) => setTitle(e.currentTarget.value)} />
                              </InputGroup>
                              <InputGroup bg={"white"} width={"80%"} margin={"2"}>
                                  <InputLeftAddon  width={"7rem"} > description </InputLeftAddon>
                                  <Input placeholder='input description' onChange={(e) => setDescription(e.currentTarget.value)} />
                              </InputGroup>
                          </ModalBody>
                          <ModalFooter>
                              <Button mr={3} borderWidth={1} bg={"white"} margin={"2"} onClick={()=> {
                                  setData([...data,{id:nanoid(),title:taskTitle, description:taskDescription, status:"Done", toDoList: []}]);
                                  onDoneClose();
                              }}>
                                  Add Task
                              </Button>
                          </ModalFooter>
                      </ModalContent>
                  </Modal>
                  {data.map((task:Task) => (
                      task.status === "Done" ?
                          <TaskCards task={task} key={task.id} onDelete={
                              ()=> {
                                  const i = data.findIndex((t)=>t===task)
                                  setData([...data.slice(0,i),...data.slice(i+1)]);
                              }
                          } />
                          : <></>
                  ))}
              </Box>
          </Box>
      </Box>
      )
}

export default Home
