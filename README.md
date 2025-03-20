## Camlin Voltage Dashboard

## Running Project locally

First, build the project:

```bash
npm run build
```

Run lint to check for warnings and errors:

```bash
npm run lint
```

Run test to run tests, find errors and check code coverage:

```bash
npm run test
```

Run development:

```bash
npm run dev
```

Or start the Node.js server:

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running Project on Docker Container locally

Build dockerized Next.js app

```bash
docker build -t camlin .
```

Verify image exists

```bash
docker images
```

```bash
REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
camlin       latest    4192170a818e   6 seconds ago   296MB
```

Run dockerized Next.js app

```bash
docker run -p 3000:3000 camlin
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
Note: You need to obtain SUPABASE keys

## Pull image from DockerHub todo
