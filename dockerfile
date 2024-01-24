FROM node:8.10

COPY package.json /usr/src/

WORKDIR /usr/src

RUN npm install

# RUN npm install -g nodemon
RUN npm install -g forever

COPY . /usr/src/

EXPOSE 1337

# CMD ["nodemon", "-w", "api", "-w", "config"]
CMD ["forever", "-w", "start", "app.js"]


#FROM node:20.11.0
#WORKDIR /usr/src/app
#COPY . .
#EXPOSE 3000
#WORKDIR ./backend
#CMD ["npm", "run", "start"]