#!/bin/bash

#### Init
cd "${TRAVIS_BUILD_DIR}" || exit

# Docker Login
dockerLogin() {
  echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin || exit
}

# Build and push qsaFrontend Docker image
dockerBuildPushQSAFrontend() {
  sudo docker build \
  -f ./support/docker/Dockerfile \
  -t zoltanszilagyicse/qsa-application-frontend:latest \
  -t zoltanszilagyicse/qsa-application-frontend:1.0."$TRAVIS_BUILD_NUMBER" . || exit
  sudo docker push zoltanszilagyicse/qsa-application-frontend:latest || exit
  sudo docker push zoltanszilagyicse/qsa-application-frontend:1.0."$TRAVIS_BUILD_NUMBER" || exit
}

dockerLogin
dockerBuildPushQSAFrontend
