import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

// store: Data 를 담는 저장소
// state: 변경이 필요한 Data
// reducer: Data 를 modify 하는 function

// **스토어에 리듀서 담기**
// const store = createStore(reducer);

const countModifier = (state = 0, action) => {
  //유일하게 data를 바꿀 수 있는 곳.
  //이 곳에서 return하는 모든 것은 data가 된다.
  //default로 data modifier(현재 코드의 countModifier)는 현재의 state와 함께 불려진다. (현재 코드의 state = 0)

  //Action : redux에서 function을 부를 때 쓰는 두 번째 parameter 혹은 argument으로 reducer와 소통하기 위한 방법

  console.log(state, action);

  if (action.type === "ADD") {
    return state + 1;
  } else if (action.type === "MINUS") {
    return state - 1;
  } else {
    return state;
  }
};

const countStore = createStore(countModifier);

//Reducer에게 Action을 보내는 방법 : store.dispatch({key: value});
countStore.dispatch({ type: "ADD" });
//dispatch와 함께 countModifier로 메세지를 보낸다.

countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "MINUS" });

console.log(countStore.getState());
