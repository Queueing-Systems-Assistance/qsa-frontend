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
  -t zoltanszilagyicse/qsa-frontend:latest \
  sudo docker push zoltanszilagyicse/qsa-frontend:latest || exit
}

dockerLogin
dockerBuildPushQSAFrontend
