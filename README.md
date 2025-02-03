## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Running the Backend](#running-the-backend)
- [Running the Frontend](#running-the-frontend)
- [Local Deployment](#local-deployment)
- [Contributing](#contributing)

## Installation

After pulling the project repository, you'll need to install the dependencies. Run the following command:

```bash
yarn
```

Build app, api, packages:

   ```bash
   yarn build
   ```

## Setup

### Database Setup

To set up the database, you have two options:

1. **Install PostgreSQL Locally**

   Download the PostgreSQL server from [here](https://www.postgresql.org/download/).

2. **Using Docker**

   You can run a PostgreSQL instance using Docker with the following command:

   ```bash
   docker run \
     --rm \
     -p 5432:5432 \
     -v $(pwd)/.sst/storage/postgres:/var/lib/postgresql/data \
     -e POSTGRES_USER=postgres \
     -e POSTGRES_PASSWORD=password \
     -e POSTGRES_DB=local \
     postgres:16.4
   ```

## Running the Backend

To run the backend, follow these steps:

1. Create a `.env` file inside `apps/api/` with the following environment variables:

   ```env
   DB_HOST=
   DB_PORT=5432
   DB_USERNAME=
   DB_PASSWORD=
   DB_NAME=
   ```

2. Run the development server:

   ```bash
   yarn run dev
   ```

## Running the Frontend

To run the frontend, follow these steps:

1. Create a `.env` file inside `apps/web/` with the following environment variables:

   ```env
   NEXT_PUBLIC_GRAPH_QL_URL={SERVER_URL}/graphql
   ```

   Replace `{SERVER_URL}` with the actual server URL (e.g., `http://localhost:3000`).

2. Run the development server:

   ```bash
   yarn run dev
   ```

3. Visit the application in your browser at [http://localhost:3000/graphql](http://localhost:3000/graphql).

## Local Deployment

To run the deployment locally, you need to configure your environment variables.

1. Fill in the environment variables inside `sst.config.ts` as follows:

   ```typescript
   const envs = {
     database: {
       host: '{HOST}',
       port: 5432,
       username: '{USERNAME}',
       password: '',
       database: '{DATABASE_NAME}',
     }
   }
   ```

2. Build the application:

   ```bash
   yarn build
   ```

3. Run the preview command:

   ```bash
   yarn run preview
   ```

   > **Note:** Make sure you have AWS credentials configured on your device.

## Contributing
