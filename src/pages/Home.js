import FeedForm from "../components/FeedForm";
import FeedList from "../components/FeedList";
import { useState } from "react";
import styles from "./Home.module.css";

const Home = ({ nowUser, openForm, setOpenForm }) => {
  const [feedList, setFeedList] = useState([]);
  const [fileUrl, setFileUrl] = useState("");

  return (
    <div className={styles.wrap}>
      {openForm && (
        <FeedForm
          nowUser={nowUser}
          feedList={feedList}
          setFeedList={setFeedList}
          fileUrl={fileUrl}
          setFileUrl={setFileUrl}
          setOpenForm={setOpenForm}
        />
      )}
      <FeedList
        nowUser={nowUser}
        feedList={feedList}
        setFeedList={setFeedList}
        fileUrl={fileUrl}
        setFileUrl={setFileUrl}
      />
    </div>
  );
};

export default Home;
