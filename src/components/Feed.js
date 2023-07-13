import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import { db } from "../firebase";
import styles from "./Feed.module.css";

const Feed = ({
  feedText,
  displayName,
  validUser,
  id,
  feedList,
  setFeedList,
  imgUrl,
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const editRef = useRef(feedText);

  const openEdit = () => {
    setIsEditOpen((prev) => !prev);
  };

  /* 수정 */
  const submitEditText = async (e) => {
    e.preventDefault();
    const feedRef = doc(db, "feeds", id);
    await updateDoc(feedRef, {
      feedText: editRef.current.value,
    });

    const feedIndex = feedList.findIndex((item) => item.id === id);
    const updatedFeed = {
      ...feedList[feedIndex],
      feedText: editRef.current.value,
    };
    const prevList = feedList.slice(0, feedIndex);
    const nextList = feedList.slice(feedIndex + 1);
    const updatedList = [...prevList, updatedFeed, ...nextList];
    setFeedList(updatedList);

    setIsEditOpen(false);
  };

  const CancelEdit = () => {
    setIsEditOpen(false);
  };

  /* 삭제 */
  const deleteFeed = async () => {
    await deleteDoc(doc(db, "feeds", id));
    const newList = feedList.filter((item) => item.id !== id);
    setFeedList(newList);
  };

  return (
    <div className={styles.feedWrap}>
      <div className={styles.top}>
        <div>icon</div>
        <span>{displayName}*nic*</span>
        {validUser ? <button onClick={openEdit}>edit</button> : ""}
      </div>
      <img className={styles.img} src={imgUrl} alt="feedImg" />
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
          <button onClick={deleteFeed}>삭제</button>
          <button onClick={CancelEdit}>취소</button>
        </form>
      )}
    </div>
  );
};

export default Feed;
