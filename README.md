
# PeopleHub - Employee Management Dashboard

## About the Project

PeopleHub is a React-based Employee Management Dashboard designed to display employee information and allow users to enter new employee details through a simple, user-friendly interface.

## Features

- Dashboard displaying employee records
- Fetches sample employee data from a REST API
- Displays employee ID, name, email, designation, location, and salary
- Search employees by name or email
- Employee form with required fields
- Add new employee details to the dashboard
- Navigation using React Router
- Responsive interface with custom CSS styling

## Technologies Used

- React.js
- JavaScript
- HTML5
- CSS3
- Bootstrap
- React Router
- JSONPlaceholder API
- Vite

## Employee Form Fields

- Name
- Designation
- Location
- Salary

## API Used

https://jsonplaceholder.typicode.com/users

The API provides sample user information. Designation and salary values for existing sample users are assigned for demonstration purposes.

## How to Run the Project

1. Install Node.js on your computer.
2. Clone or download this repository.
3. Open the project folder in VS Code.
4. Open a terminal in the project folder.
5. Install the dependencies:

   ```bash
   npm install
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Open the local URL shown in the terminal.

## Note

New employee entries are stored temporarily in the application's React state. They are not permanently saved to a database and may disappear when the page is refreshed.

## Author

Alenashajan
