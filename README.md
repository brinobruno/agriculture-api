# REST API - Brain agriculture

## Pre-requisites
- Node 18
- Postgres
- Yarn/NPM

## Getting started

    git clone https://github.com/brinobruno/agriculture-api <local_dir>

## Environment variables: DEV (also check .env)
- NODE_ENV=development
- DATABASE_URI=postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/YOUR_DB_NAME
- DATABASE_CLIENT=pg
- PORT=3000

## Environment variables: TEST (also check .env)
- NODE_ENV='test'
- DATABASE_URI=postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/YOUR_TESTING_DB_NAME
- DATABASE_CLIENT=pg
- PORT=3000

## Install dependencies
using: yarn

    yarn
    
using: npm

    npm i

## Run migrations
using: yarn

    yarn typeorm
    
using: npm

    npm run typeorm

## Run the app
using: yarn

    cd <local_dir>
    yarn dev
    
using: npm

    cd <local_dir>
    npm run dev

## Run the tests
using: yarn

    yarn test
    
using: npm

    npm run test

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