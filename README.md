# WebApp with Node.js, Express, and PostgreSQL

This project is a simple web application created as part of a task. It utilizes Node.js with the Express framework and PostgreSQL for data storage. The goal is to implement a web application that includes a user database and a route to update user balances.

## Table of Contents

- [WebApp with Node.js, Express, and PostgreSQL](#webapp-with-nodejs-express-and-postgresql)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)

## Overview

- The primary objective of this project is for test purposes:

- Node.js (Express) for server-side functionality.
- PostgreSQL for data storage, either through pure SQL or the Sequelize ORM.
- JavaScript is the language.
- Performs database migration at startup to create a "users" table and add an initial user with a balance of 10000.
- Implements a route to update user balances, with the constraint that the balance cannot go negative.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/judinilson/simplewebapptest.git
   cd your-project
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure the application env:**

   ```DB_HOST=your_database_host
   DB_PORT=your_database_port
   DB_USERNAME=your_database_username
   DB_PASSWORD=your_database_password
   DB_DATABASE=your_database_name
   ```

## Usage

`node index.js`

## Contributing

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add new feature"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License

Specify the license under which your project is distributed. For example, use the [MIT License](LICENSE) or any other license of your choice.
