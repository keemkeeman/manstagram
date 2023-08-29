const BackDrop = ({ toggle }) => {
  return (
    <div
      className="fixed top-0 left-0 w-[100%] h-[100vh] bg-black opacity-50 z-20"
      onClick={() => {
        toggle(false);
      }}
    ></div>
  );
};

export default BackDrop;
