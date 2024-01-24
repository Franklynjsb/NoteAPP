FROM node:8.10

COPY . .

WORKDIR /backend

RUN npm install

RUN -d --name=meilisearch --restart=always --network=app-net \
    -p 8080:7700 \
    -v /opt/meilisearch/data:/meili_data \
    -e MEILI_MASTER_KEY=pwd123 \
    getmeili/meilisearch
# RUN npm install -g nodemon
RUN npm install -g nodemon

EXPOSE 3000

CMD ["npm", "run", "start"]

#FROM node:20.11.0
#WORKDIR /usr/src/app
#COPY . .
#EXPOSE 3000
#WORKDIR ./backend
#CMD ["npm", "run", "start"]