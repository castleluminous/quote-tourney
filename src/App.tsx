import { useState } from 'react'
import jsonQuotes from "./assets/jsonQuotes.json";
import './App.css'
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import QuoteTable from './QuoteTable';
import TheArena from './TheArena';

function App() {
const [value, setValue] = useState("1")
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  type Quote = {
      number: number;
      quote: string;
  };
  const quoteList: Quote[] = jsonQuotes as Quote[];

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <h1>stupid late night coding adventure</h1>
      <h3>todo: like a bunch</h3>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="The Arena" value="1" />
            <Tab label="All Quotes" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">{<TheArena rows={quoteList}/>}</TabPanel>
        <TabPanel value="2">{<QuoteTable rows={quoteList}/>}</TabPanel>
      </TabContext>
    </Box>
  );
}

export default App
