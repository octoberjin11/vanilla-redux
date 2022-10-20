import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

// state는 single source of truth이며, read-only이다
// store을 수정할 수 있는 유일한 방법은 action을 보내는 방법뿐이다.
// state를 mutate하지 말아야한다.
// mutating state하는 대신에 new state objects를 리턴해야 한다.
// (새로운 state를 create하고 그 새로운 state를 return 하는 걸 잊지 말아야 한다.)

// ...state ▷ state array안의 모든 content

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: action.id }];
    case DELETE_TODO:
      return [];
    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

const onSubmit = (e) => {
  e.preventDefault();

  const toDo = input.value;
  input.value = "";

  const toDate = Date.now();

  store.dispatch({ type: ADD_TODO, text: toDo, id: toDate });
};

form.addEventListener("submit", onSubmit);
