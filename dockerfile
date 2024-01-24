FROM node:8.10

COPY . .

WORKDIR /backend

RUN npm install

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