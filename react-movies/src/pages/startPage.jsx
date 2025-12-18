import { useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";
import { Link } from "react-router";
import { Box, Typography, Button, Stack, Paper } from "@mui/material";

const StartPage = () => {
  const { isAuthenticated, userName } = useContext(MoviesContext);
 // https://react.dev/reference/react/useContext
  return (
    //https://mui.com/material-ui/react-box/
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={6} 
      sx={{ 
        p: 5, maxWidth: 500, 
        textAlign: "center" 
        }}> {/* https://mui.com/material-ui/react-paper/ */}
        {/* https://mui.com/material-ui/api/typography/ */}
        <Typography variant="h4" fontWeight={700} gutterBottom> TMDB Chronicles </Typography>

        <Typography variant={isAuthenticated ? "h6" : "body1"} gutterBottom>
          {isAuthenticated //https://emojipedia.org/popcorn
            ? <>Welcome back, <strong>{userName}</strong> 🍿</>
            : "Explore A World Of Movies!"}
        </Typography>

        {/* https://mui.com/material-ui/react-stack/ */}
        <Stack spacing={2} mt={3}>
          {isAuthenticated ? (
            <>
              <Button component={Link} to="/movies" variant="contained" size="large"> Browse Movies </Button>
              <Button component={Link} to="/profile" variant="outlined">View your Profile </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" variant="contained" size="large"> Login </Button>
              <Button component={Link} to="/signup" variant="outlined"> Sign Up </Button>
            </>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default StartPage;