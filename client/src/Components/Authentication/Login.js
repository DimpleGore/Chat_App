import { Button, FormControl, FormLabel, Snackbar, IconButton, Input, InputAdornment, Stack } from "@mui/material"
import { useState } from "react"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import * as React from "react"
import { useNavigate } from "react-router-dom";
import { SnackbarContext } from "../../Context/snackbarProvider";


function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { snackbar, setSnackbar } = React.useContext(SnackbarContext)


  const handleClickShowPassword = () => setShowPassword((show) => !show);


  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      setSnackbar({ isOpen: true, message: "Please fill all fields" })

      setLoading(false);
      return;

    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      )
      setSnackbar({ status: "success", isOpen: true, message: "Login Successful" })
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      navigate("/chats")

    } catch (error) {
      setSnackbar({ isOpen: true, message: "Error Occured!" })
      setLoading(false);
    }
  }

  return (
    <Stack spacing="10px" color="black">
      <FormControl required >
        <FormLabel  >Email</FormLabel>
        <Input value={email} placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} />

      </FormControl>

      <FormControl required >
        <FormLabel  >Password</FormLabel>


        <Input
          id="outlined-adornment-password"
          value={password}
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter Password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}

                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />


      </FormControl>
      <LoadingButton loading={loading} onClick={submitHandler} variant="contained" sx={{ textTransform: "none" }}>Login</LoadingButton>
      {/*<Button onClick={() => {
        setEmail("guest@example.com");
        setPassword("12456")
      }} variant="contained" sx={{
        textTransform: "none", backgroundColor: 'red', '&:hover': {
          backgroundColor: 'red',
          opacity: [0.9, 0.8, 0.7],
        },
      }}>Get Guest User Credentials</Button>*/}


    </Stack>
  )
}

export default Login