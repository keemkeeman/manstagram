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
import defaultImage from "./images/defaultImage.jpg";

/* 피드 CRUD */

/* 1. 피드 생성 */
export const createFeed = async (nowUser, feedText, fileUrl, setFileUrl) => {
  try {
    /* storage 추가 */
    const fileRef = ref(storage, `${nowUser.id}/${uuidv4()}`);
    const response = await uploadString(fileRef, fileUrl, "data_url");
    const imgUrl = await getDownloadURL(response.ref);
    const feedObj = {
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
    };
    setFileUrl(imgUrl);

    /* firestore 추가 */
    const docRef = await addDoc(collection(db, "feeds"), feedObj);
    return {
      id: docRef.id,
      ...feedObj,
    };
  } catch (err) {
    console.error(`Feed Create error: ${err.error}`);
  }
};

/* 2. 피드 읽기 */
export const getFeeds = async (nowUser) => {
  try {
    const feedSnap = await getDocs(
      query(collection(db, "feeds"), orderBy("createdAt", "desc"))
    );

    const newfeeds = feedSnap.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

    // 변경 사항 업데이트
    const findChange = newfeeds.filter(
      (feed) =>
        feed.creatorId === nowUser.id && feed.nickName !== nowUser.nickName
    );

    if (findChange.length > 0) {
      findChange.map(async (feed) => {
        const feedDocRef = doc(db, "feeds", feed.id);
        await updateDoc(feedDocRef, { nickName: nowUser.nickName });
      });
    }

    return newfeeds;
  } catch (err) {
    console.error(`Feed Get error: ${err.error}`);
  }
};

/* 피드 프로필 사진 읽기 */
export const getProfilePic = async (feed) => {
  try {
    const userSnap = await getDoc(doc(db, "users", `${feed.creatorId}`));
    const picUrl = userSnap.data().profilePicUrl;
    return picUrl;
  } catch (error) {
    throw new Error(error);
  }
};

/* 3. 피드 수정 */
export const updateFeed = async (
  feed,
  newText,
  feedList,
  newFileUrl,
  setFeedList
) => {
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
    setFeedList(newList);
  } catch (error) {
    console.error(`피드 수정 에러`, error);
  }
};

