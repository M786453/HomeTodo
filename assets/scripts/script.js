
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

        var url = "https://maste3.pythonanywhere.com/add_todo";

        var params = "todo=" + user_input + "&date=" + formattedDate + "&home_password=" + home_password;

        xhr.open("POST", url, true);

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        

        xhr.onreadystatechange = function(){
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){

                location.reload();

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

    var url = "https://maste3.pythonanywhere.com/get_all_todos";

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

        todo_row.setAttribute('id',key);

        var todo = todo_row.insertCell(0);
        
        todo.innerHTML += '<tr class="todo-row"><td><div class="todo"><div class="todo-header"><div class="date">' + date + '</div><div class="done" onclick="complete_todo(this)"><i class="fas fa-check"></i></div></div><div class="title">' + todo_text + '</div></div></td></tr>';

    }

}

function complete_todo(done_button){

    row = done_button.parentNode.parentNode.parentNode.parentNode;

    var key = row.getAttribute('id');

    var cookie_data = document.cookie;

    var home_password = cookie_data.split("=")[1]

    var xhr = new XMLHttpRequest();

    var url = "https://maste3.pythonanywhere.com/complete_todo";

    var params = "home_password=" + home_password + "&key=" + key;

    xhr.open('POST', url, true);

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function(){

        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){

            location.reload();

        }

    }

    xhr.send(params)

}