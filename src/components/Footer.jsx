import { Link } from "react-router-dom";

const Footer = ({ setOpenForm, nowUser }) => {
  return (
    <div className="bg-neutral-50 w-full fixed h-[10vh] shadow-md bottom-0 flex items-center justify-center">
      <Link className="text-3xl m-10" to="/">
        <i className="fa-solid fa-house"></i>
      </Link>
      <div
        onClick={() => {
          setOpenForm(true);
        }}
        className="text-3xl m-10 cursor-pointer"
      >
        <i className="fa-solid fa-circle-plus"></i>
      </div>
      <Link className="text-3xl m-10" to={`/profile/${nowUser.id}`}>
        <i className="fa-solid fa-user-large"></i>
      </Link>
    </div>
  );
};

export default Footer;
