# Docker setup guidelines

- If you want to run QSA in docker, update config environments!
- Note: it's recommended to turn on **experimental features** under the settings in Docker!

### SonarQube:
  - Create container `docker run -d --name sonarqube -p 9000:9001 sonarqube`

### Frontend:
  - Create container `docker run -d --name qsaFrontend -p 4200:80 YOUR_NAME/qsa-frontend:latest`
  - You can access the endpoints under `http://localhost:4200`
