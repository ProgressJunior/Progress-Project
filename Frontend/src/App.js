import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import Path from './Path';

function App() {
  const [date, setDate] = useState(Date.now);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div>
        <DatePicker
          label="Basic example"
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <Path />
        
      </div>

    </LocalizationProvider>
  );
}

export default App;