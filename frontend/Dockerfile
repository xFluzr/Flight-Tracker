FROM node:20-alpine AS build
WORKDIR /app

# Skopiuj pliki package.json i package-lock.json
COPY package*.json ./

# Zainstaluj zależności
RUN npm install

# Skopiuj kod źródłowy
COPY . .

# Zbuduj aplikację
RUN npm run build

# Użyj nginx do serwowania aplikacji
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
