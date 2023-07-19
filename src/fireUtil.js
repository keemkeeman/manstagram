import { db, storage, auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
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
  where,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

/* 피드 CRUD */

/* 1. 피드 생성 */
export const createFeed = async (user, nowUser, feedText, fileUrl) => {
  if (fileUrl === null) {
    window.alert("사진은 필수입니다!");
  } else {
    /* 이미지 */
    const fileRef = ref(storage, `${nowUser.uid}/${uuidv4()}`);
    const response = await uploadString(fileRef, fileUrl, "data_url");
    const imgUrl = await getDownloadURL(response.ref);

    /* 텍스트 */
    const docRef = await addDoc(collection(db, "feeds"), {
      createdAt: Timestamp.now(),
      creatorId: nowUser.uid,
      nickName: user.nickName,
      feedText: feedText,
      imgUrl: imgUrl,
    });

    return {
      id: docRef.id,
      createdAt: Timestamp.now(),
      creatorId: nowUser.uid,
      nickName: user.nickName,
      feedText: feedText,
      imgUrl: imgUrl,
    };
  }
};

/* 2. 피드 읽기 */
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

/* 3. 피드 수정 */
export const updateFeed = async (feed, newText, feedList, newFileUrl) => {
  if (!newFileUrl) {
    /* Firestore 업데이트 */
    const feedRef = doc(db, "feeds", `${feed.id}`);
    await updateDoc(feedRef, {
      createdAt: Timestamp.now(),
      feedText: newText,
    });

    const feedIndex = feedList.findIndex((item) => item.id === feed.id);
    const updatedFeed = {
      ...feedList[feedIndex],
      createdAt: Timestamp.now(),
      feedText: newText,
    };
    const prevList = feedList.slice(0, feedIndex);
    const nextList = feedList.slice(feedIndex + 1);
    const newList = [...prevList, updatedFeed, ...nextList];
    return newList;
  } else {
    /* Storage 업데이트 */
    /* 이전꺼 삭제하고 */
    await deleteObject(ref(storage, feed.imgUrl));
    /* 새로 등록함 */
    const fileRef = ref(storage, `${feed.creatorId}/${uuidv4()}`);
    const response = await uploadString(fileRef, newFileUrl, "data_url");
    const newImgUrl = await getDownloadURL(response.ref);
    /* Firestore 업데이트 */
    const feedRef = doc(db, "feeds", `${feed.id}`);
    await updateDoc(feedRef, {
      createdAt: Timestamp.now(),
      feedText: newText,
      imgUrl: newImgUrl,
    });

    const feedIndex = feedList.findIndex((item) => item.id === feed.id);
    const updatedFeed = {
      ...feedList[feedIndex],
      createdAt: Timestamp.now(),
      feedText: newText,
      imgUrl: newImgUrl,
    };
    const prevList = feedList.slice(0, feedIndex);
    const nextList = feedList.slice(feedIndex + 1);
    const newList = [...prevList, updatedFeed, ...nextList];
    return newList;
  }
};

/* 4. 피드 삭제 */
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

/* 유저 CRUD */

/* 유저 생성 */
export const createUser = async (email, pw) => {
  try {
    await createUserWithEmailAndPassword(auth, email, pw);
    await addDoc(collection(db, "users"), {
      createdAt: Timestamp.now(),
      email: email,
      nickName: "임시 닉네임",
    });
  } catch (err) {
    console.error(`Join error: ${err}`);
  }
};

/* 유저 로그인 */
export const signInUser = async (email, pw) => {
  try {
    await signInWithEmailAndPassword(auth, email, pw);
  } catch (err) {
    console.error(`Login error: ${err.error}`);
  }
};

/* 유저 로그아웃 */
export const logOut = async () => {
  await signOut(auth);
};

/* 유저 읽기 */
export const getUser = async (nowUser, setUser) => {
  const userSnap = await getDocs(
    query(collection(db, "users"), where("email", "==", nowUser.email))
  );
  const user = userSnap.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
  setUser(user[0]);
};

/* 유저 정보 수정 */
export const updateUser = async (user, nic) => {
  const userRef = doc(db, "users", `${user.id}`);
  await updateDoc(userRef, {
    nickName: nic,
  });
};

/* 유저 탈퇴 */
export const deleteAccount = async (user) => {
  console.log("유저아이디" + user.id, "커런트유저" + auth.currentUser.uid);
  const ok = window.confirm("are you sure?");
  if (ok) {
    if (user) {
      /* firestore 에서 삭제 */
      await deleteDoc(doc(db, "users", user.id));
      /* auth 에서 삭제 */
      await deleteUser(auth.currentUser);
    }
  }
};
