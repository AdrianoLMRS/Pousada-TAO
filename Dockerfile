FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY ./app /app

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "run", "start:docker"]
# docker build -t adrianolmrs/hostel:1.1 .