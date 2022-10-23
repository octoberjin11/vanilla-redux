import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

// reducer 위에 위치. 오로지 action만을 return.
const addToDo = (text, id) => {
  return {
    type: ADD_TODO,
    text,
    id,
  };
};
const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

// state는 single source of truth이며, read-only이다
// store을 수정할 수 있는 유일한 방법은 action을 보내는 방법뿐이다.
// state를 mutate하지 말아야한다.
// mutating state하는 대신에 new state objects를 리턴해야 한다.
// (새로운 state를 create하고 그 새로운 state를 return 하는 걸 잊지 말아야 한다.)

// ...state ▷ state array안의 모든 content

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      //return [...state, { text: action.text, id: action.id }];
      //새로운 array를 return 하고 있기 때문에 이 array가 보이는 방식을 수정할 수 있다.
      //그래서 { text: action.text, id: action.id }을 마지막에 두는 대신에 앞으로 옮긴다.
      //이러면 새로운 todo가 array의 첫 부분에 있게 된다.

      const newToDoObj = { text: action.text, id: action.id };
      return [newToDoObj, ...state];

    case DELETE_TODO:
      //state를 mutate 하지 않고 새로운 array를 return 해야한다.
      //삭제할 object를 빼고서 새로운 array를 만들자.
      //filter 함수로 새로운 array를 return 함

      const cleaned = state.filter((toDo) => toDo.id !== action.id);
      return cleaned;
    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

const dispatchAddToDo = (text, toDate) => {
  //store.dispatch({ type: ADD_TODO, text: text, id: toDate });
  //property shorthand 으로 인해 text: text를 text로 생략해서 작성할 수 있다.
  //https://pro-self-studier.tistory.com/33
  //store.dispatch({ type: ADD_TODO, text, id: toDate });

  if (text) {
    store.dispatch(addToDo(text, toDate));
    //console.log("+");
  }
};

const dispatchDeleteToDo = (e) => {
  //HTML로부터 받아오는 id는 아마 String의 형태일테니 문자열을 숫자로 변환하는 함수인 parseInt을 사용한다.
  const id = parseInt(e.target.parentNode.id);
  //store.dispatch({ type: DELETE_TODO, id: id });
  store.dispatch(deleteToDo(id));
};

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = ""; //매번 store가 바뀔때마다 const toDos = store.getState(); 여기다 모든 것들을 repainting 하기 때문에 li가 중복으로 나오는 것을 방지하기 위해 이와 같은 코드를 추가한다.

  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

//filter() 는 테스트를 통과한 모든 element들로 새로운 array를 만든다

store.subscribe(paintToDos);

const onSubmit = (e) => {
  e.preventDefault();

  const toDo = input.value;
  input.value = "";

  const toDate = Date.now();

  dispatchAddToDo(toDo, toDate);
};

form.addEventListener("submit", onSubmit);
