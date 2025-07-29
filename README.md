# Todo App

A beautiful, feature-rich Todo application that helps you organize your tasks and stay productive.

## Features

### 📝 Task Management
- **Add Tasks**: Create tasks with titles, descriptions, due dates, and times
- **Priority Levels**: Set task priority (High, Medium, Low) with color coding
- **Task Completion**: Mark tasks as complete with visual indicators
- **Edit Tasks**: Modify existing tasks with an intuitive modal interface
- **Delete Tasks**: Remove tasks with confirmation prompts

### 🎯 Organization & Filtering
- **Smart Filters**: View All, Pending, Completed, or Overdue tasks
- **Search Functionality**: Find tasks quickly with real-time search
- **Task Statistics**: View total, pending, and completed task counts
- **Overdue Detection**: Automatic detection and highlighting of overdue tasks

### 🎨 Beautiful Design
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Color-coded Priorities**: Visual priority indicators for better organization
- **Gradient Backgrounds**: Beautiful gradient design with glassmorphism effects
- **Dark/Light Contrast**: Easy-to-read text with proper contrast ratios

### 💾 Data Persistence
- **Local Storage**: All tasks are saved locally in your browser
- **Offline Functionality**: Works offline with service worker implementation
- **Data Export**: Export your tasks to JSON format for backup
- **Data Import**: Import tasks from JSON files

### ⚡ Advanced Features
- **Date Validation**: Prevents setting due dates in the past
- **Time Formatting**: Smart time display (Today, Tomorrow, or specific dates)
- **Notification System**: Success and error notifications for user actions
- **Keyboard Shortcuts**: Enhanced accessibility with proper form handling
- **Animation Effects**: Smooth transitions and micro-interactions

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs entirely in the browser

### Installation
1. Download or clone the project files
2. Open `index.html` in your web browser
3. Start organizing your tasks!

### File Structure
```
Todo/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
├── sw.js              # Service worker for offline functionality
└── README.md          # This file
```

## Usage

### Adding a Task
1. Fill in the task title (required)
2. Optionally set a due date and time
3. Choose a priority level (Low, Medium, High)
4. Add a description if needed
5. Click "Add Task"

### Managing Tasks
- **Complete a task**: Check the checkbox next to the task
- **Edit a task**: Click the edit icon to modify task details
- **Delete a task**: Click the trash icon to remove the task
- **Filter tasks**: Use the filter buttons to view specific task types
- **Search tasks**: Type in the search box to find specific tasks

### Keyboard Navigation
- Tab through form fields and buttons
- Enter to submit forms
- Escape to close modals

## Browser Compatibility

- ✅ Chrome 70+
- ✅ Firefox 65+
- ✅ Safari 12+
- ✅ Edge 79+

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with Grid, Flexbox, and animations
- **Vanilla JavaScript**: No frameworks - pure JavaScript ES6+
- **Local Storage API**: Browser-based data persistence
- **Service Workers**: Offline functionality
- **Web Fonts**: Inter font family from Google Fonts
- **Font Awesome**: Icons for enhanced UI

### Key Features Implementation
- **Responsive Design**: CSS Grid and Flexbox for layout
- **Data Persistence**: localStorage for client-side data storage
- **Date/Time Handling**: Native JavaScript Date objects
- **Modal System**: Custom modal implementation with backdrop
- **Search & Filter**: Real-time filtering with multiple criteria
- **Notifications**: Custom notification system with animations

## Customization

### Changing Colors
Edit the CSS custom properties in `styles.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #10b981;
    --danger-color: #ef4444;
    --warning-color: #f59e0b;
}
```

### Adding New Priority Levels
1. Update the priority select options in `index.html`
2. Add corresponding CSS classes in `styles.css`
3. No JavaScript changes needed

### Extending Functionality
The modular JavaScript class structure makes it easy to add new features:
- Add new methods to the `TodoApp` class
- Extend the task object structure
- Implement additional filters or sorting options

## Contributing

This is a standalone project, but feel free to:
- Report bugs or suggest improvements
- Fork the project for your own modifications
- Submit pull requests for enhancements

## License

This project is open source and available under the MIT License.

## Support

For questions or issues:
1. Check the browser console for error messages
2. Ensure JavaScript is enabled in your browser
3. Try clearing browser cache and localStorage
4. Verify all files are in the same directory

---

**Happy Task Managing! 📋✨**
