const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos"

let toDos = [];

function deleteToDo(event) {   //투두리스트의 버튼을 지우는 함수
    const btn = event.target; //클릭한 해당 버튼의 엘리먼트를 찾는다.
    const li = btn.parentNode; //버튼의 부모를 찾아서 <li> 태그의 아이디를 찾는다.
    toDoList.removeChild(li); //부모의 정보인 li 변수를 찾아서 삭제한다.\
    const cleanToDos = toDos.filter(function(toDo){  // toDos가 무엇인지 toDo가 무엇인지 정확하게 개념을 못잡고 있음. toDo 변수가 lodedToDos()에 선언이 되어 있는데 함수 내의 변수가 타 함수에 사용가능?
        console.log(toDo.id, li.id);  // toDo와 li 의 id 값을 알기 위해 삽입한 코드
        return toDo.id !== parseInt(li.id); // 상단에서 <li>의 아이디 값은 삭제할 아이디 값이 선택되어 있고, toDos.filter 를 통하여 모든 저장된 객체를 비교하여 아이디가 같지 않은(즉, 삭제되지 않은) 객체의 값들을 cleanToDo로 값을 반환하여 새로운 배열을 생성한다.
    });
    toDos = cleanToDos; // toDos의 값은 현재 삭제된 id가 반영되지 않았으므로 cleanToDos의 값으로 리뉴얼 해준다.
    saveToDos(); // 그리고 로컬스트로지에 다시 리뉴얼 된 값을 저장한다. 내가 지금 부족한 부분은 변수의 적용범위와 함수의 argument가 사용될 때 어떤 의미인지 파악이 필요하다. 
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));  // toDos라는 배열내에 저장된 객체들을 스트링화 하여 로컬스트로지에 저장한다. 
}

function paintToDo(text) {
    const li = document.createElement("li"); //<li> 태그를 생성한다. 
    const delBtn = document.createElement("button"); //<button> 태그를 생성한다. 
    const span = document.createElement("span"); //<span>태그를 생성한다. 
    const newId = toDos.length +1; //데이타의 수에 1을 더하여 아이디 값을 자연수로 만들어 준다.
    delBtn.innerText = "❌"; //x 아이콘을 삽입한다.
    delBtn.addEventListener("click", deleteToDo); //클릭 이벤트가 일어나면 deleteToDo 함수를 실행한다. 
    span.innerText = text; // <span> 태그에 'text' 인자값을 넣는다.
    li.appendChild(delBtn); //<li>자식의 마지막에 delBtn 변수에 정의된 요소를 넣는다.
    li.appendChild(span); // <li> 자식의 마지막에 span 변수에 정의된 요소를 넣는다. 
    li.id = newId; // 생성될 아이디 값을 변수로 만든다.
    toDoList.appendChild(li); // 완성된 <li> 태그를 <ul> 태그에 삽입
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj); // toDos에 객체의 형태로 아이디 값과 내용을 생성하여 상단의 toDos 배열 내에 저장
    saveToDos();
}



function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();
