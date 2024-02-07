# Expanse Tracking

## Description

This project is a backend application built with Node.js, Express.js, Sequelize ORM, and MySQL database. It provides APIs for managing users, categories, incomes, and dashboard data.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/Abhishek2063/svelte_expanse_backend.git
   ```

2. Navigate to the project directory:

   ```
   cd svelte_expanse_backend
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Create a `.env` file in the root directory and provide the following configuration:

   ```
   PORT=8080
   DB_USER=your_database_username
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   DB_HOST=localhost
   JWT_SECRET=
   ```

   Replace `your_database_username`, `your_database_password`, `your_database_name` with your MySQL database credentials. `JWT_SECRET` should be a secret key for JWT token generation.

5. Run database migrations:

   ```
   npm run migrate
   ```

6. Start the server:

   ```
   npm run dev
   ```

## Usage

### API Endpoints

- **Users:**
  - `POST /api/users`: Create a new user.
  - `POST /api/users/login`: Login user.
  - `GET /api/users/:id`: Get user details.
  - `POST /api/users/logout/:id` : To logout the user.

- **Categories:**
  - `POST /api/categories/create`: Create a new category.
  - `GET /api/categorieslist/:id/:type`: Get list of categories.

- **Incomes:**
  - `POST /api/incomes/create`: Create a new income.
  - `GET /api/incomes/list/:user_id`: Get list of incomes for a user.
  - `PUT /api/incomes/update/:id`: Update income by ID.
  - `DELETE /api/incomes/delete/:id`: Delete income by ID.

- **Expenses:**
  - `POST /api/expenses/create`: Create a new expenses.
  - `GET /api/expenses/list/:user_id`: Get list of expenses for a user.
  - `PUT /api/expenses/update/:id`: Update expenses by ID.
  - `DELETE /api/expenses/delete/:id`: Delete expenses by ID.

  - **Dashboard:**
  - `GET /api/dashboard/:user_id`: Get balance by user ID.

### Environment Variables

- `PORT`: Port for the server to run on.
- `DB_USER`: MySQL database username.
- `DB_PASSWORD`: MySQL database password.
- `DB_NAME`: MySQL database name.
- `DB_HOST`: MySQL database host.
- `JWT_SECRET`: Secret key for JWT token generation.

## Scripts

- `npm start`: Start the server in production mode.
- `npm run dev`: Start the server in development mode using nodemon.
- `npm run migrate`: Run database migrations.
- `npm test`: Run tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
