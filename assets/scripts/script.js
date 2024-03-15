function login(){
    window.location.href = "todo.html";
    event.preventDefault();
}

function add_todo(){

    var user_input_element = document.getElementById("todo-input");

    var user_input = user_input_element.value;

    var current_date = new Date();
    var day = current_date.getDate();
    var month = current_date.getMonth() + 1;
    var year = current_date.getFullYear();

    var formattedDate = (day < 10 ? '0' : '') + day + '-' + (month < 10 ? '0' : '') + month + '-' + year

    if(user_input.trim().length > 0){

        var table = document.getElementById("todo-table")
        
        var todo_row = table.insertRow();

        todo_row.classList.add('todo-row');

        var todo = todo_row.insertCell(0);
        
        todo.innerHTML += '<tr class="todo-row"><td><div class="todo"><div class="todo-header"><div class="date">Date: ' + formattedDate + '</div><div class="delete" onclick="delete_todo(this)"><i class="fas fa-trash"></i></div><div class="done"><i class="fas fa-check"></i></div></div><div class="title">' + user_input + '</div></div></td></tr>';

    }

    user_input_element.value = "";

    event.preventDefault();

}

function delete_todo(del_button){

    del_button.parentNode.parentNode.parentNode.parentNode.remove();

}