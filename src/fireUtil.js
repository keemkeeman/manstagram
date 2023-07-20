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
export const createFeed = async (nowUser, feedText, fileUrl) => {
  try {
    if (fileUrl === null) {
      window.alert("사진은 필수입니다!");
    } else {
      /* storage 추가 */
      const fileRef = ref(storage, `${nowUser.id}/${uuidv4()}`);
      const response = await uploadString(fileRef, fileUrl, "data_url");
      const imgUrl = await getDownloadURL(response.ref);

      /* firestore 추가 */
      const docRef = await addDoc(collection(db, "feeds"), {
        createdAt: Timestamp.now(),
        creatorId: nowUser.id,
        feedText: feedText,
        imgUrl: imgUrl,
        nickName: nowUser.nickName,
      });

      return {
        id: docRef.id,
        createdAt: Timestamp.now(),
        creatorId: nowUser.id,
        feedText: feedText,
        imgUrl: imgUrl,
        nickName: nowUser.nickName,
      };
    }
  } catch (err) {
    console.error(`Feed Create error: ${err.error}`);
  }
};

/* 2. 피드 읽기 */
export const getFeeds = async (setFeedList) => {
  try {
    const feedSnap = await getDocs(
      query(collection(db, "feeds"), orderBy("createdAt", "desc"))
    );

    const newfeeds = feedSnap.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));
    setFeedList(newfeeds);
  } catch (err) {
    console.error(`Feed Get error: ${err.error}`);
  }
};

/* 3. 피드 수정 */
export const updateFeed = async (feed, newText, feedList, newFileUrl) => {
  try {
    const updatedFeedData = {
      feedText: newText,
    };

    if (newFileUrl) {
      /* Storage 업데이트 */
      /* 이전 사진 있다면 삭제하고 근데 등록에서 필수라 괜춘*/
      if (feed.imgUrl) {
        await deleteObject(ref(storage, feed.imgUrl));
      }
      /* 새로 등록함 */
      const fileRef = ref(storage, `${feed.creatorId}/${uuidv4()}`);
      const response = await uploadString(fileRef, newFileUrl, "data_url");
      const newImgUrl = await getDownloadURL(response.ref);

      updatedFeedData.imgUrl = newImgUrl;
    }

    /* Firestore 업데이트 */
    const feedRef = doc(db, "feeds", `${feed.id}`);
    await updateDoc(feedRef, updatedFeedData);

    /* feedList 업데이트 */
    const feedIndex = feedList.findIndex((item) => item.id === feed.id);
    const updatedFeed = {
      ...feedList[feedIndex],
      ...updatedFeedData,
    };
    const prevList = feedList.slice(0, feedIndex);
    const nextList = feedList.slice(feedIndex + 1);
    const newList = [...prevList, updatedFeed, ...nextList];
    return newList;
  } catch (err) {
    console.error(`Feed Update error: ${err.error}`);
  }
};

/* 4. 피드 삭제 */
export const deleteFeed = async (feed, feedList, setFeedList) => {
  try {
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
  } catch (err) {
    console.error(`Feed Delete error: ${err.error}`);
  }
};

/* 유저 CRUD */

/* 유저 생성 */
export const createUser = async (email, pw, setNowUser) => {
  try {
    await createUserWithEmailAndPassword(auth, email, pw);
    const docRef = await addDoc(collection(db, "users"), {
      createdAt: Timestamp.now(),
      email: email,
      nickName: "임시 닉네임",
      phoneNumber: "",
      profilePicUrl: "",
      introduction: "",
    });
    setNowUser({
      id: docRef.id,
      createdAt: Timestamp.now(),
      email: email,
      nickName: "임시 닉네임",
      phoneNumber: "",
      profilePicUrl: "",
      introduction: "",
    });
  } catch (err) {
    console.error(`Join error: ${err.error}`);
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
export const getUser = async (setNowUser) => {
  try {
    const userSnap = await getDocs(
      query(
        collection(db, "users"),
        where("email", "==", auth.currentUser.email)
      )
    );
    const users = userSnap.docs.map((user) => ({
      id: user.id,
      ...user.data(),
    }));
    setNowUser(users[0]);
  } catch (err) {
    console.error(`User Get error: ${err.error}`);
  }
};

/* 유저 정보 수정 */
export const updateUser = async (
  nowUser,
  setNowUser,
  nic,
  phoneNumber,
  profilePicUrl,
  introduction
) => {
  try {
    const userRef = doc(db, "users", `${nowUser.id}`);
    const updatedFields = {}; // 빈 객체를 만들어 변경할 프로퍼티를 수집합니다.

    // 값이 새로 들어온 경우에만 업데이트할 프로퍼티를 추가합니다.
    // 닉네임은 해당 계정이 작성한 모든 피드를 가져와야해서
    // getDocs로 다 가져오고 updateDoc으로 업데이트
    if (nic) {
      updatedFields.nickName = nic;
      /* Firestore 업데이트 */
      const feedsQuery = query(
        collection(db, "feeds"),
        where("creatorId", "==", nowUser.id)
      );
      if (feedsQuery) {
        const feedsSnap = await getDocs(feedsQuery);
        feedsSnap.docs.map((doc) => updateDoc(doc.ref, { nickName: nic }));
      }
    }
    if (phoneNumber) updatedFields.phoneNumber = phoneNumber;
    if (profilePicUrl) updatedFields.profilePicUrl = profilePicUrl;
    if (introduction) updatedFields.introduction = introduction;

    await updateDoc(userRef, updatedFields);

    setNowUser((prev) => ({
      ...prev,
      ...updatedFields, // 변경된 프로퍼티를 기존 데이터에 병합합니다.
    }));
  } catch (err) {
    console.error(`User Update Error: ${err.error}`);
  }
};

/* 유저 탈퇴 */
export const deleteAccount = async () => {
  try {
    const ok = window.confirm("are you sure?");
    if (ok) {
      /* auth 에서 삭제 */
      await deleteUser(auth.currentUser);
    }
  } catch (err) {
    console.error(`User Delete Error: ${err.error}`);
  }
};
