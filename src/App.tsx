import React from "react";
import { ChakraProvider, Flex } from "@chakra-ui/react";

import ToDoPage from "./ToDoPage";

import "./App.css";

function App() {
  return (
    <main className="App">
      <ChakraProvider>
        <Flex h="100vh" w="100vw">
          <ToDoPage />
        </Flex>
      </ChakraProvider>
    </main>
  );
}

export default App;
