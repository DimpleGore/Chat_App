import { Button, FilledInput, FormControl, FormGroup, FormLabel, IconButton, Input, InputAdornment, OutlinedInput, Stack, TextField } from "@mui/material"
import { useState } from "react"
import { Visibility, VisibilityOff } from "@mui/icons-material"

function Signup() {
    const [showPassword, setShowPassword] = useState(false);




    const [name, setName] = useState("");
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassord] = useState();
    const [pic, setPic] = useState();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

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
                    setPic(e.target.files[0])
                }} />

            </FormControl>

            <Button variant="contained" sx={{ textTransform: "none" }}>Sign Up</Button>


        </Stack>
    )
}

export default Signup