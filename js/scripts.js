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
console.log("todo" ,todo);

function Task(content,date,isChecked,id) {
	this.content   = content,
	this.date      = date,
	this.isChecked = isChecked,
	this.id        = count
}

// unload from localSrorage
if(out != null ) { 
	load()
}

function load(){
	let task_container 	= document.querySelector('.task-container');
	for (let i = 0; i < out.length; i++) {

		let task_box   = document.createElement('div');
		let input      = document.createElement('input');
		let task       = document.createElement('p');
		let task_date  = document.createElement('p');
		let button_del = document.createElement('button');

		content = out[i].content;
		date = out[i].date ;
		isChecked = out[i].isChecked;
		
		button_del.classList.add('delete-task-btn');
		task_box.classList.add('task-box');
		input.setAttribute('type','checkbox');
		task.textContent = content; 
		task_date.textContent =date;
		button_del.textContent = 'Удалить';
		// add data-id
		
		count = i;
		task_box.dataset.id = count;

		// fill task_box with contents
		task_box.appendChild(input);
		task_box.appendChild(button_del);
		task_box.appendChild(task);
		task_box.appendChild(task_date);
		// console.log(task_box);
		task_container.appendChild(task_box);
			
		if (out[i].isChecked){
			input.checked = true;
			task_box.classList.add('active');
		} else {
			task_box.classList.remove('active');
		}

		input.addEventListener('click', checkTask);
		button_del.addEventListener('click', removeTask);
		
	}
}		

function addTask() {
	// content from input.add-task, .date
	let field 		    = document.querySelector('.add-task');
	let content 	    = field.value;
	let task_container 	= document.querySelector('.task-container');
	let date            = date_now.value;
	let arr_delete_task = document.querySelectorAll('.delete-task-btn');
	let isChecked = false;

	task_container.innerHTML = "Задания";
	// date Check
	let invalid = date.split('.');
	if(( +invalid[0] < 1) || (31 < +invalid[0])  || isNaN(+invalid[0])) return;
	if(( +invalid[1] < 1) || (12 < +invalid[1]) || isNaN(+invalid[1])) return;
	if((2018> +invalid[2]) || isNaN(+invalid[2])) return;
	if ( content == "" || date=="" ) return;

	todo.content = content;
	todo.date = date ;
	todo.isChecked = isChecked;
	field.value = '';
	date_now.value = '';

	let obj = new Task(content,date,isChecked);
	todo.push(obj);
	localStorage.setItem("todo",JSON.stringify(todo));
	out = JSON.parse(localStorage.getItem("todo"));
	load();
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
				todo[i].isChecked =true;
				parent.classList.add('active');

			} else {
				todo[i].isChecked = false;
				parent.classList.remove('active');
			}
		}
	}	

	localStorage.setItem("todo",JSON.stringify(todo));
}



