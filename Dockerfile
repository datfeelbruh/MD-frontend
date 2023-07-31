FROM node:alpine as build

WORKDIR /app
COPY . /app/

RUN npm install
RUN npm run build

FROM nginx

COPY --from=build /app/dist /var/www/html/
COPY --from=build /app/nginx.conf /etc/nginx
RUN rm -rf /app

CMD ["nginx","-g","daemon off;"]
EXPOSE 80