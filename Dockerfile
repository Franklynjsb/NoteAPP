FROM alpine:3.16

ENV MEILI_HTTP_ADDR=0.0.0.0:7700
ENV MEILI_SERVER_PROVIDER=docker
RUN /bin/sh -c apk update --quiet && apk add -q --no-cache libgcc tini curl # buildkit
COPY /target/release/meilisearch /bin/meilisearch # buildkit
COPY /target/release/meilitool /bin/meilitool # buildkit
RUN /bin/sh -c ln -s /bin/meilisearch /meilisearch # buildkit
WORKDIR /meili_data
EXPOSE 7700
ENTRYPOINT ["tini" "--"]
CMD ["/bin/sh" "-c" "/bin/meilisearch"]

MAINTAINER Franco

RUN npm install
CMD ["npm", "start"]
