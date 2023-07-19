import { useState } from "react";
import { createFeed } from "../fireUtil";

const FeedForm = ({
  user,
  nowUser,
  feedList,
  setFeedList,
  fileUrl,
  setFileUrl,
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
    try {
      const newFeed = await createFeed(user, nowUser, feedText, fileUrl);
      setFeedList([newFeed, ...feedList]);
      setFileUrl(null);
      setFeedText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={feedText}
        onChange={handleFeedText}
        placeholder="What's on your mind?"
        maxLength={100}
      />
      <input type="file" accept="image/*" onChange={handleFile} />
      <input type="submit" value="go" />
    </form>
  );
};

export default FeedForm;
