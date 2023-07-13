import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
    </div>
  );
};

export default Footer;
