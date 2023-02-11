#Stage 1
FROM node:17-alpine as build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build


#Stage 2
FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html

COPY --from=build /app/build .
EXPOSE 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]