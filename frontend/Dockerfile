FROM node:20-alpine

WORKDIR /app

# Dépendances npm (layer mis en cache si package.json inchangé)
COPY package.json package-lock.json ./
RUN npm ci

# Code source
COPY . .

EXPOSE 5173

# Vite doit écouter sur 0.0.0.0 pour être accessible hors du container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
