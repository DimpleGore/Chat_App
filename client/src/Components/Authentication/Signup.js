import { FormControl, FormLabel, IconButton, Input, InputAdornment, Snackbar, Stack } from "@mui/material"
import { useState } from "react"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import * as React from "react"
import MuiAlert from '@mui/material/Alert';
import { LoadingButton } from '@mui/lab';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Alert = React.forwardRef(function Alert(props, ref) {
    console.log(props)
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  



function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassord] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [snack, setSnack] = useState(false);
    const [error, setError] = useState(false)
    const navigate = useNavigate();
    

    
   
      

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }
      
        setOpen(false);
      };

      const submitHandler = async(req,res) => {
        console.log("come")
        setLoading(true);
        if(!name || !email || !password || !confirmpassword){
            setOpen(true);
            setSnack(false)
            setError(true);
        
        setLoading(false);
        return;
        }
        if(password!=confirmpassword){
            setOpen(true);
            setSnack(false)
            setError(true);
        
        setLoading(false);
        return;
        }
        try{
          const config = {
            headers: {
              "Content-type": "application/json"
            }
          }

          const {data} = await axios.post(
            "/api/user/register",
            {name, email, password,pic},
            config
          )
          setOpen(true);
          setSnack(true);
          localStorage.setItem('userInfo', JSON.stringify(data));
          setLoading(false);
          navigate("/chats")

        }catch(error){
           setOpen(true);
           setError(true);
           setLoading(false); 
        }
      }


      
      
    

    const postDetails = (pics) => {
      setLoading(true);
      console.log(loading)
      if(pics.type==="image/jpeg" || pics.type === "image/png"){
         const data = new FormData();
         data.append("file", pics);
         data.append("upload_preset", "chat_app");
         data.append("cloud_name", "gaana");
         fetch("https://api.cloudinary.com/v1_1/gaana/image/upload",{
            method: "post",
            body: data
         }).then((res) => res.json())
          .then(data => {
            console.log(data)
            setPic(data.url.toString());
            console.log(data.url.toString());
            setLoading(false);
            setOpen(true)
            setSnack(true)
            setError(false)
          }).catch((err) => {
            console.log(err);
            setLoading(false);
          })
      }else{
        
        console.log(open,loading);
        setOpen(true)
        setError(true);
        setSnack(false)
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

            {snack && <div><Snackbar anchorOrigin={{vertical: 'top',horizontal: 'center'}} open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert  onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar></div> }
      { error && <div><Snackbar anchorOrigin={{vertical: 'top',horizontal: 'center'}} open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          This is a error message!
        </Alert>
      </Snackbar></div>}


        </Stack>
    )
}

export default Signup