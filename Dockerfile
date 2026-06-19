# syntax=docker/dockerfile:1

# --- Étape build : compile le site Vite (le build se fait ici, sur le VPS) ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- Étape serve : nginx sert le dossier dist/ en statique ---
FROM nginx:1.27-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx.conf /etc/nginx/conf.d/portfolio.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
