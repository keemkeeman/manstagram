import { useState } from "react";
import { deleteFeed, updateFeed, deleteFeedComments } from "../fireUtil";

const FeedEditForm = ({
  imgSrc,
  feed,
  feedList,
  setFeedList,
  setIsEditOpen,
}) => {
  const [newFileUrl, setNewFileUrl] = useState(imgSrc);
  const [newText, setNewText] = useState(feed.feedText);

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  const handleNewText = (e) => {
    setNewText(e.target.value);
  };

  /* 이미지 url 생성 */
  const handleFile = (event) => {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      window.alert("올바른 이미지 파일을 선택해주세요!");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = (e) => {
      setNewFileUrl(e.currentTarget.result);
    };
    reader.onerror = () => {
      window.alert("이미지를 읽는 도중 오류가 발생했습니다!");
    };
    reader.readAsDataURL(file);
  };

  /* 피드 수정 */
  const handleEdit = async () => {
    try {
      await updateFeed(feed, newText, feedList, newFileUrl, setFeedList);
      setIsEditOpen(false);
    } catch (error) {
      console.error("피드 수정 에러", error);
    }
  };

  /* 피드 삭제 */
  const handleDelete = async () => {
    await deleteFeed(feed, feedList, setFeedList);
    await deleteFeedComments(feed);
  };

  return (
    <div className="fixed flex flex-col rounded-xl shadow-lg py-10 m-24 z-50 bg-white">
      <div className="flex flex-row text-3xl justify-between border-b-2 p-5">
        <button
          onClick={handleEditClose}
          className="p-5 font-bold hover:text-rose-500"
        >
          취소
        </button>
        <h3 className="font-bold text-4xl">게시물 수정</h3>
        <button
          onClick={handleEdit}
          className="p-5 font-bold hover:text-blue-700 text-blue-500"
        >
          완료
        </button>
      </div>
      <div className="flex flex-col gap-10">
        <img alt="feedImg" src={newFileUrl} className="w-full aspect-square" />
        <input
          className="p-5 text-3xl"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleFile}
        />
        <textarea
          className="p-5 mx-5 text-3xl border"
          name="feedText"
          type="text"
          maxLength={100}
          value={newText}
          onChange={handleNewText}
        />
        <button
          onClick={handleDelete}
          className=" bg-rose-400 hover:bg-rose-500 text-3xl text-white py-5 mx-5 rounded-xl"
        >
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default FeedEditForm;
