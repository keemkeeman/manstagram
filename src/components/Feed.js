import { useState } from "react";
import styles from "./Feed.module.css";
import { deleteFeed, updateFeed } from "../fireUtil";

const Feed = ({ feed, validUser, feedList, setFeedList, fileUrl }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [newFileUrl, setNewFileUrl] = useState("");
  const [newText, setNewText] = useState(feed.feedText);

  const handleEditOpen = () => {
    setIsEditOpen((prev) => !prev);
  };
  const handleEditClose = () => {
    setIsEditOpen(false);
  };
  const handleNewText = (e) => {
    setNewText(e.target.value);
  };

  /* 이미지 url 생성 */
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      window.alert("올바른 이미지 파일을 선택해주세요!");
      return;
    } else {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        setNewFileUrl(e.currentTarget.result);
      };
      reader.onerror = () => {
        window.alert("이미지를 읽는 도중 오류가 발생했습니다!");
      };
      reader.readAsDataURL(file);
    }
  };

  /* 수정 */
  const submitEditText = async (e) => {
    e.preventDefault();
    try {
      const updatedList = await updateFeed(
        feed,
        newText,
        feedList,
        fileUrl,
        newFileUrl
      );
      setFeedList(updatedList);
      setIsEditOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  /* 삭제 */
  const handleDelete = async () => {
    try {
      await deleteFeed(feed, feedList, setFeedList);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.feedWrap}>
      <div className={styles.top}>
        <div>icon</div>
        <span>{feed.nickName}</span>
        {validUser ? <button onClick={handleEditOpen}>edit</button> : ""}
      </div>
      <img className={styles.img} src={feed.imgUrl} alt="feedImg" />
      <div>actions</div>
      <div>likes</div>
      <div>
        <span>{feed.nickName}</span>
        <span>{feed.feedText}</span>
      </div>
      <div>comments</div>
      {isEditOpen && (
        <form className="editForm" onSubmit={submitEditText}>
          <h3>change your Feed</h3>
          <input type="file" accept="image/*" onChange={handleFile} />
          <input
            type="text"
            maxLength={100}
            value={newText}
            onChange={handleNewText}
          />
          <input type="submit" value="바꿔!" />
          <button onClick={handleDelete}>삭제</button>
          <button onClick={handleEditClose}>취소</button>
        </form>
      )}
    </div>
  );
};

export default Feed;
