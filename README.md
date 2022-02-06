# PERN stack todo app running in Docker

## Prerequisites

- Docker installed

## Steps

- Clone this repo

- Create your `.env` file

Create a `.env` file in the root of the project and paste
the following variables.

```sh
POSTGRES_USER=<your_user>
POSTGRES_PASSWORD=<your_pass>
POSTGRES_DB=<your_dbname>
POSTGRES_HOST=db
REACT_APP_SERVER_URL=http://localhost:3001
```

- Update your docker-compose.yml

Under the db, update the environment section in the file.

```sh
- POSTGRES_DB=<your_dbname>
- POSTGRES_USER=<your_user>
- POSTGRES_PASSWORD=<your_pass>
```

- Docker compose

To get started in development, cd into the root directory, and

```
docker-compose up -d
```

- View the frontend on [http://localhost:3000/](http://localhost:3000/) and create some todos.
