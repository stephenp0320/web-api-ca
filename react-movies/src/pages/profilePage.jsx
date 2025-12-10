import { useContext } from "react";
import { MoviesContext } from '../contexts/moviesContext';
import { useNavigate } from "react-router";

const ProfilePage = () => {
    const context = useContext(MoviesContext);
    const navigate = useNavigate();
  
    return context.isAuthenticated ? (
        <p>
            User profile: {context.userName}
        </p>
    ) : (
        <p>
            You must log in to see your profile! {" "}
            <button onClick={() => navigate('/login')}>Login</button>
      </p>
    );
};

export default ProfilePage;
