# NodeJs Blog Site

A simple blog platform built with Node.js, Express, MongoDB, and EJS. It features user authentication for admin access, post management, and a public-facing blog with search functionality.

## Features

- Public blog homepage with latest posts and pagination
- View individual posts
- Search posts by title or content
- Admin panel for managing posts (add, edit, delete)
- User authentication for admin access
- Responsive design with custom CSS

## Project Structure

```
.
├── app.js
├── importFromREmote.js
├── package.json
├── .env
├── Public/
│   ├── css/
│   ├── img/
│   └── js/
├── server/
│   ├── config/
│   ├── helpers/
│   ├── models/
│   └── routes/
└── views/
    ├── admin/
    ├── layouts/
    ├── partials/
    └── ...
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB (local or remote)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/blog-site.git
    cd blog-site
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add:
    ```
    MONGODB_URI=your_local_mongodb_uri
    JWT_SECRET=your_jwt_secret
    REMOTE_MONGODB_URI=your_remote_mongodb_uri # (optional, for importFromREmote.js)
    ```

4. Start the development server:
    ```sh
    npm run dev
    ```
    The app will run on [http://localhost:2000](http://localhost:2000).

## Usage

- Visit `/` for the public blog.
- Use the search bar to find posts.
- Go to `/admin` to log in as an admin.
- After logging in, access the dashboard to add, edit, or delete posts.

## Admin Authentication

- Register a new admin via `/register` (API endpoint).
- Log in at `/admin` with your credentials.
- JWT-based authentication is used for admin routes.

## Importing Posts from Remote

- Use `importFromREmote.js` to import posts from a remote MongoDB database to your local database.
- Configure `REMOTE_MONGODB_URI` in `.env` before running.

## Technologies Used

- Node.js
- Express
- MongoDB & Mongoose
- EJS templating
- bcrypt, jsonwebtoken
- express-session, connect-mongo
- Custom CSS

## License

This project is licensed under the ISC License.

## Author

Oyeh
