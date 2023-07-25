import { useState } from "react";
import { createFeed } from "../fireUtil";
import styles from "./FeedForm.module.css";

const FeedForm = ({
  nowUser,
  feedList,
  setFeedList,
  fileUrl,
  setFileUrl,
  setOpenForm,
}) => {
  const [feedText, setFeedText] = useState("");

  const handleFeedText = (e) => {
    setFeedText(e.target.value);
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
        setFileUrl(e.currentTarget.result);
      };
      reader.onerror = () => {
        window.alert("이미지를 읽는 도중 오류가 발생했습니다!");
      };
      reader.readAsDataURL(file);
    }
  };

  /* 피드 생성 */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (feedText.trim().length === 0 || fileUrl.length === 0) {
      window.alert("1자 이상의 글과 사진은 필수입니다.");
    } else {
      try {
        const newFeed = await createFeed(nowUser, feedText, fileUrl);
        setFeedList([newFeed, ...feedList]);
        setFileUrl("");
        setFeedText("");
        setOpenForm(false);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className={styles.wrap}>
      <h2>Upload</h2>
      <form onSubmit={handleSubmit} className={styles.innerWrap}>
        <div className={styles.contentWrap}>
          <textarea
            className={styles.feedText}
            name="feedText"
            type="text"
            value={feedText}
            onChange={handleFeedText}
            placeholder="What's on your mind?"
            maxLength={100}
          />
        </div>
        <div className={styles.contentWrap}>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleFile}
          />
        </div>
        <div className={styles.buttons}>
          <input name="submitButton" type="submit" value="업로드" />
          <button
            onClick={() => {
              setOpenForm(false);
            }}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedForm;
