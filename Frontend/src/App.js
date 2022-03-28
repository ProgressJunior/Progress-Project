// import { LocalizationProvider } from '@material-ui/pickers';
// import MomentUtils from 'moment';

// function App() {

//   function queryFunction(){
//   fetch('http://localhost:3030/updateTable/' + document.getElementById("queryInput").value)
//         .then(response => response.json())
//         .then(data => this.setState({ totalReactPackages: data.total }));
//   }

//   // var moment = require('moment');
//   // let temp = moment().format();
//   // console.log(temp);

//   return (
//     <div className="App">
//       <LocalizationProvider dateAdapter={MomentUtils}>
//         <p>Test</p>
//         <input id="queryInput"></input>
//         <button onClick={()=>{queryFunction()}} >test</button>
//       </LocalizationProvider>
//     </div>
//   );
// }

// export default App;


import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { TextField } from '@mui/material';
import React, { useState } from 'react';

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
        {/* display date */}
        <p>test: {}</p>
      </div>

    </LocalizationProvider>
  );
}

export default App;