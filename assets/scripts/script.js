function login(){
    window.location.href = "todo.html";
    event.preventDefault();
}

function add_todo(){

    var user_input_element = document.getElementById("todo-input");

    var user_input = user_input_element.value;

    if(user_input.trim().length > 0){

        var table = document.getElementById("todo-table")
        
        var todo_row = table.insertRow();

        todo_row.classList.add('todo-row');

        var todo = todo_row.insertCell(0);
        
        todo.innerHTML += '<tr class="todo-row"><td><div class="todo"><div class="title">' + user_input + '</div><div class="date">Date: 3/7/2024</div></div><div class="todo-action"><div class="delete">DELETE</div><div class="done">DONE</div></div></td></tr>';

    }

    user_input_element.value = "";

    event.preventDefault();

}