import { useState } from "react";
import { deleteFeed, updateFeed } from "../fireUtil";

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
    <div className="editForm">
      <h3>change your Feed</h3>
      <input name="image" type="file" accept="image/*" onChange={handleFile} />
      <input
        name="feedText"
        type="text"
        maxLength={100}
        value={newText}
        onChange={handleNewText}
      />
      <button
        onClick={handleEdit}
        name="submitButton"
        type="submit"
        value="바꿔!"
      />
      <button onClick={handleDelete}>삭제</button>
      <button onClick={handleEditClose}>취소</button>
    </div>
  );
};

export default FeedEditForm;
