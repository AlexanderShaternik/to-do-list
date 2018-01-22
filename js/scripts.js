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
let count = 0;
let todo = [];
let out = JSON.parse(localStorage.getItem("todo"));
console.log("out" ,out);

function Task(content,date,checked,id) {
	this.content = content,
	this.date    = date,
	this.checked = checked
	this.id      = count++
}
// unload from localSrorage
if(out != null ) { 
	for (let i = 0; i < out.length; i++) {
		let field 		    = document.querySelector('.add-task');
		let content 	    = field.value;
		let task_container 	= document.querySelector('.task-container');
		let date            = date_now.value;
		let arr_delete_task = document.querySelectorAll('.delete-task-btn');

		content = out[i].content;
		date = out[i].date ;
		let checked = false;
		checked = out[i].checked;

		// let invalid = date.split('.');
		// console.log(invalid);
		// if(( +invalid[0] < 1) || (31 < +invalid[0])  || isNaN(+invalid[0])) break;
		// if(( +invalid[1] < 1) || (12 < +invalid[1]) || isNaN(+invalid[1])) break;
		// if((2018> +invalid[2]) || isNaN(+invalid[2])) break;
		// if ( content == "" || date=="" ) break;

		let task_box   = document.createElement('div');
		let input      = document.createElement('input');
		let task       = document.createElement('p');
		let task_date  = document.createElement('p');
		let button_del = document.createElement('button');
		button_del.classList.add('delete-task-btn');
		task_box.classList.add('task-box');
		input.setAttribute('type','checkbox');
		task.textContent = content; 
		task_date.textContent =date;
		button_del.textContent = 'Удалить';
		task_box.dataset.id = count;
		// fill task_box with contents
		task_box.appendChild(input);
		task_box.appendChild(button_del);
		task_box.appendChild(task);
		task_box.appendChild(task_date);
			
		// console.log(task_box);

		task_container.appendChild(task_box);
		field.value = '';
		date_now.value = '';
			
		if (out[i].checked){
			input.checked = true;
			task_box.classList.add('active');
		} else {
			task_box.classList.remove('active');
		}

		input.addEventListener('click', checkTask);
		button_del.addEventListener('click', removeTask);
		
		let obj = new Task(content,date,checked);
		todo.push(obj);
		console.log("todo",todo);
		localStorage.setItem("todo",JSON.stringify(todo));
	}
			
}

function addTask() {
	// content from input.add-task, .date
	let field 		    = document.querySelector('.add-task');
	let content 	    = field.value;
	let task_container 	= document.querySelector('.task-container');
	let date            = date_now.value;
	let arr_delete_task = document.querySelectorAll('.delete-task-btn');

	// date check
	let invalid = date.split('.');
	if(( +invalid[0] < 1) || (31 < +invalid[0])  || isNaN(+invalid[0])) return;
	if(( +invalid[1] < 1) || (12 < +invalid[1]) || isNaN(+invalid[1])) return;
	if((2018> +invalid[2]) || isNaN(+invalid[2])) return;
	if ( content == "" || date=="" ) return;

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
	task_date.textContent = date;
	let checked = false;
	button_del.textContent = 'Удалить';
	task_box.dataset.id = count;
	// fill task_box with contents
	task_box.appendChild(input);
	task_box.appendChild(button_del);
	task_box.appendChild(task);
	task_box.appendChild(task_date);

	task_container.appendChild(task_box);
	field.value = '';
	date_now.value = '';
	
	input.addEventListener('click', checkTask);
	button_del.addEventListener('click', removeTask);
	
	let obj = new Task(content,date,checked);
	todo.push(obj);
	console.log(todo);
	localStorage.setItem("todo",JSON.stringify(todo));
}

// delete task
function removeTask() {
	let elem 	= this;
	let parent 	= elem.parentElement;
	let box 	= parent.parentElement;
	let id      = +parent.dataset.id;

	for (var i = 0; i < todo.length; i++) {
		if (todo[i].id==id){
			todo.splice(i,1);
			break;
		}
	}
	box.removeChild(parent);
	localStorage.setItem("todo",JSON.stringify(todo));
}

// line-through completed task
function checkTask() {
	let elem 	= this;
	let parent 	= elem.parentElement;
	let id      = +parent.dataset.id;

	for (let i = 0; i < todo.length; i++) {
		if(todo[i].id == id){
			if (elem.checked){
				todo[i].checked =true;
				parent.classList.add('active');

			} else {
				todo[i].checked = false;
				parent.classList.remove('active');

			}
		}
	}	
	localStorage.setItem("todo",JSON.stringify(todo));
}


