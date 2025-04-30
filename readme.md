# GreenPost - Social Networking Service

GreenPost is a social networking application that allows users to share posts, photos, and comments while interacting with other users. The project aims to provide an intuitive and user-friendly interface for both users and administrators.

## Features

### User Features:
- **Authentication**: User login and registration using JSON Web Tokens.
- **Post Management**: Create, edit, and delete posts.
- **Photo Uploads**: Add photos to posts.
- **Commenting**: Add and delete comments on posts.
- **Likes**: Like posts and comments.
- **User Profiles**: View profiles of other users.

### Admin Panel:
- **Content Moderation**: Edit and delete posts and comments.
- **User Management**: Edit and delete user accounts.

## Technologies and Tools

### Backend:
- **Node.js**: Server-side runtime environment.
- **Express.js**: Backend framework for building APIs.
- **JSON Web Token (JWT)**: Authentication mechanism.
- **Express Validator**: Input data validation.
- **MySQL**: Relational database, managed with Sequelize ORM.

### Frontend:
- **React 18**: For building the user interface.
- **React Router**: Frontend routing for navigation.
- **Formik + Yup**: Form handling and validation.
- **React-Toastify**: Notifications for user actions.
- **Axios**: For making HTTP requests.

### Docker:
- **Docker Compose**: Simplifies the management of application containers.

## Getting Started

Follow these steps to set up and run the project locally:

### Clone the Repository

```bash
git clone https://github.com/JacKoz7/GreenPost.git
cd GreenPost
```

### Run the Application with Docker

**Build and start the application:**

```bash
docker compose up --build
```

**Stop the application:**

```bash
docker compose down
```

### Access the Application

Once the application is running, you can access the frontend at:

[http://localhost:3000](http://localhost:3000)

## Screenshots

<table>
  <tr>
    <td><img width="720" alt="GreenPost login" src="https://github.com/user-attachments/assets/47356428-6770-4fa0-9b86-3e65b7c96542" /></td>
    <td><img width="720" alt="Create post" src="https://github.com/user-attachments/assets/a0ce44cc-1475-43e1-ab79-91a3b8c04325" /></td>
  </tr>
  <tr>
    <td><img width="720" alt="Dashboard" src="https://github.com/user-attachments/assets/777d9f7e-b16c-40db-91ec-98ed74529e3c" /></td>
    <td><img width="720" alt="Profile posts" src="https://github.com/user-attachments/assets/ccf152bd-265e-430f-a2e0-7aa6d8f4ff3f" /></td>
  </tr>
</table>



