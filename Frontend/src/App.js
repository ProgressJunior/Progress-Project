
function App() {

  function queryFunction(){
  fetch('http://localhost:3030/updateTable/' + document.getElementById("queryInput").value)
        .then(response => response.json())
        .then(data => this.setState({ totalReactPackages: data.total }));
  }
  return (
    <div className="App">
      <p>Test</p>
      <input id="queryInput"></input>
      <button onClick={()=>{queryFunction()}} >test</button>
    </div>
  );
}

export default App;
