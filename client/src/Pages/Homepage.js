import { useEffect, useState } from 'react'
import axios from 'axios';
import { Container, Box, Typography, Tabs, Tab} from '@mui/material'
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import * as React from 'react'
import { borderRadius } from '@mui/system';
import Login from '../Components/Authentication/Login';
import Signup from '../Components/Authentication/Signup';






function Homepage() {

  

  const [data, setData] = useState("");
  //const classes = useStyles();
  const [value, setValue] = React.useState('1');

  const fetchData = async () => {
    const res = await axios.get("/hello");
    console.log(res)
    setData(res.data);
  }

  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchData();
  }, [])
  return (
    <Container maxWidth='xs' >
      <Box
        sx={{
          display: 'flex',
          bgcolor: 'background.paper',
          justifyContent: 'center',
          width: '100%',
          p: 2,
          my: 8,
          borderRadius: 2,
          borderWidth: 1

        }}
      >
        <Typography variant="h4" fontFamily="work sans">Talk-A-Tive</Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        bgcolor: 'background.paper',
        justifyContent: 'center',
        width: "100%",
        p: 2,
        mt: -7,
        borderRadius: 2,
        borderWidth: 1
      }}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box aria-label="lab API tabs example">
              <Tabs value={value} 
              onChange={handleChange}
              indicatorColor=''
               sx={{
                "& button": { borderRadius: 2 },
                //"& button:hover": { backgroundColor: "blue" },
                "& button:focus": { backgroundColor: "#1976d2" ,color:'white'},
                //"& button:active": { backgroundColor: "green" }
                "& .MuiTabs-indicator":{display: "none"}
              
              }}
            >
                <Tab style={{ width: '50%',}} label="Login"  value="1" />
                <Tab style={{ width: '50%'}} label="Sign Up"  value="2" />
              </Tabs>
            </Box>
            <TabPanel value="1">{<Login />}</TabPanel>
            <TabPanel value="2">{<Signup />}</TabPanel>
          </TabContext>
        </Box>



      </Box>
    </Container>
  )
}

export default Homepage;