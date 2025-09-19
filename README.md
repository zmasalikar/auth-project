Node.js + Express + Mongoose JWT authentication API (Bearer tokens)

## Live (deployed)
https://auth-project-rfbp.onrender.com

## Repo
https://github.com/zmasalikar/auth-project

## Overview
Simple API implementing user authentication and authorization using JWT bearer tokens.  
Follows MVC pattern with separate folders for models, controllers, routes and middlewares.

---

## Endpoints

### 1. Register
- URL: `POST /api/auth/register`
- Body (JSON):
json
{ "username": "testuser", "email": "test@mail.com", "password": "123456" }


* Success:
json
{ "message": "User registered successfully" }

* Errors:

  * 400 (validation)
  * 409 (email exists)
  * 500 (server)

---

### 2. Login

* URL: `POST /api/auth/login`
* Body (JSON):

json
{ "email": "test@mail.com", "password": "123456" }
```

* Success:

json
{ "token": "<JWT token>" }


---

### 3. Get current user

* URL: `GET /api/auth/me`
* Header:

```
Authorization: Bearer <token>
```

* Success:

json
{ "user": { "id": "...", "email":"..." } }

---

## Tech stack

* Node.js
* Express.js
* MongoDB Atlas + Mongoose
* JWT
* Postman

---

## Local setup

1. Clone the repo

   ```bash
   git clone https://github.com/zmasalikar/auth-project.git
   cd auth-project
   ```
2. Copy `.env.example` → `.env` and set real values.
   Example:

   ```
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@<clustername>.mongodb.net/authdb
   JWT_SECRET=mysecret123
   ```
3. Install dependencies

   ```bash
   npm install
   ```
4. Run locally (with nodemon):

   ```bash
   npm run dev
   ```
5. Server will start at `http://localhost:5000`

---

## Deploy notes

* Deployed on [Render](https://render.com/) (connected to GitHub).
* Ensure `MONGO_URI` in Render is set to Atlas connection string.
* `JWT_SECRET` set in Render environment variables.

---

## Postman

* Import `auth-project.postman_collection.json` (included in repo).
* Collection includes Register, Login, Me endpoints.
* Replace `{{token}}` in Authorization header with the JWT from login.

---

## Example Flow

1. Register → returns success message.
2. Login → returns JWT token.
3. Me → returns user info when called with token in `Authorization` header.

---

## Notes

* Uses `bcryptjs` for password hashing.
* Proper error handling and validation included.
* Follows MVC structure:

  * `models/User.js`
  * `controllers/authController.js`
  * `routes/authRoutes.js`
  * `middlewares/authMiddleware.js`

GitHub repo: https://github.com/zmasalikar/auth-project
Live API (Render): https://auth-project-rfbp.onrender.com

How to test:
1) POST /api/auth/register -> create user
   Body: { "username":"testuser", "email":"test@mail.com", "password":"123456" }

2) POST /api/auth/login -> get token
   Body: { "email":"test@mail.com", "password":"123456" }

3) GET /api/auth/me -> get user info
   Header: Authorization: Bearer <token>

Notes:
- Deployed on Render.
- MongoDB Atlas used for production DB (MONGO_URI set in Render environment variables).
- Postman collection included in repo: auth-project.postman_collection.json
