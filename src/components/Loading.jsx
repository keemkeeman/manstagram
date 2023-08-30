import { PuffLoader } from "react-spinners";

const Loading = () => {
  return (
    <div
      className="
      h-[50vh]
      flex 
      justify-center 
      items-center 
    "
    >
      <PuffLoader size={100} color="red" />
    </div>
  );
};

export default Loading;
