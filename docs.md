# Docs for Quartz v4

## Setting Up

### Mannual Setup

1. Install [Node.js](https://nodejs.org/) (`npm -v` 11.6.1 I used)
2. Clone this repository
3. Run `npm install` to install dependencies
4. Run `npx quartz build --serve` to build and serve locally
5. Open `http://localhost:8080` in your browser to view the site

### Using Docker

Just use the command from documentation `docker run --rm -itp 8080:8080 -p 3001:3001 -v ./content:/usr/src/app/content $(docker build -q .)` or follow the steps below:

1. Build the Docker image:

   ```bash
   docker build -t quartz-app .
   ```

2. Run the Docker container:

   ```bash
    docker run -p 8080:8080 quartz-app
   ```

3. Open `http://localhost:8080` in your browser to view the site

4. To stop the container, use `docker ps` to find the container ID and then run `docker stop <container_id>`.

## Updating from the original repository

1. Add the original repository as a remote:

   ```bash
   git remote add upstream https://github.com/jackyzha0/quartz.git
   ```

2. Fetch updates from the original repository:

   ```bash
   git fetch upstream
   ```

3. Merge the changes from the original branch (for example, `v4`) into your branch:

   ```bash
   git merge upstream/v4
   ```

4. Resolve any conflicts if they appear, then commit the changes.

5. Continue working as usual.
