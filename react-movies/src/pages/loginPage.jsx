import { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { MoviesContext } from '../contexts/moviesContext';
import { Link } from "react-router";
import { Box, Paper, Typography, TextField, Button, Stack, Alert } from "@mui/material";

const LoginPage = () => {
    const context = useContext(MoviesContext);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const login = async () => {
        setError("") // clears any errors before login logic is ran
        const res = await context.authenticate(userName, password);
        if (!res) {
            setError("Invalid username or password")
        }
    };

    let location = useLocation();

    // Set 'from' to path where browser is redirected after a successful login - either / or the protected path user requested
    const { from } = location.state ? { from: location.state.from.pathname } : { from: "/" };

    if (context.isAuthenticated === true) {
        return <Navigate to={from} />;
    }

    return (
        //https://mui.com/material-ui/react-box/
        <Box sx={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* https://mui.com/material-ui/react-paper/ */}
            <Paper sx={{ p: 4, width: 400 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>

                <Stack spacing={2}>
                    {/* https://react.dev/learn/conditional-rendering */}
                    {error && <Alert severity="error">{error}</Alert>}

                    <TextField label="Username" value={userName} onChange={(e) => setUserName(e.target.value)}fullWidth/>

                    <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth/>

                    <Button variant="contained" size="large" onClick={login}>
                        Log In
                    </Button>
                    <Typography variant="body2" align="center"> Not registered? <Link to="/signup">Sign up</Link></Typography>
                </Stack>
            </Paper>
        </Box>
    );
};

export default LoginPage;
