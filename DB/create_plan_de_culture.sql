CREATE TABLE importance_types(
   id SERIAL PRIMARY KEY,
   nom VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE famille(
   Id_famille SERIAL PRIMARY KEY,
   nom VARCHAR(50) not null,
   id_importance INTEGER REFERENCES importance_types(id) NOT NULL
);

CREATE TABLE role(
   Id_role SERIAL PRIMARY KEY,
   libelle VARCHAR(50)  NOT NULL UNIQUE,
   descr VARCHAR(50)
);

CREATE TABLE exploitation(
   Id_Exploitation SERIAL PRIMARY KEY,
   nom VARCHAR(50)  NOT NULL UNIQUE,
   localite VARCHAR(50)  NOT NULL
);

CREATE TABLE type_amendement(
   id_type_amendement SERIAL PRIMARY KEY,
   type_amendement VARCHAR(50)  NOT NULL UNIQUE,
   nom_amendement varchar(50)
);

CREATE TABLE sole(
   Id_sole SERIAL PRIMARY KEY,
   numero SMALLINT NOT NULL,
   nom_sole VARCHAR(50) UNIQUE,
   Id_Exploitation INTEGER NOT NULL,
   FOREIGN KEY(Id_Exploitation) REFERENCES exploitation(Id_Exploitation)
);

CREATE TABLE planche(
   Id_planche SERIAL PRIMARY KEY,
   Libellé VARCHAR(50)  NOT NULL UNIQUE,
   code_planche VARCHAR(6),
   Id_sole INTEGER NOT NULL,
   FOREIGN KEY(Id_sole) REFERENCES sole(Id_sole)
);

CREATE TABLE legume(
   Id_legume SERIAL PRIMARY KEY,
   nom VARCHAR(50) UNIQUE,
   saison_recolte VARCHAR(50)  NOT NULL,
   durée_de_culture_estimee_min INTEGER,
   durée_de_culture_estimee_max INTEGER,
   distance_rang SMALLINT,
   Id_famille INTEGER NOT NULL,
   FOREIGN KEY(Id_famille) REFERENCES famille(Id_famille)
);

CREATE TABLE utilisateur(
   Id_utilisateur SERIAL PRIMARY KEY,
   nom VARCHAR(50) ,
   prenom VARCHAR(50) ,
   email VARCHAR(50) UNIQUE,
   hpassword VARCHAR(255),
   telephone VARCHAR(16),
   Id_role INTEGER NOT NULL,
   photo varchar(255),
   FOREIGN KEY(Id_role) REFERENCES role(Id_role)
);

CREATE TABLE commande_fournisseur(
   Id_commande_fournisseur SERIAL PRIMARY KEY,
   date_commande DATE,
   date_livraison VARCHAR(50),
   Id_utilisateur INTEGER NOT NULL,
   FOREIGN KEY(Id_utilisateur) REFERENCES utilisateur(Id_utilisateur)
);

CREATE TABLE plan_section(
   Id_plan_section SERIAL PRIMARY KEY,
   annee INTEGER NOT NULL,
   nbr_section SMALLINT NOT NULL,
   Id_planche INTEGER NOT NULL,
   FOREIGN KEY(Id_planche) REFERENCES planche(Id_planche)
);

CREATE TABLE section(
   Id_section SERIAL PRIMARY KEY,
   numero_section SMALLINT,
   num_semaine_début DATE NOT NULL,
   num_semaine_fin DATE NOT NULL,
   Id_utilisateur INTEGER,
   Id_plan_section INTEGER NOT NULL,
   Id_legume INTEGER NOT NULL,
   FOREIGN KEY(Id_utilisateur) REFERENCES utilisateur(Id_utilisateur),
   FOREIGN KEY(Id_plan_section) REFERENCES plan_section(Id_plan_section),
   FOREIGN KEY(Id_legume) REFERENCES legume(Id_legume)
);

CREATE TABLE recolte(
   Id_recolte SERIAL PRIMARY KEY,
   date_recolte DATE,
   quantite NUMERIC(9,2) NOT NULL,
   qualite VARCHAR(50),
   Id_section INTEGER NOT NULL UNIQUE,
   FOREIGN KEY(Id_section) REFERENCES section(Id_section)
);

CREATE TABLE arrosage(
   id_arrosage SERIAL PRIMARY KEY,
   date_arrosage DATE,
   quantité INTEGER,
   Id_section INTEGER NOT NULL,
   FOREIGN KEY(Id_section) REFERENCES section(Id_section)
);

CREATE TABLE amendement(
   id_amendement SERIAL PRIMARY KEY,
   date_amendement DATE NOT NULL,
   id_type_amendement INTEGER NOT NULL,
   Id_section INTEGER NOT NULL,
   FOREIGN KEY(id_type_amendement) REFERENCES type_amendement(id_type_amendement),
   FOREIGN KEY(Id_section) REFERENCES section(Id_section)
);

CREATE TABLE realise(
   Id_recolte INTEGER,
   Id_utilisateur INTEGER,
   PRIMARY KEY(Id_recolte, Id_utilisateur),
   FOREIGN KEY(Id_recolte) REFERENCES recolte(Id_recolte),
   FOREIGN KEY(Id_utilisateur) REFERENCES utilisateur(Id_utilisateur)
);

CREATE TABLE ligne_commande(
   Id_legume INTEGER,
   Id_commande_fournisseur INTEGER,
   quantite VARCHAR(50) NOT NULL,
   PRIMARY KEY(Id_legume, Id_commande_fournisseur),
   FOREIGN KEY(Id_legume) REFERENCES legume(Id_legume),
   FOREIGN KEY(Id_commande_fournisseur) REFERENCES commande_fournisseur(Id_commande_fournisseur)
);


