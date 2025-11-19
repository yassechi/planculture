-- =====================================
--  SEED : importance_types
-- =====================================
INSERT INTO importance_types (nom) VALUES
('primaire'),
('secondaire'),
('tertiaire');

-- =====================================
--  SEED : famille
-- =====================================
INSERT INTO famille (nom, id_importance) VALUES
('Solanacées', 1),
('Cucurbitacées', 2),
('Légumineuses', 1),
('Brassicacées', 3);

-- =====================================
--  SEED : role
-- =====================================
INSERT INTO role (libelle, descr) VALUES
('admin', 'Administrateur système'),
('formateur', 'formateur pour les stagiaires'),
('stagiaire', 'inscrit pour une formation ');

-- =====================================
--  SEED : exploitation
-- =====================================
INSERT INTO exploitation (nom, localite) VALUES
('Ferme du Moulin', 'Ciney'),
('Les Jardins du Sud', 'Namur');

-- =====================================
--  SEED : type_amendement
-- =====================================
INSERT INTO type_amendement (type_amendement, nom_amendement) VALUES
('organique', 'Compost'),
('minéral', 'Chaux'),
('biologique', 'Fumier');

-- =====================================
--  SEED : sole
-- =====================================
INSERT INTO sole (numero, nom_sole, Id_Exploitation) VALUES
(1, 'Sole Nord', 1),
(2, 'Sole Sud', 1),
(1, 'Sole Est', 2);

-- =====================================
--  SEED : planche
-- =====================================
INSERT INTO planche (Libellé, code_planche, Id_sole) VALUES
('Planche A', 'PL001', 1),
('Planche B', 'PL002', 1),
('Planche C', 'PL003', 2),
('Planche D', 'PL004', 3);

-- =====================================
--  SEED : legume
-- =====================================
INSERT INTO legume (
    nom, saison_recolte, durée_de_culture_estimee_min,
    durée_de_culture_estimee_max, distance_rang, Id_famille
) VALUES
('Tomate', 'été', 70, 90, 50, 1),
('Courgette', 'été', 45, 60, 80, 2),
('Haricot', 'été', 50, 70, 40, 3),
('Chou', 'automne', 80, 110, 60, 4);

-- =====================================
--  SEED : utilisateur
-- =====================================
INSERT INTO utilisateur (nom, prenom, email, hpassword, telephone, Id_role, photo) VALUES
('LIONGO', 'Alois', 'alois@planculture.com', 'alois123', '0470000001', 1, '/assets/img/alois.png'),
('ANCION', 'Nicolas', 'nicolas@planculture.com', 'nicolas123', '0470000002', 2, '/assets/img/nico.png'),
('GILSON', 'Roxane', 'roxane@planculture.com', 'roxane123', '0470000003', 3, '/assets/img/roxane.png');

-- =====================================
--  SEED : commande_fournisseur
-- =====================================
INSERT INTO commande_fournisseur (date_commande, date_livraison, Id_utilisateur) VALUES
('2025-03-10', '2025-03-15', 1),
('2025-03-12', '2025-03-18', 2);

-- =====================================
--  SEED : plan_section
-- =====================================
INSERT INTO plan_section (annee, nbr_section, Id_planche) VALUES
(2025, 4, 1),
(2025, 3, 2);

-- =====================================
--  SEED : section
-- =====================================
INSERT INTO section (
    numero_section, num_semaine_début, num_semaine_fin,
    Id_utilisateur, Id_plan_section, Id_legume
) VALUES
(1, '2025-04-01', '2025-06-01', 2, 1, 1),
(2, '2025-04-10', '2025-06-10', 3, 1, 2),
(1, '2025-04-15', '2025-07-01', 2, 2, 3);

-- =====================================
--  SEED : recolte
-- =====================================
INSERT INTO recolte (date_recolte, quantite, qualite, Id_section) VALUES
('2025-06-05', 120.50, 'bonne', 1),
('2025-06-15', 90.00, 'excellente', 2),
('2025-07-10', 150.00, 'moyenne', 3);

-- =====================================
--  SEED : arrosage
-- =====================================
INSERT INTO arrosage (date_arrosage, quantité, Id_section) VALUES
('2025-04-05', 50, 1),
('2025-04-12', 60, 1),
('2025-04-20', 40, 2),
('2025-05-02', 70, 3);

-- =====================================
--  SEED : amendement
-- =====================================
INSERT INTO amendement (date_amendement, id_type_amendement, Id_section) VALUES
('2025-04-02', 1, 1),
('2025-04-18', 2, 2),
('2025-05-01', 3, 3);

-- =====================================
--  SEED : realise
-- =====================================
INSERT INTO realise (Id_recolte, Id_utilisateur) VALUES
(1, 2),
(1, 3),
(2, 2),
(3, 1);

-- =====================================
--  SEED : ligne_commande
-- =====================================
INSERT INTO ligne_commande (Id_legume, Id_commande_fournisseur, quantite) VALUES
(1, 1, '50 plants'),
(2, 1, '30 plants'),
(3, 2, '200 graines');
