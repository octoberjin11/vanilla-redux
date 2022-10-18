import { createStore } from "redux";
//리덕스 최신버전에서는 createStore 에 취소선이 그어지는데 그대로 쓰셔도 작동은 하고, legacy_createStore 쓰시면 취소선이 안나타납니다.
//store는 나의 data를 넣는 곳이다. 나의 state! (state는 나의 application에서 바뀌는 data를 말한다.)

//리덕스에는 createStore라는 함수가 있다.
//store가 하는 일은 기본적으로 나의 data를 넣을 수 있는 장소를 생성한다.
//그리고 그 데이터는 store라는 곳에 저장 되어야(go on) 한다.

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const reducer = () => {};

const store = createStore();
//createStore<any, Action<any>, any, any>(reducer: Reducer<any, Action<any>>, enhancer?:
//createStore 함수를 사용하려면 reducer가 있어야 한다. reducer는 함수(function)여야 한다.

let count = 0;
number.innerText = count;

const updateText = () => {
  number.innerText = count;
};

const handleAdd = () => {
  count = count + 1;
  updateText();
};

const handleMinus = () => {
  count = count - 1;
  updateText();
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
