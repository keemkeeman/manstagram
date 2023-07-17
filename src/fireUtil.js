import { db, storage } from "./firebase";
import {
  collection,
  addDoc,
  Timestamp,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

/* 피드 생성 */
export const createFeed = async (nowUser, feedText, fileUrl) => {
  if (fileUrl === null) {
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

    return {
      id: docRef.id,
      createdAt: Timestamp.now(),
      creatorId: nowUser.uid,
      feedText: feedText,
      imgUrl: imgUrl,
    };
  }
};

/* 피드 읽기 */
export const getFeeds = async (setFeedList) => {
  const feedSnap = await getDocs(
    query(collection(db, "feeds"), orderBy("createdAt", "desc"))
  );

  const newfeeds = feedSnap.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
  setFeedList(newfeeds);
};

/* 피드 수정 */
export const updateFeed = async (feed, editRef, feedList, fileUrl) => {
  const feedRef = doc(db, "feeds", `${feed.id}`);
  await updateDoc(feedRef, {
    createdAt: Timestamp.now(),
    feedText: editRef.current.value,
    imgUrl: fileUrl,
  });

  const fileRef = ref(storage, feed.creatorId, fileUrl);
  await uploadString(fileRef, fileUrl, "data_url");

  const feedIndex = feedList.findIndex((item) => item.id === feed.id);
  const updatedFeed = {
    ...feedList[feedIndex],
    feedText: editRef.current.value,
    imgUrl: fileUrl,
  };
  const prevList = feedList.slice(0, feedIndex);
  const nextList = feedList.slice(feedIndex + 1);
  return [...prevList, updatedFeed, ...nextList];
};

/* 피드 삭제 */
export const deleteFeed = async (feed, feedList, setFeedList) => {
  const ok = window.confirm("are you sure?");
  if (ok) {
    if (feed.id) {
      await deleteDoc(doc(db, "feeds", feed.id));
    }
    if (feed.imgUrl) {
      await deleteObject(ref(storage, feed.imgUrl));
    }
    const newList = await feedList.filter((item) => item.id !== feed.id);
    setFeedList(newList);
  }
  return feedList;
};
