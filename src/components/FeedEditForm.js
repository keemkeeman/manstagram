import { useState } from "react";
import { deleteFeed, updateFeed } from "../fireUtil";
import styles from "./FeedEditForm.module.css";

const FeedEditForm = ({ feed, feedList, setFeedList, setIsEditOpen }) => {
  const [newFileUrl, setNewFileUrl] = useState("");
  const [newText, setNewText] = useState(feed.feedText);

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

  /* 피드 수정 */
  const handleEdit = async () => {
    const updatedList = await updateFeed(feed, newText, feedList, newFileUrl);
    setFeedList(updatedList);
    setIsEditOpen(false);
  };

  /* 피드 삭제 */
  const handleDelete = async () => {
    await deleteFeed(feed, feedList, setFeedList);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.topWrap}>
        <h3>change your Feed</h3>
        <i onClick={handleDelete} className="fa-solid fa-trash"></i>
      </div>
      <div className={styles.contentWrap}>
        <textarea
          name="feedText"
          type="text"
          maxLength={100}
          value={newText}
          onChange={handleNewText}
        />
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleFile}
        />
        <div className={styles.buttons}>
          <button onClick={handleEdit} className={styles.changeButton}>
            바꿔!
          </button>
          <button onClick={handleEditClose} className={styles.cancelButton}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedEditForm;
