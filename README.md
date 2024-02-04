# REST API - Brain agriculture

## Pre-requisites
- Node 18
- Yarn/NPM

## Getting started

    git clone https://github.com/brinobruno/agriculture-api <local_dir>

## Running the app with Docker
### Build images and run the containers

    docker compose up -d --build

### Run migrations
Enter execute a command in running container (api container - check with docker ps -> CONTAINER ID)

    docker exec -it CONTAINER_ID /bin/bash

then:

    pnpm migration:run

## Running the app without Docker
Create database and add .env and...

### Install dependencies
    yarn

### Run migrations
    yarn typeorm

### Run the app
    cd <local_dir>
    yarn dev

### Run the tests (after running migration on testing db)
    yarn test

## Docs (endpoints)
`GET /api/v1/docs` (Browser)

### Producers
`POST /api/v1/producers`

`GET /api/v1/producers`

`GET /api/v1/producers:id`

`PUT /api/v1/producers:id`

`DELETE /api/v1/producers:id`

### Dashboard
`GET /api/v1/dashboard`

`GET /api/v1/dashboard/total-quantity`

`GET /api/v1/dashboard/total-hectares`

`GET /api/v1/dashboard/farms-by-state`

`GET /api/v1/dashboard/farms-by-crop`

`GET /api/v1/dashboard/land-usage-ratio`

## Troubleshooting
In case you have a postgres service already running, you may have database_port problems, in that case, run:

    sudo service postgresql stop

...or equivalent of stopping postgres service