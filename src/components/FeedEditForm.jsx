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

  console.log(newFileUrl);

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
    const updatedList = await updateFeed(feed, newText, feedList, newFileUrl);
    setFeedList(updatedList);
    setIsEditOpen(false);
  };

  /* 피드 삭제 */
  const handleDelete = async () => {
    await deleteFeed(feed, feedList, setFeedList);
    await deleteFeedComments(feed);
  };

  return (
    <div className="absolute w-[500px] flex flex-col px-5 rounded-md shadow-lg top-10 py-5 z-10 bg-neutral-100">
      <div className="flex text-lg justify-between border-b-2 pb-3">
        <button onClick={handleEditClose} className="hover:font-bold">
          취소
        </button>
        <h3 className="font-bold">게시물 수정</h3>
        <button onClick={handleEdit} className="hover:font-bold text-blue-700">
          완료
        </button>
      </div>
      <div className="flex flex-col items-center gap-3 my-5">
        <img alt="feedImg" src={newFileUrl} className="h-full w-full" />
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleFile}
        />
        <textarea
          className="w-full h-full"
          name="feedText"
          type="text"
          maxLength={100}
          value={newText}
          onChange={handleNewText}
        />
        <button
          onClick={handleDelete}
          className="border-2 border-neutral-300 text-sm text-neutral-500 my-5"
        >
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default FeedEditForm;
