import { FormControl, FormLabel, IconButton, Input, InputAdornment, Snackbar, Stack } from "@mui/material"
import { useState } from "react"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import * as React from "react"
import { LoadingButton } from '@mui/lab';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SnackbarContext } from "../../Context/snackbarProvider";


function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassord] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const { snackbar, setSnackbar } = React.useContext(SnackbarContext)
  const navigate = useNavigate();






  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const submitHandler = async (req, res) => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      setSnackbar({ isOpen: true, message: "Please fill required fields" })
      setLoading(false);
      return;
    }
    if (password != confirmpassword) {
      setSnackbar({ isOpen: true, message: "Password does not match" })
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
        "/api/user/register",
        { name, email, password, pic },
        config
      )
      setSnackbar({ status: "success", isOpen: true, message: "Signup Successful" })
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      navigate("/chats")

    } catch (error) {
      setSnackbar({ isOpen: true, message: "Error Occured!" })
      setLoading(false);
    }
  }






  const postDetails = (pics) => {
    setLoading(true);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat_app");
      data.append("cloud_name", "gaana");
      fetch("https://api.cloudinary.com/v1_1/gaana/image/upload", {
        method: "post",
        body: data
      }).then((res) => res.json())
        .then(data => {
          setPic(data.url.toString());
          setLoading(false);
          setSnackbar({ status: "success", isOpen: true, message: "Picture uploaded successfully" })
        }).catch((err) => {
          setSnackbar({ isOpen: true, message: "Error Occured!" })
          setLoading(false);
        })
    } else {
      setSnackbar({ isOpen: true, message: "File format is invalid" })
      setLoading(false);
      return;

    }
  }


  return (
    <Stack spacing="8px" color="black">


      <FormControl required >
        <FormLabel  >Name</FormLabel>
        <Input placeholder="Enter Your Name" onChange={(e) => setName(e.target.value)} />

      </FormControl>

      <FormControl required >
        <FormLabel  >Email</FormLabel>
        <Input placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} />

      </FormControl>

      <FormControl required >
        <FormLabel  >Password</FormLabel>


        <Input

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
      <FormControl required >
        <FormLabel  >Confirm Password</FormLabel>

        <Input

          type={showPassword ? 'text' : 'password'}
          placeholder="Enter Confirm Password"
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
          onChange={(e) => setConfirmpassord(e.target.value)}
        />


      </FormControl>

      <FormControl >
        <FormLabel  >Upload Your Picture</FormLabel>
        <Input type="file" style={{ padding: '1.5px' }} inputProps={{ accept: 'image/*' }} onChange={(e) => {
          postDetails(e.target.files[0])
        }} />

      </FormControl>

      <LoadingButton loading={loading} onClick={submitHandler} variant="contained" sx={{ textTransform: "none" }} >Sign Up</LoadingButton>

    </Stack>
  )
}

export default Signup