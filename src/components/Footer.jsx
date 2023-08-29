import { Link } from "react-router-dom";
import { AiFillHome, AiFillPlusCircle } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";

const Footer = ({ nowUser }) => {
  return (
    <div className="bg-white w-full shadow-md bottom-0 fixed border-t z-10">
      <div className="flex flex-row mx-auto px-10 py-10 items-center justify-around max-w-[2000px]">
        <Link className="text-3xl" to="/">
          <AiFillHome size={70} />
        </Link>
        <Link to="/upload" className="text-3xl cursor-pointer">
          <AiFillPlusCircle size={70} />
        </Link>
        <Link className="text-3xl" to={`/profile/${nowUser.id}`}>
          <IoPerson size={70} />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
