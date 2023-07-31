import { atom, selector } from "recoil";

export const emailAtom = atom({
  key: "emailAtom", // 이름이며 전역적으로 유일한 이름
  default: "", // 초기값
});

export const emailValidationAtom = selector({
  key: "emailValidationAtom",
  get: ({ get }) => {
    const inputEmail = get(emailAtom);
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(inputEmail);
  },
});

export const pwAtom = atom({
  key: "pwAtom",
  default: "",
});

export const pwValidationAtom = selector({
  key: "pwValidationAtom",
  get: ({ get }) => {
    const inputPw = get(pwAtom);
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    return regex.test(inputPw);
  },
});
