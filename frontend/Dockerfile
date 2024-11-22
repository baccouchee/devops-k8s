# Utilisez une image de base pour le frontend, par exemple, une image Node.js pour construire l'application et une image Nginx pour servir les fichiers statiques
FROM node:14 AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Utilisez une image Nginx pour servir les fichiers statiques
FROM nginx:alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]