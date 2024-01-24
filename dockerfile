FROM node:8.10

COPY . .

WORKDIR /usr/src

RUN npm install

# RUN npm install -g nodemon
RUN npm install -g forever

EXPOSE 3000

# CMD ["nodemon", "-w", "api", "-w", "config"]
CMD ["forever", "-w", "start", "app.js"]


#FROM node:20.11.0
#WORKDIR /usr/src/app
#COPY . .
#EXPOSE 3000
#WORKDIR ./backend
#CMD ["npm", "run", "start"]