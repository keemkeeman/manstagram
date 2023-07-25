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
  getDoc,
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
      likes: {
        likeUsers: [],
        likeCount: 0,
      },
      comments: [],
    });

    return {
      id: docRef.id,
      createdAt: Timestamp.now(),
      creatorId: nowUser.id,
      feedText: feedText,
      imgUrl: imgUrl,
      nickName: nowUser.nickName,
      likes: 0,
    };
  } catch (err) {
    console.error(`Feed Create error: ${err.error}`);
  }
};

/* 2. 피드 읽기 */
export const getFeeds = async (nowUser) => {
  const feedRef = collection(db, "feeds");
  try {
    const feedSnap = await getDocs(
      query(feedRef, orderBy("createdAt", "desc"))
    );
    const newfeeds = feedSnap.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

    // 가져온 피드 중에 닉네임 바뀐건 업데이트 함
    newfeeds.map(async (feed) => {
      if (feed.creatorId === nowUser.id && feed.nickName !== nowUser.nickName) {
        const feedDocRef = doc(db, "feeds", feed.id);
        await updateDoc(feedDocRef, { nickName: nowUser.nickName });
      }
    });

    return newfeeds;
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

    /* 이미지 처리 */
    if (newFileUrl) {
      /* Storage 업데이트 */
      /* 이전 사진 삭제하고*/
      if (feed.imgUrl) {
        await deleteObject(ref(storage, feed.imgUrl));
      }
      /* 새로운 사진 등록 */
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

/* 5. 피드 좋아요 on/off 및 좋아요 수 업데이트 */
export const likeFeed = async (feed, isLiked, nowUser, setLikesCount) => {
  // 문서 위치
  const feedRef = doc(db, "feeds", feed.id);

  // Firestore에서 현재 문서 데이터를 가져옵니다.
  const docSnapshot = await getDoc(feedRef);

  // 기존 'likeCount'와 'likeUsers' 필드 값 가져오기
  const currentLikeCount = docSnapshot.data().likes.likeCount;
  const currentLikeUsers = docSnapshot.data().likes.likeUsers;
  const updatedLikeCount = isLiked
    ? currentLikeCount - 1
    : currentLikeCount + 1;

  // 'likeCount'와 'likeUsers' 필드 업데이트
  const updatedLikeField = {
    likes: {
      likeCount: updatedLikeCount,
      likeUsers: isLiked
        ? currentLikeUsers.filter((userId) => userId !== nowUser.id)
        : [...currentLikeUsers, nowUser.id],
    },
  };

  // 업데이트된 'likeCount'와 'likeUsers' 필드를 문서에 저장
  await updateDoc(feedRef, updatedLikeField);

  /* 좋아요 개수 업데이트 */
  setLikesCount(updatedLikeCount);
};

/* 6. 좋아요 여부 가져오기 */
export const isLikedUser = async (feed, setIsLiked, nowUser) => {
  // 문서 가져오기
  const feedRef = doc(db, "feeds", feed.id);
  const docSnapshot = await getDoc(feedRef);

  // 해당 피드에 좋아요한 유저 id 가져오기
  const users = docSnapshot.data().likes.likeUsers;

  // 그 중 현재 접속 유저의 id가 있는지 true/false 담아주기
  setIsLiked(users.includes(nowUser.id));
};

/* 7. 좋아요 개수 읽기 */
export const countLikes = async (feed) => {
  /* 문서 가져오기 */
  const feedRef = doc(db, "feeds", feed.id);
  const docSnapshot = await getDoc(feedRef);

  // 개수 리턴하기
  return docSnapshot.data().likes.likeCount;
};

/* 댓글 */
/* 댓글 생성 */
export const createComment = async (commentText, nowUser, feed) => {
  try {
    const docRef = await addDoc(collection(db, "comments"), {
      feedId: feed.id,
      createdAt: Timestamp.now(),
      creatorId: nowUser.id,
      nickName: nowUser.nickName,
      commentText: commentText,
    });
    return {
      id: docRef.id,
      feedId: feed.id,
      creatorId: nowUser.id,
      nickName: nowUser.nickName,
      commentText: commentText,
    };
  } catch (err) {
    console.err(err);
  }
};

/* 댓글 불러오기 */
export const getComments = async (feed, nowUser) => {
  const commentRef = collection(db, "comments");
  try {
    // 피드별 댓글 리스트 가져옴
    const commentSnapshot = await getDocs(
      query(commentRef, where("feedId", "==", feed.id))
    );
    const comments = commentSnapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

    // 가져온 댓글리스트 중에 닉네임 바뀐건 업데이트 함
    comments.map(async (comment) => {
      if (
        comment.creatorId === nowUser.id &&
        comment.nickName !== nowUser.nickName
      ) {
        const commentDocRef = doc(db, "comments", comment.id);
        await updateDoc(commentDocRef, { nickName: nowUser.nickName });
      }
    });
    return comments;
  } catch (err) {
    console.error(`Comment Get error: ${err.error}`);
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
    const userRef = doc(db, "users", nowUser.id);
    const updatedFields = {}; // 빈 객체를 만들어 변경할 프로퍼티를 수집합니다.

    // 값이 새로 들어온 경우에만 업데이트할 프로퍼티를 추가합니다.
    // 닉네임은 해당 계정이 작성한 모든 피드를 가져와야해서
    // getDocs로 다 가져오고 updateDoc으로 업데이트
    if (nic) updatedFields.nickName = nic;
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
