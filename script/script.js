'use strict';


const todoControl = document.querySelector('.todo-control'), 
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');


const todoData = [];  

const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';
    
    todoData.forEach(function(item, i, todoData){
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
            '<div class="todo-buttons">' + 
                '<button class="todo-remove"></button>' + 
                '<button class="todo-complete"></button>' + 
            '</div>';

        if(item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }
        
        headerInput.value = '';
        
        localStorage.setItem('localTodoData', JSON.stringify(todoData));

        const btnTodoComplete = li.querySelector('.todo-complete');

        btnTodoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        });
        const btnRemove = li.querySelector('.todo-remove');

        btnRemove.addEventListener('click', function() {
            todoData.splice(i, 1);
            localStorage.removeItem('localTodoData');
            render();

        });
        
    });
};


todoControl.addEventListener('submit', function(event){
    event.preventDefault();
    if (headerInput.value !== '') {
    let newTodo = {
        value: headerInput.value,
        completed: false

    };

    todoData.push(newTodo);

    render();
    }
});

todoControl.addEventListener('submit', function(event){
    event.preventDefault();

    if (event.keyCode === 13 || headerInput.value !== '') {

    let newTodo = {
        value: headerInput.value,
        completed: false

    };

    todoData.push(newTodo);
    
    render();
}
});

document.addEventListener("DOMContentLoaded", function() {
    let load = JSON.parse(localStorage.getItem("localTodoData"));
    if (load !== null) {
      load.forEach(function(item) {
        todoData.push(item);
    });
    }

    render();
});

render();