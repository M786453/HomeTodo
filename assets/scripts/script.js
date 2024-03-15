
window.onload = function(){
    load_todos()
}


function login(){
    
    var password = document.getElementById('password').value

    document.cookie = "home_password=" + password + "; SameSite=Strict;path=/;secure";

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

    var formattedDate = (day < 10 ? '0' : '') + day + '-' + (month < 10 ? '0' : '') + month + '-' + year;

    var cookie_data = document.cookie;

    var home_password = cookie_data.split("=")[1];

    if(user_input.trim().length > 0){

        var xhr = new XMLHttpRequest();

        var url = "http://127.0.0.1:5000/add_todo";

        var params = "todo=" + user_input + "&date=" + formattedDate + "&home_password=" + home_password;

        xhr.open("POST", url, true);

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        

        xhr.onreadystatechange = function(){
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){

                json_response = JSON.parse(xhr.responseText);

                update_page(json_response);

            }
        }

        xhr.send(params)

    }

    user_input_element.value = "";

    event.preventDefault();

}

function load_todos(){

    var cookie_data = document.cookie;

    var home_password = cookie_data.split("=")[1];

    var xhr = new XMLHttpRequest();

    var url = "http://127.0.0.1:5000/get_all_todos";

    var params = "home_password=" + home_password;

    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xhr.onreadystatechange = function(){
        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){

            json_response = JSON.parse(xhr.responseText);

            update_page(json_response);

        }
    }

    xhr.send(params)

}

function update_page(json_response){

    for( var key in json_response){

        var todo_text = json_response[key].todo;

        var date = json_response[key].date;

        var table = document.getElementById("todo-table");

        var todo_row = table.insertRow();

        todo_row.classList.add('todo-row');

        var todo = todo_row.insertCell(0);
        
        todo.innerHTML += '<tr class="todo-row"><td><div class="todo"><div class="todo-header"><div class="date">Date: ' + date + '</div><div class="delete" onclick="delete_todo(this)"><i class="fas fa-trash"></i></div><div class="done" onclick="complete_todo(this)"><i class="fas fa-check"></i></div></div><div class="title">' + todo_text + '</div></div></td></tr>';

    }

}

function delete_todo(del_button){

    del_button.parentNode.parentNode.parentNode.parentNode.remove(); //Remove Todo Row

}

function complete_todo(done_button){

    done_button.parentNode.parentNode.parentNode.parentNode.remove(); //Remove Todo Row

}