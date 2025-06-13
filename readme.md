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
    <td><img width="1469" alt="Zrzut ekranu 2025-06-13 o 10 21 47" src="https://github.com/user-attachments/assets/0ac4dc68-2ff4-41c8-8cee-1d46d95f9ef5" /></td>
    <td><img width="1470" alt="Zrzut ekranu 2025-06-13 o 10 22 23" src="https://github.com/user-attachments/assets/ffb664d8-91aa-4935-8167-a1f40c0c897b" /></td>
  </tr>
  <tr>
    <td><img width="1470" alt="Zrzut ekranu 2025-06-13 o 10 22 54" src="https://github.com/user-attachments/assets/e782bb9e-330a-4012-87fa-e092ec7bd96c" /></td>
    <td><img width="1470" alt="Zrzut ekranu 2025-06-13 o 10 23 19" src="https://github.com/user-attachments/assets/446e9e85-53d3-4371-b129-cea564db9e21" /></td>
  </tr>
</table>







