import { useState } from "react";
import { createFeed } from "../fireUtil";
import { useNavigate } from "react-router-dom";
import uploadImage from "../images/cookie.jpg";
import Loading from "./Loading";

const FeedForm = ({ nowUser, feedList, setFeedList }) => {
  const navigate = useNavigate();
  const [feedText, setFeedText] = useState("");
  const [fileUrl, setFileUrl] = useState(uploadImage);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      if (feedText.trim().length === 0 || fileUrl === uploadImage) {
        window.alert("1자 이상의 글과 사진은 필수입니다.");
        return;
      } else {
        const newFeed = await createFeed(
          nowUser,
          feedText,
          fileUrl,
          setFileUrl
        );
        setFeedList([newFeed, ...feedList]);
        setFeedText("");
        navigate("/");
      }
    } catch (error) {
      console.error("게시물 생성 오류", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1080px]">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-5 items-center py-28 px-5 text-4xl">
          <div className="flex w-full flex-col gap-3 items-center text-5xl font-bold">
            <p>원하는 사진을 업로드하세요!</p>
            <p className="text-3xl text-amber-800">(ft.내가 만든 쿠키)</p>
          <img src={fileUrl} alt="uploadImg" className="w-full" />
          </div>
          <div className="flex w-full flex-col items-center">
            <input
              className="w-full py-10"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleFile}
            />
            <textarea
              className="w-full my-5 h-[200px] shadow-md p-3 bg-neutral-100"
              name="feedText"
              type="text"
              value={feedText}
              onChange={handleFeedText}
              placeholder="최대 100자까지 작성"
              maxLength={100}
            />
            <button
              className="bg-green-500 w-full py-10 font-bold"
              onClick={handleSubmit}
            >
              업로드
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedForm;
