import { Link } from "react-router-dom";

const Footer = ({ nowUser }) => {
  return (
    <div className="bg-neutral-50 w-full fixed h-[80px] shadow-md bottom-0 flex items-center justify-center">
      <Link className="text-3xl m-10" to="/">
        <i className="fa-solid fa-house"></i>
      </Link>
      <Link to="/upload" className="text-3xl m-10 cursor-pointer">
        <i className="fa-solid fa-circle-plus"></i>
      </Link>
      <Link className="text-3xl m-10" to={`/profile/${nowUser.id}`}>
        <i className="fa-solid fa-user-large"></i>
      </Link>
    </div>
  );
};

export default Footer;
