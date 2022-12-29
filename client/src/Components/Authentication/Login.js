import { Button, FilledInput, FormControl, FormGroup, FormLabel, IconButton, Input, InputAdornment, OutlinedInput, Stack, TextField } from "@mui/material"
import { useState } from "react"
import { Visibility, VisibilityOff } from "@mui/icons-material"


function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <Stack spacing="10px" color="black">
            <FormControl required >
                <FormLabel  >Email</FormLabel>
                <Input placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} />

            </FormControl>

            <FormControl required >
                <FormLabel  >Password</FormLabel>


                <Input
                    id="outlined-adornment-password"
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
            <Button variant="contained" sx={{ textTransform: "none" }}>Login</Button>
            <Button variant="contained" sx={{
                textTransform: "none", backgroundColor: 'red', '&:hover': {
                    backgroundColor: 'red',
                    opacity: [0.9, 0.8, 0.7],
                },
            }}>Get Guest User Credentials</Button>

        </Stack>
    )
}

export default Login