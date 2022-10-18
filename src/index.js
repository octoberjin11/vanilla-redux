import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

// store: Data 를 담는 저장소
// state: 변경이 필요한 Data
// reducer: Data 를 modify 하는 function

// **스토어에 리듀서 담기**
// const store = createStore(reducer);

const countModifier = (state = 0) => {
  //유일하게 data를 바꿀 수 있는 곳.
  console.log(state);
  return state;
};

const countStore = createStore(countModifier);
console.log(countStore.getState());
