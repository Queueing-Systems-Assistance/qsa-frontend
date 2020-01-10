#!/bin/bash

#### Init
cd "${TRAVIS_BUILD_DIR}" || exit

#### Start Backend
printf "Startup Backend "
docker run -d --rm --name qsaBackend zoltanszilagyicse/qsa-backend:latest
while ! $(curl --output /dev/null --silent --head --fail http://localhost:8080/actuator/info); do
    sleep 5
done
echo "[OK]"

#### Run Frontend Tests
printf "Running Tests FE "
cd qsa-application-frontend || exit
npm run e2eCI || exit
echo "[OK]"

#### Stop Backend
docker printf "Shutdown Backend "
docker stop qsaBackend
while $(curl --output /dev/null --silent --head --fail http://localhost:8080/actuator/info); do
    sleep 5
done
echo "[OK]"

#### Build Frontend
printf "Build Frontend "
npm run buildProd || exit
echo "[OK]"