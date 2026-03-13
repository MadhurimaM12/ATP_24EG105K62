                  // TODO: Import task functions
                  // import { ... } from './task.js';
                  // Test your module system
                  // 1. Add some tasks
                  // 2. Display all tasks
                  // 3. Complete a task
                  // 4. Display all tasks again
import {addTask, getAllTasks, completeTask} from './task.js'

console.log(addTask("Eating", "High", "2024-07-01"))
console.log(addTask("Finish project report", "Medium", "2024-07-05"))
console.log(addTask("Talking", "Low", "2024-07-03"))
console.log(getAllTasks())
console.log(completeTask(1))
console.log(getAllTasks())      
