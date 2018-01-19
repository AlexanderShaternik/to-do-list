// event tracking
let add_task = document.querySelector('.add-task-btn');
add_task.addEventListener('click', addTask);

document.addEventListener("keydown", function(event) {
  if (event.keyCode==13) {
     addTask()
  }
})

// date
let now = new Date();
let date_now = document.querySelector('.date');
date_now.placeholder= +now.getDate()+'.'+now.getMonth()+1+'.' +now.getFullYear();
// console.log(add_task,date_now);

function addTask() {
	// content from input.add-task, .date
	let field 		    = document.querySelector('.add-task');
	let content 	    = field.value;
	let task_container 	= document.querySelector('.task-container');
	let date_content    = date_now.value;

	// date check
	let invalid = date_content.split('.');
	console.log(+invalid[0],invalid[1],invalid[2]);
	if((32 < +invalid[0] < 0) || isNaN(+invalid[0])) return;
	if(13 < +invalid[1] < 0 || isNaN(+invalid[1])) return;
	if(2018> +invalid[2] || isNaN(+invalid[2])) return;
	// if((invalid[0] == undefined) || (invalid[1] == undefined) || (invalid[2] == undefined) ) return;
	
	if ( content == "" || date_content=="" ) return;

	// сreate task_box
	let task_box   = document.createElement('div');
	let input      = document.createElement('input');
	let task       = document.createElement('p');
	let task_date  = document.createElement('p');
	let button_del = document.createElement('button');
	button_del.classList.add('delete-task-btn');
	task_box.classList.add('task-box');
	input.setAttribute('type','checkbox');
	task.textContent = content; 
	task_date.textContent =date_content;
	button_del.textContent = 'Удалить';
	// fill task_box with contents
	task_box.appendChild(input);
	task_box.appendChild(button_del);
	task_box.appendChild(task);
	task_box.appendChild(task_date);
	
	console.log(task_box);

	task_container.appendChild(task_box);
	field.value = '';
	date_now.value = '';
	
	input.addEventListener('click', checkTask);

	let arr_delete_task = document.querySelectorAll('.delete-task-btn');
	console.log(arr_delete_task)	
	for (let i = 0; i < arr_delete_task.length; i++) {
		arr_delete_task[i].addEventListener('click', removeTask);
	}
}

// delete task
function removeTask() {
	let elem 	= this;
	let parent 	= elem.parentElement;
	let box 	= parent.parentElement;
	box.removeChild(parent);
}

// line-through completed task
function checkTask() {
	let elem 	= this;
	let parent 	= elem.parentElement;
	if ( elem.checked ) {
		parent.classList.add('active');
	} else {
		parent.classList.remove('active');
	}

}