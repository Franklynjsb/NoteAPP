
FROM node:20.11.0
WORKDIR /usr/src/app
COPY . .
EXPOSE 3000
WORKDIR ./backend
CMD ["npm", "install", "-g", "nodemon"]
CMD ["npm", "run", "start"]