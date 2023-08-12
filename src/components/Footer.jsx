import { Link } from "react-router-dom";
import { AiFillHome, AiFillPlusCircle } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";

const Footer = ({ nowUser }) => {
  return (
    <div className="bg-neutral-50 w-full fixed h-[8vh] shadow-md bottom-0 flex items-center justify-center">
      <Link className="text-3xl m-10" to="/">
        <AiFillHome size={30} />
      </Link>
      <Link to="/upload" className="text-3xl m-10 cursor-pointer">
        <AiFillPlusCircle size={30} />
      </Link>
      <Link className="text-3xl m-10" to={`/profile/${nowUser.id}`}>
        <IoPerson size={30} />
      </Link>
    </div>
  );
};

export default Footer;
