import { useContext } from "react";
import { MoviesContext } from '../contexts/moviesContext';
import { Link } from "react-router";

const StartPage = () => {
    const context = useContext(MoviesContext);
  
    return context.isAuthenticated ? (
        <p>
            Welcome {context.userName}! View your <Link to="/movies">Movies</Link> or your <Link to="/profile">Profile</Link>.
        </p>
    ) : (
        <p>
            <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to create tasks!
        </p>
    );
  };

export default StartPage;
