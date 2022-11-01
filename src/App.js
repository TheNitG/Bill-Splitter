// npm install @mui/material @emotion/react @emotion/styled
import './App.css';
import {Box, Button, TextField} from "@mui/material";
import {useState} from "react";

function App() {

  const [accounts, setAccounts] = useState([]);

  const [accountCosts, setAccountCosts] = useState([])


  // const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0)

  const setAccountCost = (index, value) => {
    let newAccountCosts = [...accountCosts]
    newAccountCosts[index] = value
    setAccountCosts(newAccountCosts)
  }

  const addAccount = () => {
    setAccounts([...accounts, 0])
    setAccountCosts([...accountCosts, 0])
  }

  const removeAccount = (account) => {
    setAccounts(accounts.filter((keyVal, index) => (index !== account)))
    setAccountCosts(accountCosts.filter((keyVal, index) => (index !== account)))
  }

  const getSubtotal = () => {
    if (accountCosts.length !== 0) {
      return accountCosts.reduce((sum, value) => {
        return sum + value
      }, 0)
    }
    else {
      return 0
    }
  }

  const getOwed = (account) => {
    const subtotal = getSubtotal()
    if (subtotal === 0) {
      return 0
    }
    return total / subtotal * accountCosts[account]
  }

  const show_people = () => {
    if (accounts.length > 0) {
      return accounts.map((keyVal, index) => (
        <Box>
          <TextField label="Name" type="text" sx={{ color: 'white', width: "30%"}}></TextField>
          <TextField label="Item Costs" type="number" value={accountCosts[index]} onChange={e => setAccountCost(index, Number(e.target.value))} sx={{ color: 'white', width: "20%"}}></TextField>
          <TextField label="Amount Owed" disabled={true} type="number" value={getOwed(index)} /*value={} onChange={}*/ sx={{ color: 'white', width: "20%"}}></TextField>
          <Button variant="text" onClick={() => removeAccount(index)} sx={{ bgcolor: 'blue', color: 'white', height: '100%', width: "10%"}}>Remove Person</Button>
        </Box>
      ))
    }
    else {
      return <h3>Currently No People, Please Add</h3>
    }
  }

  return (
    <div className="App">
      <Box className="App-header">
        <h2>People:</h2>
        {show_people()}
        <Box>
          {/*<TextField required label={maybeFirstKey()} value={delYear} onChange={e => setDelYear(e.target.value)} type="value" sx={{width: '40%', marginLeft: "40%"}}></TextField>*/}
          <Button variant="text" onClick={addAccount} sx={{ bgcolor: 'blue', color: 'white', height: '100%', width: "100%" }}>Add Person</Button>
        </Box>
        <br/>
        <TextField required label="Subtotal" disabled={true} value={getSubtotal()} type="number" sx={{ width: '10%' }}></TextField>
        <br/>
        <TextField required label="Total" value={total} onChange={e => setTotal(Number(e.target.value))} type="number" sx={{ width: '10%' }}></TextField>
      </Box>
    </div>
  );
}

export default App;
