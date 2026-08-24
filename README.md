# Inventory Management API

A RESTful backend API for managing products, categories, inventory, and users.

Built with Node.js, Express, TypeScript, and MySQL.

## Features

- User registration and login
- JWT authentication
- Access and refresh tokens
- Refresh token rotation and revocation
- Password hashing with bcrypt
- Role-based authorization (`admin`, `user`)
- Product CRUD operations
- Category CRUD operations
- User management
- Request validation with Zod
- Centralized error handling
- MySQL database
- Docker and Docker Compose

## Tech Stack

- Node.js
- Express
- TypeScript
- MySQL
- JWT
- bcrypt
- Zod
- Docker
- Docker Compose

## Architecture

The project follows a layered architecture:

Routes → Middleware → Controllers → Services → Repositories → MySQL

### Project Structure

```text
src/
├── config/
├── errors/
├── middleware/
├── modules/
│   ├── auth/
│   ├── categories/
│   ├── products/
│   └── users/
├── routes/
├── types/
├── app.ts
└── server.ts
```
