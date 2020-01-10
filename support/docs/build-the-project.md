# Build the project

- Open a terminal and navigate to the following directory of the project: `/qsa-application-frontend`
- Issue the following command: `npm ci`
- After issue `npm install -g @angular/cli`
- Note: every time when new package added, please issue the `npm ci` command!

### Run the angular app

- Click on the `Run` -> `Edit Configuration` menu
- Click on the `+` icon, then select `npm` from the list
  - **package.json**: click on `...` and find `./package.json` file
  - **Command**: `run`
  - **Scripts**: `start`
  - Click `OK`, then you can run the project
- Open a browser and navigate to the following URL: http://localhost:4200/

## Build Docker image

- Open a terminal and navigate to the following directory of the project: `/qsa-application-frontend`
- Issue the following command: `ng build --prod`
  - Note: if you haven't installed **npm packages**, first you need to install it, see the instructions [here](build-the-project.md#build-the-project)
- For building docker image issue `docker build -f ./support/docker/Dockerfile -t YOUR_NAME/qsa-frontend:latest .`
- After that you will be able to run the docker image, see the instructions [here](docker-setup.md#frontend)
