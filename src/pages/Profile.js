import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Profile = ({ setIsLoggedIn, nowUser }) => {
  const handleLogout = () => {
    signOut(auth);
    setIsLoggedIn(false);
  };

  return (
    <div>
      <h2>Profile</h2>
      <p>{`welcome ${nowUser.displayName}`}</p>
      <Link to="/" onClick={handleLogout}>
        Logout
      </Link>
    </div>
  );
};

export default Profile;
