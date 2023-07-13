import { updateDoc, doc } from "firebase/firestore";
import { useRef, useState } from "react";
import { db } from "../firebase";

const Feed = ({ feedText, displayName, uid, id }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const editRef = useRef(feedText);

  const openEdit = () => {
    setIsEditOpen((prev) => !prev);
  };

  const submitEditText = async (e) => {
    e.preventDefault();
    const feedRef = doc(db, "feeds", id);
    console.log(feedRef);
    await updateDoc(feedRef, {
      feedText: editRef.current.value,
    });
    setIsEditOpen(false);
  };

  const CancelEdit = () => {
    setIsEditOpen(false);
  };

  return (
    <div className="feedWrap">
      <div className="top">
        <div>icon</div>
        <span>{displayName}*nic*</span>
        <button onClick={openEdit}>edit</button>
      </div>
      <div>img</div>
      <div>actions</div>
      <div>likes</div>
      <div>
        <span>{displayName}*nic*</span>
        <span>{feedText}</span>
      </div>
      <div>comments</div>
      {isEditOpen && (
        <form className="editForm" onSubmit={submitEditText}>
          <h3>change your text</h3>
          <input type="text" ref={editRef} maxLength={100} />
          <input type="submit" value="바꿔!" />
          <button onClick={CancelEdit}>취소</button>
        </form>
      )}
    </div>
  );
};

export default Feed;
