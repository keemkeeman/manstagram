import { useEffect, useState } from "react";
import { likeFeed, isLikedUser, countLikes } from "../../fireUtil";

const FeedActions = ({ feed, nowUser, inputRef }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isMarked, setIsMarked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  /* 좋아요 on/off 및 개수 업데이트 */
  const handleLike = async () => {
    await likeFeed(feed, isLiked, nowUser, setLikesCount);
    setIsLiked((prev) => !prev);
  };

  useEffect(() => {
    /* 좋아요 여부 가져오기 */
    isLikedUser(feed, setIsLiked, nowUser);

    /* 좋아요 개수 가져오기 */
    const fetchLikeCount = async () => {
      setLikesCount(await countLikes(feed));
    };
    fetchLikeCount();
  }, [feed, nowUser]);

  return (
    <div className="flex flex-col px-10">
      <div className="flex mt-5 text-5xl">
        <div className="flex flex-1 gap-10">
          <div id="like" className="cursor-pointer" onClick={handleLike}>
            {isLiked ? (
              <i className="fa-solid fa-heart"></i>
            ) : (
              <i className="fa-regular fa-heart"></i>
            )}
          </div>
          <div
            id="comment"
            className="cursor-pointer"
            onClick={() => {
              inputRef.current.focus();
            }}
          >
            <i className="fa-regular fa-comment"></i>
          </div>
          <div id="share" className="cursor-pointer" onClick={()=>{window.alert("준비 중입니다😋")}}>
            <i className="fa-regular fa-paper-plane"></i>
          </div>
        </div>
        <div
          onClick={() => {
            setIsMarked((prev) => !prev);
          }}
        >
          {isMarked ? (
            <i className="fa-solid fa-bookmark"></i>
          ) : (
            <i className="fa-regular fa-bookmark"></i>
          )}
        </div>
      </div>
      <div className="text-3xl font-semibold mt-5">
        좋아요 {likesCount}개
      </div>
    </div>
  );
};
export default FeedActions;
