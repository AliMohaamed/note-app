# Note App - Backend API

## Overview
The **Note App** is a backend API designed for a simple, user-based note-taking system. Users can create, update, and manage their notes. Each note can be marked as complete (`true`) or incomplete (`false`), and users can toggle this status as needed.

---

## Technologies Used
- **Node.js**
- **Express.js**
- **MongoDB**

---

## Features
- **User Authentication**: Register and login functionality with secure password handling.
- **Personalized Notes**: Users can create, read, update, and delete notes tied to their account.
- **Status Toggling**: Each note has a completion status that can be updated.
- **Security**: Secured APIs using **Bearer Tokens**.
- **Password Encryption**: Passwords are securely hashed using **bcryptjs**.
- **Error Handling**: Comprehensive error management to handle various scenarios like authentication errors, invalid tokens, and more.

---

## API Endpoints

### User Authentication APIs
- **`POST /createUser`**: Register a new user.
  - **Request Body**: `{ name, email, password }`
  - **Description**: Encrypts and saves the user's password using **bcryptjs**.

- **`POST /login`**: Authenticate a user and receive a token.
  - **Request Body**: `{ email, password }`
  - **Response**: Returns a **Bearer Token** upon successful login.

- **`GET /profile`**: Retrieve the logged-in user's profile.
  - **Headers**: `Authorization: Bearer <token>`
  - **Response**: User's profile information.

- **`DELETE /deleteUser`**: Delete the logged-in user's account.
  - **Headers**: `Authorization: Bearer <token>`

### Note Management APIs
- **`POST /createNote`**: Create a new note for the user.
  - **Headers**: `Authorization: Bearer <token>`
  - **Request Body**: `{ content, isComplete (optional) }`
  - **Description**: Saves a new note associated with the user.

- **`GET /getUserNotes`**: Retrieve all notes for the user.
  - **Headers**: `Authorization: Bearer <token>`
  - **Response**: List of all user notes.

- **`PUT /updateNote/:id`**: Update a specific note's content or toggle its completion status.
  - **Headers**: `Authorization: Bearer <token>`
  - **Request Body**: `{ content, isComplete }`

- **`PUT /toggleComplete/:id`**: Toggle the completion status of a specific note.
  - **Headers**: `Authorization: Bearer <token>`
  - **Description**: Toggles `isComplete` between `true` and `false`.

- **`DELETE /deleteNote/:id`**: Delete a specific note.
  - **Headers**: `Authorization: Bearer <token>`

---

## Error Handling
The API uses custom error handling to provide informative messages and status codes for different types of errors, including:
- **Authentication errors** for invalid credentials or expired tokens.
- **Validation errors** for incorrect or missing data.

---

## Installation and Setup

1. **Clone the Project**:
   ```bash
   git clone https://github.com/AliMohaamed/note-app.git
   cd note-app
2. **Install Dependencies**:
   ```bash
   npm install
3. **Environment Variables**:
   Create a `.env` file in the root of the project and add the following:
   ```plaintext
   PORT=3000
   SLATROUNDS=8
   TOKENKEY=secretkey
   BEARERKEY=Bearer__
2. **Run the Application**:
   ```bash
   npm start