/* 4. 피드 삭제 */
export const deleteFeed = async (feed, feedList, setFeedList) => {
  try {
    const ok = window.confirm("게시물을 삭제하시겠습니까?");
    if (ok) {
      await deleteDoc(doc(db, "feeds", feed.id));

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

/* 1. 댓글 생성 */
export const createComment = async (commentText, nowUser, feed) => {
  try {
    const newComment = {
      feedId: feed.id,
      createdAt: Timestamp.now(),
      creatorId: nowUser.id,
      nickName: nowUser.nickName,
      commentText: commentText,
      momId: null,
      originId: null,
    };
    const docRef = await addDoc(collection(db, "comments"), newComment);
    return {
      id: docRef.id,
      ...newComment,
    };
  } catch (err) {
    console.error(err);
  }
};

/* 2. 댓글 읽기 */
export const getComments = async (feed, nowUser) => {
  try {
    // 피드별 댓글 리스트 가져옴
    const commentRef = collection(db, "comments");
    const commentSnapshot = await getDocs(
      query(
        commentRef,
        where("feedId", "==", feed.id),
        where("momId", "==", null)
      )
    );

    const comments = commentSnapshot.docs.map((comment) => ({
      id: comment.id,
      ...comment.data(),
    }));

    const commentList = comments.sort((a, b) => b.createdAt - a.createdAt);

    // 변경사항 업데이트
    const findChange = commentList.filter(
      (comment) =>
        comment.creatorId === nowUser.id &&
        comment.nickName !== nowUser.nickName
    );

    if (findChange.length > 0) {
      findChange.map(async (comment) => {
        const commentDocRef = doc(db, "comments", comment.id);
        await updateDoc(commentDocRef, { nickName: nowUser.nickName });
      });
    }
    return commentList;
  } catch (err) {
    console.error(`Comment Get error: ${err.error}`);
  }
};

/* 3. 댓글 수정 */
export const editComment = async (comment, comments, editedCommentText) => {
  try {
    const docRef = doc(db, "comments", comment.id);
    await updateDoc(docRef, {
      commentText: editedCommentText,
    });

    /* 댓글 순서 맞춰 반환 */
    const commnetIndex = comments.findIndex((item) => item.id === comment.id);
    const updatedCommnet = {
      ...comments[commnetIndex],
      commentText: editedCommentText,
    };
    const prevList = comments.slice(0, commnetIndex);
    const nextList = comments.slice(commnetIndex + 1);
    const newList = [...prevList, updatedCommnet, ...nextList];
    return newList;
  } catch (err) {
    console.error(err);
  }
};

/* 4. 대댓글 생성 */
export const createReply = async (comment, replyCommentText, nowUser, feed) => {
  try {
    const newReply = {
      originId: comment.momId ? comment.originId : comment.id,
      momId: comment.id,
      momNickName: comment.nickName,
      feedId: feed.id,
      createdAt: Timestamp.now(),
      creatorId: nowUser.id,
      nickName: nowUser.nickName,
      commentText: replyCommentText,
    };
    const docRef = await addDoc(collection(db, "comments"), newReply);
    return {
      id: docRef.id,
      ...newReply,
    };
  } catch (err) {
    console.error(err);
  }
};

/* 5. 대댓글 읽기 */
export const getReplies = async (nowUser, feed, comment) => {
  try {
    // 피드별 댓글 리스트 가져옴
    const commentRef = collection(db, "comments");
    const replySnapshot = await getDocs(
      query(
        commentRef,
        where("feedId", "==", feed.id),
        where("originId", "==", comment.id)
      )
    );
    const comments = replySnapshot.docs.map((comment) => ({
      id: comment.id,
      ...comment.data(),
    }));

    const commentList = comments.sort((a, b) => b.createdAt - a.createdAt);

    // 변경사항 업데이트
    const findChange = commentList.filter(
      (comment) =>
        comment.creatorId === nowUser.id &&
        comment.nickName !== nowUser.nickName
    );

    if (findChange.length > 0) {
      findChange.map(async (comment) => {
        const commentDocRef = doc(db, "comments", comment.id);
        await updateDoc(commentDocRef, { nickName: nowUser.nickName });
      });
    }
    return commentList;
  } catch (err) {
    console.error(`Reply Get error: ${err.error}`);
  }
};

/* 6. 댓글 수 가져오기 */
export const getCommentCount = async (feed) => {
  const collectionRef = collection(db, "comments");
  const comments = await getDocs(
    query(collectionRef, where("feedId", "==", feed.id))
  );
  const commentCount = comments.docs.length;
  return commentCount;
};

/* 4. 댓글 개별 삭제 */
export const deleteComment = async (comment, comments, setComments) => {
  try {
    const ok = window.confirm("댓글을 삭제하시겠습니까?");
    if (ok) {
      /* 부모 댓글 삭제 */
      const commentRef = doc(db, "comments", comment.id);
      await deleteDoc(commentRef);
      /* 자식 댓글 삭제 */
      const repliesRef = collection(db, "comments");
      const repliesSnap = await getDocs(
        query(repliesRef, where("momId", "==", comment.id))
      );
      if (repliesSnap) {
        repliesSnap.docs.map(async (reply) => await deleteDoc(reply.ref));
      }
      /* 상태 업데이트 */
      const newList = await comments.filter((item) => item.id !== comment.id);
      setComments(newList);
      return comments;
    }
  } catch (err) {
    console.error(err);
  }
};

/* 5. 댓글 피드별 (전체) 삭제 */
export const deleteFeedComments = async (feed) => {
  try {
    const commentsSnap = await getDocs(
      query(collection(db, "comments"), where("feedId", "==", feed.id))
    );
    /* snap.docs는 배열이라 map, snap은 객체라 forEach, doc.ref는 각 doc의 위치  */
    commentsSnap.docs.map(async (doc) => {
      await deleteDoc(doc.ref);
    });
  } catch (err) {
    console.error(err);
  }
};

/* 유저 CRUD */

/* 1. 유저 생성 */
export const createUser = async (email, pw) => {
  try {
    await createUserWithEmailAndPassword(auth, email, pw);
    await addDoc(collection(db, "users"), {
      createdAt: Timestamp.now(),
      email: email,
      nickName: "임시 닉네임",
      phoneNumber: "",
      profilePicUrl: defaultImage,
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
    if (err.code === "auth/user-not-found" || "auth/wrong-password") {
      window.alert("이메일 또는 비밀번호를 확인해주세요.");
    }
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
    /* 이미지 처리 */
    if (profilePicUrl) {
      /* Storage 업데이트 */
      /* 이전 사진 삭제하고*/
      if (nowUser.profilePicUrl) {
        await deleteObject(ref(storage, nowUser.profilePicUrl));
      }
      /* storage 추가 */
      const fileRef = ref(storage, `${nowUser.id}/${uuidv4()}`);
      const response = await uploadString(fileRef, profilePicUrl, "data_url");
      const imgUrl = await getDownloadURL(response.ref);
      /* firestore 추가 */
      const userRef = doc(db, "users", nowUser.id);
      const updatedFields = {}; // 빈 객체를 만들어 변경할 프로퍼티를 수집합니다.

      if (nic) updatedFields.nickName = nic;
      if (phoneNumber) updatedFields.phoneNumber = phoneNumber;
      if (imgUrl) updatedFields.profilePicUrl = imgUrl;
      if (introduction) updatedFields.introduction = introduction;

      await updateDoc(userRef, updatedFields);

      setNowUser((prev) => ({
        ...prev,
        ...updatedFields, // 변경된 프로퍼티를 기존 데이터에 병합합니다.
      }));
    }
  } catch (error) {
    console.error(`User Update Error:`, error);
  }
};

/* 유저 검색 */
export const findUser = async (searchInput, setSearchResult) => {
  try {
    const userSnap = await getDocs(
      query(collection(db, "users"), where("nickName", "==", searchInput))
    );

    if (userSnap.docs.length === 0) {
      return setSearchResult([]);
    }

    const searchResult = userSnap.docs.map((user) => ({
      id: user.id,
      ...user.data(),
    }));
    setSearchResult(searchResult);
  } catch (error) {
    throw new Error(error);
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

/* 프로필 유저 가져오기 */
export const getProfileUser = async (userId, setProfileFeedList) => {
  try {
    /* 프로필 가져오기 */
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    const user = {
      id: userSnap.id,
      ...userSnap.data(),
    };
    /* 본인 피드 불러오기 */
    const feedRef = collection(db, "feeds");
    const feedSnap = await getDocs(
      query(feedRef, where("creatorId", "==", userId))
    );
    const profileFeeds = feedSnap.docs.map((feed) => ({
      id: feed.id,
      ...feed.data(),
    }));
    setProfileFeedList(profileFeeds);
    return user;
  } catch (err) {
    console.error(err);
  }
};
