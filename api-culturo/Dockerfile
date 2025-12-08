FROM node:20

WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package.json .


# Installer les dépendances
RUN npm install


# Copier le reste du code ======> A remettre pour la prod, en dev on monte le code en volume pour obtenir ce qu'on appelle le hot-reload.
# Le hoat-reload permet de recharger automatiquement l'application à chaque modification du code source.
COPY . .

RUN npm run build

# Builder l'application TypeScript
# RUN npm run build

EXPOSE 3000

# Lancer NestJS en mode dev
CMD ["node",  "dist/main.js"]
