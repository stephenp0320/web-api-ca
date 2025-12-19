import { useContext, useState } from "react";
import { Navigate } from "react-router";
import { MoviesContext } from '../contexts/moviesContext';

const SignUpPage = () => {
    const context = useContext(MoviesContext)
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [registered, setRegistered] = useState(false);
    const [error, setError] = useState("");

    const register = async () => {
        // used to clear any error messages before the signup logic is ran
        setError("");
        // added more clear error messages 
        let passwordRegEx =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        const validPassword = passwordRegEx.test(password);

        if (!validPassword) {
            setError("Password must be at least 8 characters and include a number and a symbol.");
            return;
        }

        //return an error when the users passwords are not matching
        if (password !== passwordAgain) {
            setError("Passwords do not match.");
            return;
        }

        let result = await context.register(userName, password);

        if (!result) {
            setError("Username already exists.");
            return;
        }

        setRegistered(true);
    };

    if (registered === true) {
        return <Navigate to="/login" />;
    }

    return (
        //https://mui.com/material-ui/react-box/
        <Box
            sx={{
                minHeight: "70vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {/* https://mui.com/material-ui/react-paper/ */}
            <Paper sx={{ p: 4, width: 400 }}>
            {/* https://mui.com/material-ui/react-typography/ */}
                <Typography variant="h4" align="center" gutterBottom> Sign Up </Typography>
                <Stack spacing={2}>
                {/* https://react.dev/learn/conditional-rendering */}
                    {error && <Alert severity="error">{error}</Alert>}

                    <TextField label="Username" value={userName} onChange={(e) => setUserName(e.target.value)} fullWidth />

                    <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />

                    <TextField label="Confirm Password" type="password" value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)} fullWidth />

                    <Button variant="contained" size="large" onClick={register}>
                        Register
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
};

export default SignUpPage;