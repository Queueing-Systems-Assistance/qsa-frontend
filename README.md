# QSA Application - Frontend ![CircleCI](https://img.shields.io/circleci/build/github/Queueing-Systems-Assistance/qsa-frontend/master)

### Project description

QSA Application - Frontend is a UI web application. This project contains the following parts:

- Angular project
- CI/CD pipeline
- Static code analyzer

For those who want to help develop the application:

### Git Setup
- Download and install [Git for Windows](https://git-scm.com/downloads)
- Navigate to your development directory (eg.: `D:\Develop`) and open a git bash from there
- Issue `git clone https://github.com/Queueing-Systems-Assistance/qsa-application-frontend.git` command
- Notes:
  - Use **Git Bash** instead of CMD when working with the repository on your machine!
  - You can open a Git Bash in any directory by right-clicking in File Explorer and choosing **Git Bash Here**.

### NodeJS
- Download and install [NodeJS 10 LTS](https://nodejs.org/en/)

### IntelliJ IDEA - OR - WebStorm
- IntelliJ IDEA:
  - Download and install the latest [IntelliJ IDEA Ultimate Edition](https://www.jetbrains.com/idea/download/)
- WebStorm:
  - Download and install the latest [WebStorm](https://www.jetbrains.com/webstorm/download/)

### Build the project

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

### Build Docker image

- Open a terminal and navigate to the following directory of the project: `/qsa-application-frontend`
- Issue the following command: `ng build --prod`
  - Note: if you haven't installed **npm packages**, first you need to install it, see the instructions below
- For building docker image issue `docker build -f ./support/docker/Dockerfile -t YOUR_NAME/qsa-frontend:latest .`
- After that you will be able to run the docker image, see the instructions below

### Docker setup guidelines

- If you want to run QSA in docker, update config environments!
- Note: it's recommended to turn on **experimental features** under the settings in Docker!

### SonarQube:
  - Create container `docker run -d --name sonarqube -p 9000:9001 sonarqube`

### Frontend:
  - Create container `docker run -d --name qsaFrontend -p 4200:80 YOUR_NAME/qsa-frontend:latest`
  - You can access the endpoints under `http://localhost:4200`
