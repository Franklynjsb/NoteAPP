
FROM node
WORKDIR /usr/src/backend
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run start"]