FROM node:8.10

COPY . .

WORKDIR /backend

RUN npm install

RUN -it --rm \
  -p 7700:7700 \
  -v $(pwd)/meili_data:/meili_data \
  getmeili/meilisearch:v1.6
  meilisearch --master-key="MASTER_KEY"

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