FROM node:18-alpine


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build

EXPOSE 5173


RUN npm install -g serve
CMD ["serve", "-s", "dist"]