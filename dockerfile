FROM node:8.10

COPY . .

WORKDIR /backend

RUN npm install

RUN npm i meilisearch
RUN npm i appwrite
RUN npm install -g nodemon

EXPOSE 3000

CMD ["getmeili/meilisearch:v0.26.1"] 
RUN --rm -p 127.0.0.1:7700:7700 getmeili/meilisearch:v0.26.1
CMD ["npm", "run", "start"]

#FROM node:20.11.0
#WORKDIR /usr/src/app
#COPY . .

#WORKDIR ./backend
#CMD ["npm", "run", "start"]