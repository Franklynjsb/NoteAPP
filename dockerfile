FROM node:8.10

COPY . .

WORKDIR /backend

RUN npm install

ADD file:282274bb02b29182f35c732f021f3dab6de9f16a1ae24460061ad1abdca6444a in / 

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