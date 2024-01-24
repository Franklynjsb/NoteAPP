FROM alpine
ADD getmeili/meilisearch:v1.6

RUN npm install
CMD ["npm", "start"]
