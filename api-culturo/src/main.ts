// src/main.ts (Version Corrigée)

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path'; 

async function bootstrap() {
  // 1. DÉFINITION HTTPS ET LECTURE DES CLÉS
  // Construit le chemin absolu vers le dossier secrets (depuis /dist vers /secrets)
  const secretPath = path.join(__dirname, '..', 'secrets');
  
  const httpsOptions = {
    // Lecture des clés que vous avez générées
    key: fs.readFileSync(path.join(secretPath, 'private-key.pem')), 
    cert: fs.readFileSync(path.join(secretPath, 'public-certificate.pem')),
  };

  // 2. CRÉATION DE L'APPLICATION AVEC HTTPS
  const app = await NestFactory.create(AppModule, {
    httpsOptions, // PASSAGE DE LA CONFIGURATION HTTPS ICI
  });

  // CORS (Vous aviez déjà la bonne configuration ici, mais on utilise app.enableCors une fois)
  // app.enableCors({
  //   origin: true,
  //   methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  //   credentials: true,
  // });

  app.enableCors({
  origin: [
    'https://localhost:5173', // front https
    'http://localhost:5173',  // front http si tu testes
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true, // nécessaire si tu envoies JWT ou cookies
});

  // Swagger Config (Votre configuration existante)
  const config = new DocumentBuilder()
    .setTitle('Culturo API')
    .setDescription("L'API de la gestion de l'application Culturo")
    // IMPORTANT : Changez l'URL du serveur dans Swagger à HTTPS
    .addServer('https://localhost:3000') 
    .setTermsOfService('https://localhost:3000/terms-of-service')
    .setLicense('MIT License', 'https://google.com')
    .setVersion('1.0')
    .addSecurity('bearer', { type: 'http', scheme: 'bearer' }) 
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Route Swagger
  SwaggerModule.setup('swagger', app, document);

  // Lancement du serveur (Le port par défaut sera toujours 3000)
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  console.log(`Server running on https://${await app.getUrl()}`); // Affichage du bon protocole
}

bootstrap();