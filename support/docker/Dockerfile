FROM nginx:1.15

USER root

RUN mkdir /qsa-frontend

ENV DIRPATH /qsa-frontend

COPY ./dist/qsa-application-frontend/ /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./support/docker/init.sh $DIRPATH/init.sh

RUN chmod 755 $DIRPATH/init.sh
WORKDIR $DIRPATH

EXPOSE 80

ENTRYPOINT ["sh", "/qsa-frontend/init.sh"]
