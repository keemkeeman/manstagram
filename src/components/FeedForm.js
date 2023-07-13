import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const FeedForm = ({ nowUser }) => {
  const [feedText, setFeedText] = useState("");

  const handleFeedText = (e) => {
    setFeedText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "feeds"), {
      createdAt: Timestamp.now(),
      creatorId: nowUser.uid,
      feedText: feedText,
    });
    setFeedText("");
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
      <input type="submit" value="go" />
    </form>
  );
};

export default FeedForm;
