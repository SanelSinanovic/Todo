// Todo App JavaScript
class TodoApp {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('todoTasks')) || [];
        this.currentFilter = 'all';
        this.editingTaskId = null;
        
        this.initializeEventListeners();
        this.renderTasks();
        this.updateStats();
        this.setMinDate();
    }

    // Initialize all event listeners
    initializeEventListeners() {
        // Task form submission
        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchTasks(e.target.value);
        });

        // Modal controls
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('cancelEdit').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('editTaskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveEditedTask();
        });

        // Close modal when clicking outside
        document.getElementById('editModal').addEventListener('click', (e) => {
            if (e.target.id === 'editModal') {
                this.closeModal();
            }
        });
    }

    // Set minimum date to today
    setMinDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('taskDate').setAttribute('min', today);
        document.getElementById('editTaskDate').setAttribute('min', today);
    }

    // Add a new task
    addTask() {
        const title = document.getElementById('taskTitle').value.trim();
        const date = document.getElementById('taskDate').value;
        const time = document.getElementById('taskTime').value;
        const priority = document.getElementById('taskPriority').value;
        const description = document.getElementById('taskDescription').value.trim();

        if (!title) {
            this.showNotification('Please enter a task title', 'error');
            return;
        }

        const task = {
            id: Date.now().toString(),
            title,
            description,
            date,
            time,
            priority,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.unshift(task);
        this.saveTasks();
        this.clearForm();
        this.renderTasks();
        this.updateStats();
        this.showNotification('Task added successfully!', 'success');

        // Add animation class to new task
        setTimeout(() => {
            const newTaskElement = document.querySelector(`[data-task-id="${task.id}"]`);
            if (newTaskElement) {
                newTaskElement.classList.add('just-added');
                setTimeout(() => {
                    newTaskElement.classList.remove('just-added');
                }, 300);
            }
        }, 100);
    }

    // Clear the form
    clearForm() {
        document.getElementById('taskForm').reset();
        document.getElementById('taskPriority').value = 'medium';
    }

    // Delete a task
    deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(task => task.id !== taskId);
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            this.showNotification('Task deleted successfully!', 'success');
        }
    }

    // Toggle task completion
    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            
            const message = task.completed ? 'Task completed!' : 'Task marked as pending';
            this.showNotification(message, 'success');
        }
    }

    // Open edit modal
    editTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;

        this.editingTaskId = taskId;
        
        // Populate edit form
        document.getElementById('editTaskTitle').value = task.title;
        document.getElementById('editTaskDate').value = task.date;
        document.getElementById('editTaskTime').value = task.time;
        document.getElementById('editTaskPriority').value = task.priority;
        document.getElementById('editTaskDescription').value = task.description;

        // Show modal
        document.getElementById('editModal').classList.add('active');
    }

    // Save edited task
    saveEditedTask() {
        const task = this.tasks.find(t => t.id === this.editingTaskId);
        if (!task) return;

        const title = document.getElementById('editTaskTitle').value.trim();
        if (!title) {
            this.showNotification('Please enter a task title', 'error');
            return;
        }

        task.title = title;
        task.date = document.getElementById('editTaskDate').value;
        task.time = document.getElementById('editTaskTime').value;
        task.priority = document.getElementById('editTaskPriority').value;
        task.description = document.getElementById('editTaskDescription').value.trim();

        this.saveTasks();
        this.closeModal();
        this.renderTasks();
        this.showNotification('Task updated successfully!', 'success');
    }

    // Close modal
    closeModal() {
        document.getElementById('editModal').classList.remove('active');
        this.editingTaskId = null;
    }

    // Set filter
    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.renderTasks();
    }

    // Search tasks
    searchTasks(query) {
        this.renderTasks(query.toLowerCase());
    }

    // Check if task is overdue
    isTaskOverdue(task) {
        if (!task.date || task.completed) return false;
        
        const now = new Date();
        const taskDateTime = new Date(`${task.date}T${task.time || '23:59'}`);
        return taskDateTime < now;
    }

    // Filter tasks based on current filter and search query
    getFilteredTasks(searchQuery = '') {
        let filtered = this.tasks;

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(task => 
                task.title.toLowerCase().includes(searchQuery) ||
                task.description.toLowerCase().includes(searchQuery)
            );
        }

        // Apply status filter
        switch (this.currentFilter) {
            case 'pending':
                filtered = filtered.filter(task => !task.completed);
                break;
            case 'completed':
                filtered = filtered.filter(task => task.completed);
                break;
            case 'overdue':
                filtered = filtered.filter(task => this.isTaskOverdue(task));
                break;
        }

        return filtered;
    }

    // Render tasks
    renderTasks(searchQuery = '') {
        const tasksList = document.getElementById('tasksList');
        const emptyState = document.getElementById('emptyState');
        const filteredTasks = this.getFilteredTasks(searchQuery);

        if (filteredTasks.length === 0) {
            tasksList.style.display = 'none';
            emptyState.style.display = 'block';
            
            if (searchQuery) {
                emptyState.innerHTML = `
                    <i class="fas fa-search"></i>
                    <h3>No tasks found</h3>
                    <p>Try adjusting your search terms</p>
                `;
            } else if (this.currentFilter !== 'all') {
                emptyState.innerHTML = `
                    <i class="fas fa-filter"></i>
                    <h3>No ${this.currentFilter} tasks</h3>
                    <p>No tasks match the current filter</p>
                `;
            } else {
                emptyState.innerHTML = `
                    <i class="fas fa-clipboard-list"></i>
                    <h3>No tasks yet</h3>
                    <p>Add your first task to get started!</p>
                `;
            }
            return;
        }

        tasksList.style.display = 'block';
        emptyState.style.display = 'none';

        tasksList.innerHTML = filteredTasks.map(task => {
            const isOverdue = this.isTaskOverdue(task);
            const taskClass = task.completed ? 'completed' : (isOverdue ? 'overdue' : '');
            
            return `
                <div class="task-item ${taskClass}" data-task-id="${task.id}">
                    <div class="task-header">
                        <div>
                            <div class="task-title">${this.escapeHtml(task.title)}</div>
                            <div class="task-meta">
                                ${task.date ? `
                                    <span class="task-date">
                                        <i class="fas fa-calendar"></i>
                                        ${this.formatDate(task.date)}
                                    </span>
                                ` : ''}
                                ${task.time ? `
                                    <span class="task-time">
                                        <i class="fas fa-clock"></i>
                                        ${this.formatTime(task.time)}
                                    </span>
                                ` : ''}
                                <span class="task-priority ${task.priority}">
                                    <i class="fas fa-flag"></i>
                                    ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                </span>
                                ${isOverdue ? `
                                    <span class="task-date" style="color: #dc2626;">
                                        <i class="fas fa-exclamation-triangle"></i>
                                        Overdue
                                    </span>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                    
                    ${task.description ? `
                        <div class="task-description">${this.escapeHtml(task.description)}</div>
                    ` : ''}
                    
                    <div class="task-actions">
                        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                               onchange="app.toggleTask('${task.id}')">
                        <button class="task-btn edit" onclick="app.editTask('${task.id}')" title="Edit task">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="task-btn delete" onclick="app.deleteTask('${task.id}')" title="Delete task">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Update statistics
    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(task => task.completed).length;
        const pending = total - completed;

        document.getElementById('totalTasks').textContent = total;
        document.getElementById('completedTasks').textContent = completed;
        document.getElementById('pendingTasks').textContent = pending;
    }

    // Format date for display
    formatDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return 'Tomorrow';
        } else {
            return date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
            });
        }
    }

    // Format time for display
    formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Save tasks to localStorage
    saveTasks() {
        localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
    }

    // Show notification
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 
                        type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 
                        'linear-gradient(135deg, #6366f1, #8b5cf6)'};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            z-index: 1001;
            font-weight: 500;
            font-family: 'Inter', sans-serif;
            animation: slideInNotification 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: 350px;
            border: 1px solid ${type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 
                                type === 'error' ? 'rgba(239, 68, 68, 0.3)' : 
                                'rgba(99, 102, 241, 0.3)'};
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            gap: 12px;
        `;
        
        // Add icon based on type
        const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : '💬';
        notification.innerHTML = `<span style="font-size: 18px;">${icon}</span><span>${message}</span>`;
        
        document.body.appendChild(notification);

        // Add animation keyframes if not already added
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInNotification {
                    from { 
                        transform: translateX(100%) scale(0.8); 
                        opacity: 0; 
                    }
                    to { 
                        transform: translateX(0) scale(1); 
                        opacity: 1; 
                    }
                }
                @keyframes slideOutNotification {
                    from { 
                        transform: translateX(0) scale(1); 
                        opacity: 1; 
                    }
                    to { 
                        transform: translateX(100%) scale(0.8); 
                        opacity: 0; 
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Remove notification after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutNotification 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 400);
        }, 4000);
    }

    // Export tasks to JSON
    exportTasks() {
        const dataStr = JSON.stringify(this.tasks, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `todo-tasks-${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }

    // Import tasks from JSON
    importTasks(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedTasks = JSON.parse(e.target.result);
                if (Array.isArray(importedTasks)) {
                    this.tasks = [...this.tasks, ...importedTasks];
                    this.saveTasks();
                    this.renderTasks();
                    this.updateStats();
                    this.showNotification('Tasks imported successfully!', 'success');
                } else {
                    this.showNotification('Invalid file format', 'error');
                }
            } catch (error) {
                this.showNotification('Error reading file', 'error');
            }
        };
        reader.readAsText(file);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new TodoApp();
});

// Service Worker registration for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
