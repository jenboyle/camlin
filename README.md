## Camlin Voltage Dashboard

## Running Project locally

Run npm install:

```bash
npm install
```

Build the project:

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

Note: You need to obtain SUPABASE keys in .env.local file

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

Take another terminal - check container spun up

```bash
docker ps
```

```bash
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS                    NAMES
5dbc4273bd71   camlin    "docker-entrypoint.s…"   11 seconds ago   Up 11 seconds   0.0.0.0:3000->3000/tcp   wonderful_mcnulty
```

Enter the container

```bash
docker exec -ti 5db /bin/sh
```

## Pull image from DockerHub todo

```bash
docker pull dockergroovyjen/camlin:v1.0
```
