FROM node:20

WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Builder l'application TypeScript
RUN npm run build

EXPOSE 3000

# Lancer NestJS en mode production
CMD ["npm", "run", "start:prod"]
