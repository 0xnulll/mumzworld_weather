## Description

Weather Api Service for Mumzworld assignment

## Project setup

1. Setup postgres local with proper user as defined in .env
2. Install node js 
3. Update https://www.weatherapi.com/ API key in .env file

```bash
$ npm install
$ cp .env.example .env
```

## Compile and run the project

if prerequisite is installed 
```bash
# development
$ npm run start:dev
```

**This can be installed via docker**

# via docker
```
$ docker-compose build
$ docker-compose up
```

## Run tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

# Swagger Endpoint

http://localhost:3000/api

# Graphql Endpoint

http://localhost:3000/graphql

Only exposed weather api to graphql, all other apis can be exposed in same way

# Project Structure Overview

The `src` folder contains the core application code for the Weather API, organized into several modules and services. Below is a description of the key components:

- **app.module.ts**: The main application module that imports and configures various feature modules, middleware, and global settings such as throttling and caching. 
    
    caching was done in memory but a redis can be used for distributed architecture.

- **applogger.service.ts**: A custom logger service that extends NestJS's `ConsoleLogger`. It is request-scoped, allowing it to log per-request data, including HTTP method, path, and user ID.

- **loggermiddleware.service.ts**: A middleware that utilizes the `AppLoggerService` to log request details. It sets the request context for logging and logs a message when the request finishes.

- **main.ts**: The entry point of the application. It creates the NestJS application instance, sets up Swagger for API documentation, and starts the server.

# Assumption 

Weather, Locations end point uses city as string input and not users favorite locations id, if requirement is such a way to use user's favorite location as input, it can be changed that way. This endppoints are not protected and does not require user login.

# Feature Modules Overview

- **weather/**: This module handles all functionalities related to weather data. It includes services for fetching weather information

- **forecast/**: The forecast module is responsible for providing weather forecasts over various time frames. 5 days forecast is hardcode in file which can be changed or driven from env file

- **auth/**: This module manages user authentication and authorization. It includes services for user registration, login, and token management. 
   

- **users/**: The users module is dedicated to managing user-related data and operations.

    **Users entities are hard code in UsersService and did not store it in PGSQL as scope of project was increasing**

- **locations/**: This module focuses on managing user's favorite locations.
