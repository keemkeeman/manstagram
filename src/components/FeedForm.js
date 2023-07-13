import { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const FeedForm = ({ nowUser, feedList, setFeedList, setHaveFeed }) => {
  const [feedText, setFeedText] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleFeedText = (e) => {
    setFeedText(e.target.value);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = (e) => {
      setFileUrl(e.currentTarget.result);
    };
    reader.readAsDataURL(file);
  };

  /* 생성 */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fileUrl === "") {
      window.alert("사진은 필수입니다!");
    } else {
      let imgUrl = "";

      const fileRef = ref(storage, `${nowUser.uid}/${uuidv4()}`);

      const response = await uploadString(fileRef, fileUrl, "data_url");
      imgUrl = await getDownloadURL(response.ref);

      const docRef = await addDoc(collection(db, "feeds"), {
        createdAt: Timestamp.now(),
        creatorId: nowUser.uid,
        feedText: feedText,
        imgUrl: imgUrl,
      });

      const newFeed = {
        id: docRef.id,
        createdAt: Timestamp.now(),
        creatorId: nowUser.uid,
        feedText: feedText,
      };
      setFeedList([newFeed, ...feedList]);
      setHaveFeed(true);
      setFileUrl("");
      setFeedText("");
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
