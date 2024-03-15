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

    var home_password = cookie_data.split("=")[1]

    if(user_input.trim().length > 0){

        var xhr = new XMLHttpRequest();

        var url = "http://127.0.0.1:5000/add_todo";

        var params = "todo=" + user_input + "&date=" + formattedDate + "&home_password=" + home_password;

        xhr.open("POST", url, true);

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        

        xhr.onreadystatechange = function(){
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){

                console.log('Todo Saved.')

            }
        }

        xhr.send(params)

    }

    user_input_element.value = "";

    event.preventDefault();

}

function delete_todo(del_button){

    del_button.parentNode.parentNode.parentNode.parentNode.remove(); //Remove Todo Row

}

function complete_todo(done_button){

    done_button.parentNode.parentNode.parentNode.parentNode.remove(); //Remove Todo Row

}