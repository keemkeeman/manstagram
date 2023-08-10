import { useState } from "react";
import { createFeed } from "../fireUtil";
import { useNavigate } from "react-router-dom";

const FeedForm = ({ nowUser, feedList, setFeedList }) => {
  const defaultImgUrl =
    "https://firebasestorage.googleapis.com/v0/b/manstagram-77636.appspot.com/o/38bEHAI7i494M9oxAHWG%2F126477.png?alt=media&token=931c054b-e9f7-4fbd-9f41-60515b6ec680";
  const navigate = useNavigate();
  const [feedText, setFeedText] = useState("");
  const [fileUrl, setFileUrl] = useState(defaultImgUrl);

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
        const newFeed = await createFeed(
          nowUser,
          feedText,
          fileUrl,
          setFileUrl
        );
        setFeedList([newFeed, ...feedList]);
        setFileUrl(defaultImgUrl);
        setFeedText("");
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="flex w-full min-h-[calc(100vh - 160px)] flex-col items-center py-[80px] ">
      <div className="text-2xl my-10">Share everything </div>
      <div className="relative flex flex-col items-center">
        <img src={fileUrl} alt="uploadImg" className="w-[400px] shadow-md" />

        <textarea
          className="w-full my-5 h-[100px] shadow-md p-3"
          name="feedText"
          type="text"
          value={feedText}
          onChange={handleFeedText}
          placeholder="최대 100자까지 작성"
          maxLength={100}
        />
        <input
          className="w-full"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleFile}
        />

        <button
          className="bg-green-500 w-full my-5 py-2 font-bold"
          onClick={handleSubmit}
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default FeedForm;
