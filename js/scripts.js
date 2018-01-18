// Добавление таска
var add_task = document.querySelector('.add-task-btn');
add_task.addEventListener('click', addTask);

document.addEventListener("keydown", function(event) {
  if (event.keyCode==13) {
     addTask()
  }
})

// дата
var now = new Date();
var date_now = document.querySelector('.date');
date_now.placeholder= +now.getDate()+'.'+now.getMonth()+1+'.' +now.getFullYear();

// console.log(add_task,date_now);

function addTask() {
	// контент из input.add-task,.date
	var field 		    = document.querySelector('.add-task');
	var content 	    = field.value;
	var task_container 	= document.querySelector('.task-container');
	var date_content    = date_now.value;

	// console.log(content,date_content );

	if ( content == ""|| date_content=="" ) return;

	// создать task_box и его содержимое
	var task_box   = document.createElement('div');
	var input      = document.createElement('input');
	var task       = document.createElement('p');
	var task_date  = document.createElement('p');
	var button_del = document.createElement('button');
	button_del.classList.add('delete-task-btn');
	task_box.classList.add('task-box');
	input.setAttribute('type','checkbox');
	task.textContent = content; 
	task_date.textContent =date_content;
	button_del.textContent = 'Удалить';
	// наполняем task_box
	task_box.appendChild(input);
	task_box.appendChild(button_del);
	task_box.appendChild(task);
	task_box.appendChild(task_date);
	
	console.log(task_box);
	//выводим  task_box
	task_container.appendChild(task_box);
	field.value = '';
	date_now.value = '';
	
	input.addEventListener('click', checkTask);

	
	var arr_delete_task = document.querySelectorAll('.delete-task-btn');
	console.log(arr_delete_task)	
	for (var i = 0; i < arr_delete_task.length; i++) {
		arr_delete_task[i].addEventListener('click', removeTask);
	}
}

// Удаление таска

function removeTask() {
	var elem 	= this;
	var parent 	= elem.parentElement;
	var box 	= parent.parentElement;
	box.removeChild(parent);
}

// зачеркиваем выполненый таск
function checkTask() {
	var elem 	= this;
	var parent 	= elem.parentElement;
	if ( elem.checked ) {
		parent.classList.add('active');
	} else {
		parent.classList.remove('active');
	}

}