FROM node:22

WORKDIR /app
COPY package.json ./
CMD npm install

COPY . .

ENV APP_ENV=production
ENV APP_PORT=8000
ENV MODEL_URL=https://storage.googleapis.com/modelmlgc/model.json

LABEL authors="Rafli Fahri"

CMD ["npm", "start"]
EXPOSE 8000