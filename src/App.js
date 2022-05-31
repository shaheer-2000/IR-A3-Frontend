import logo from './logo.svg';
import './App.css';

import { Input, InputGroup, InputRightElement, Button, Stack } from '@chakra-ui/react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { Checkbox, Heading, Center } from '@chakra-ui/react'
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [value, setValue] = useState("");
  const [label, setLabel] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [tfidf, setTfidf] = useState(1);
  const [ttc, setTtc] = useState(1);
  const [lexchains, setLexchains] = useState(1);
  const [updatingModel, setUpdatingModel] = useState(false);

  const handleValueChange = (e) => setValue(e.target.value);
  const getLabel = async () => {
    const res = await axios.post("", {
      document: value
    });

    setLabel(res.data.label);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const updateModel = async () => {
    setUpdatingModel(true);
    await axios.post("/settings", {
      settings: `${tfidf}-${ttc}-${lexchains}`
    });

    setUpdatingModel(false);
  };

  return (
    <>
      <Center m={6}>
        <Stack spacing={10}>
          <Heading size="lg">fiddle around with different settings</Heading>
          <Stack spacing={5} direction="row">
            <Checkbox isChecked={tfidf} onChange={(e) => setTfidf(e.target.checked === true ? 1 : 0)} colorScheme="blue">TF-IDF</Checkbox>
            <Checkbox isChecked={ttc} onChange={(e) => setTtc(e.target.checked === true ? 1 : 0)} colorScheme="blue">Topic Term Co-Occurence</Checkbox>
            <Checkbox isChecked={lexchains} onChange={(e) => setLexchains(e.target.checked === true ? 1 : 0)} colorScheme="blue">Lexical Chains</Checkbox>
            <Button size='md' onClick={updateModel} isLoading={updatingModel}>
                Update Model
              </Button>
          </Stack>
          <InputGroup>
            <Input p={3} placeholder='I hate homework!' size='md' value={value} onChange={handleValueChange} />
            <InputRightElement width="fit-content" padding={2}>
              <Button h="1.75rem" onClick={getLabel} disabled={showAlert}>
                Classify
              </Button>
            </InputRightElement>
          </InputGroup>
          { showAlert ? (
            <Alert status="info" variant="left-accent" width="xl">
              <AlertIcon />
              <AlertTitle>Document classified!</AlertTitle>
              <AlertDescription>The document has been classified as a "{label}" document</AlertDescription>
            </Alert>
          ) : <></> }
        </Stack>
      </Center>
    </>
  );
}

export default App;
