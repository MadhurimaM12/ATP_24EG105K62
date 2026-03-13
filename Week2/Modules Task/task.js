import {validateTitle,validatePriority,validateDueDate} from './validator.js'


let tasks = []

// 1. Add new task
function addTask(title, priority, dueDate) {
// Validate using imported functions
// If valid, add to tasks array
// Return success/error message
   if(!validateTitle() && !validatePriority() && !validateDueDate())
   {
    return 'Invalid Taskk'
   }
   else {
    let task = {
        title,
        priority, 
        dueDate
    }
    tasks.push(task)
    return 'Task added successfully'
   }
 }
       
// 2. Get all tasks
function getAllTasks() {
 // Return all tasks
  return tasks
 }

 //3. Mark task as complete
 function completeTask(taskId) {
 // Find task and mark as complete
  let task = tasks.find(t=>t.id===taskId)
  if(task){
    task.completed = true
    return 'Task marked as complete'
  }
  else{
    return 'Task not found'
  }
  }
  export {addTask, getAllTasks, completeTask} 
