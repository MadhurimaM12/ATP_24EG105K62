// import { validateTitle, validatePriority, validateDueDate } from './validator.js';
// 1. Validate task title (not empty, min 3 chars)
function validateTitle(title) {
    // Your code here
    if (!title) {
        return 'title required'
    }
    if (title.length <= 3) {
        return 'Minimum 3 characters are required'
    }
    return 'Title is Valid'
}
// 2. Validate priority (must be: low, medium, high)
function validatePriority(priority) {
    // Your code here
    let validPrioities = ['Low', 'Medium', 'High']
    if (!priority) {
        return 'Priority is required'
    }
    if (!validPrioities.includes(priority)) {
        return 'Priority must be Low, Medium or High'
    }
    return 'Priority is Valid'
}

// 3. Validate due date (must be future date)
function validateDueDate(date) {
    //Your code here
    let dueDate = new Date('2025-10-12')
    let today = new Date()
    if (dueDate > today) {
        return 'Invalid Due Date'
    }
    return true
}

export { validateTitle, validatePriority, validateDueDate }