BEGIN;

-- 1. TABLES FONDAMENTALES SANS DEPENDANCES EXTERNES
INSERT INTO role (role_name) VALUES
('formateur'),
('stagiaire');

INSERT INTO family_importance (importance_name) VALUES
('primaire'),
('secondaire'),
('tertiaire');

INSERT INTO family (family_name, "familyImportanceIdFamilyImportance") VALUES
('Brassicacees', 1),
('Solanacees', 1),
('Fabacees', 2),
('Apiacees', 2),
('Cucurbitacees', 2),
('Amaryllidacees', 2),
('Asteracees', 3),
('Poacees', 3),
('Chenopodiaceae', 3),
('Lamiacees', 3),
('Rosacees', 1),
('Malvacees', 2),
('Cannabinacees', 3),
('Polygonacees', 3),
('Cruciferes', 1),
('Amaranthacees', 3),
('Euphorbiacees', 2),
('Myristicacees', 2),
('Vitacees', 1),
('Fagacees', 1);

INSERT INTO amendement (amendment_name) VALUES
('Compost'),
('Fumier de cheval'),
('Engrais vert'),
('Chaux agricole'),
('Broyat de bois');

INSERT INTO treatment (treatment_name) VALUES
('Purin d ortie'),
('Savon noir'),
('Decoction de prele'),
('Huile essentielle de Thym'),
('Sulfate de cuivre (Bouillie bordelaise)'),
('Pieges a pheromones'),
('Bacillus thuringiensis'),
('Soufre mouillable'),
('Rotenone'),
('Pyrethre naturel');


-- 2. TABLES D'UTILISATEURS ET D'EXPLOITATION (ORDRE CORRIGE)
-- Hachage de '123456' (salt=10) : $2a$10$l41oT29.Yy5l5R3d.C5m9uD.R4Q3C9E2H1V5P9L1B0G8F7J6K0I
INSERT INTO "user_" (user_first_name, user_last_name, birth_date, email, hpassword, phone, path_photo, user_active, id_role, "harvestIdHarvest") VALUES
('Sylvie', 'Dubois', '1980-01-01', 'sylvie@culturo.be',
'$2a$10$l41oT29.Yy5l5R3d.C5m9uD.R4Q3C9E2H1V5P9L1B0G8F7J6K0I',
'0471111111', NULL, TRUE, 1, NULL),
('Marc', 'Lefevre', '1985-05-15', 'marc@culturo.be',
'$2a$10$l41oT29.Yy5l5R3d.C5m9uD.R4Q3C9E2H1V5P9L1B0G8F7J6K0I',
'0472222222', NULL, TRUE, 2, NULL),
('Antoine', 'Ferma', '1995-01-01', 'antoine@culturo.be',
'$2a$10$l41oT29.Yy5l5R3d.C5m9uD.R4Q3C9E2H1V5P9L1B0G8F7J6K0I',
'0473333333', NULL, TRUE, 2, NULL),
('Emilie', 'Terres', '1996-02-02', 'emilie@culturo.be',
'$2a$10$l41oT29.Yy5l5R3d.C5m9uD.R4Q3C9E2H1V5P9L1B0G8F7J6K0I',
'0474444444', NULL, TRUE, 2, NULL),
('Lucas', 'Verger', '1997-03-03', 'lucas@culturo.be',
'$2a$10$l41oT29.Yy5l5R3d.C5m9uD.R4Q3C9E2H1V5P9L1B0G8F7J6K0I',
'0475555555', NULL, TRUE, 2, NULL);

INSERT INTO exploitation (exploitation_name, exploitation_locality, exploitation_active, "user_idUser") VALUES
('Domaine du Chene', 'Bruxelles', 'Active', 1),
('Le Hameau Vert', 'Namur', 'Active', 2),
('Les Jardins de l Eau', 'Liege', 'Active', 3);


-- 3. TABLES DE STRUCTURE (PEUVENT MAINTENANT UTILISER LES FK)
INSERT INTO sole (sole_name, "exploitationIdExploitation") VALUES
('SOLE Nord', 1), -- ID 1 (CIBLEE PAR LA REQUETE)
('SOLE Ouest', 2),
('SOLE Est', 3),
('SOLE Sud', 1);

--
INSERT INTO board (board_name, board_width, board_length, board_active, id_sole) VALUES
('Bande A01', 120, 500, TRUE, 1), ('Bande A02', 120, 500, TRUE, 1), ('Bande A03', 120, 500, TRUE, 1), ('Bande A04', 120, 500, TRUE, 1), ('Bande A05', 120, 500, TRUE, 1),
('Bande A06', 120, 500, TRUE, 1), ('Bande A07', 120, 500, TRUE, 1), ('Bande A08', 120, 500, TRUE, 1), ('Bande A09', 120, 500, TRUE, 1), ('Bande A10', 120, 500, TRUE, 1),
('Bande B01', 100, 450, TRUE, 2), ('Bande B02', 100, 450, TRUE, 2), ('Bande B03', 100, 450, TRUE, 2), ('Bande B04', 100, 450, TRUE, 2), ('Bande B05', 100, 450, TRUE, 2),
('Bande B06', 100, 450, TRUE, 2), ('Bande B07', 100, 450, TRUE, 2), ('Bande B08', 100, 450, TRUE, 2), ('Bande B09', 100, 450, TRUE, 2), ('Bande B10', 100, 450, TRUE, 2),
('Bande C01', 110, 550, TRUE, 3), ('Bande C02', 110, 550, TRUE, 3), ('Bande C03', 110, 550, TRUE, 3), ('Bande C04', 110, 550, TRUE, 3), ('Bande C05', 110, 550, TRUE, 3),
('Bande C06', 110, 550, TRUE, 3), ('Bande C07', 110, 550, TRUE, 3), ('Bande C08', 110, 550, TRUE, 3), ('Bande C09', 110, 550, TRUE, 3), ('Bande C10', 110, 550, TRUE, 3),
('Bande D01', 90, 400, TRUE, 4), ('Bande D02', 90, 400, TRUE, 4), ('Bande D03', 90, 400, TRUE, 4), ('Bande D04', 90, 400, TRUE, 4), ('Bande D05', 90, 400, TRUE, 4),
('Bande D06', 90, 400, TRUE, 4), ('Bande D07', 90, 400, TRUE, 4), ('Bande D08', 90, 400, TRUE, 4), ('Bande D09', 90, 400, TRUE, 4), ('Bande D10', 90, 400, TRUE, 4);

INSERT INTO section_plan (creation_date, number_of_section, section_plan_active, id_board) VALUES
('2024-01-01', 5, 1, 1), ('2024-01-01', 5, 1, 2), ('2024-01-01', 5, 1, 3), ('2024-01-01', 5, 1, 4), ('2024-01-01', 5, 1, 5),
('2024-01-01', 5, 1, 6), ('2024-01-01', 5, 1, 7), ('2024-01-01', 5, 1, 8), ('2024-01-01', 5, 1, 9), ('2024-01-01', 5, 1, 10),
('2024-01-01', 5, 1, 11), ('2024-01-01', 5, 1, 12), ('2024-01-01', 5, 1, 13), ('2024-01-01', 5, 1, 14), ('2024-01-01', 5, 1, 15),
('2024-01-01', 5, 1, 16), ('2024-01-01', 5, 1, 17), ('2024-01-01', 5, 1, 18), ('2024-01-01', 5, 1, 19), ('2024-01-01', 5, 1, 20);

INSERT INTO vegetable (variety_name, vegetable_name, planting_season,
harvest_season, harvest_duration_min, harvest_duration_max,
inrow_distance, estimated_yield, "familyIdFamily") VALUES
('Marmande', 'Tomate', 'P', 'E/A', 90, 120, 50, 2500, 2), ('Nain Hatif', 'Haricot Vert', 'E', 'A', 50, 70, 10, 800, 3), ('Blanche', 'Carotte', 'P', 'E/A', 80, 100, 5, 1200, 4),
('Tardif', 'Chou-fleur', 'P', 'A', 100, 130, 40, 1500, 1), ('Rond de Nice', 'Courgette', 'P', 'E', 45, 60, 80, 3000, 5), ('Oignon Jaune', 'Oignon', 'P', 'E', 120, 150, 15, 1000, 6),
('Verte', 'Laitue', 'P', 'E', 40, 50, 25, 500, 7), ('Mais Doux', 'Mais', 'P', 'E/A', 90, 110, 30, 1800, 8), ('Rouge', 'Betterave', 'P', 'A', 90, 120, 15, 1600, 9),
('Basilic Geant', 'Basilic', 'P', 'E', 40, 60, 20, 300, 10), ('Pomme', 'Pommier', 'P', 'A', 1500, 2000, 400, 10000, 11), ('Gombo', 'Gombo', 'P', 'E', 60, 90, 40, 1200, 12),
('Asperule', 'Asperule Odorante', 'P', 'E', 70, 90, 20, 400, 13), ('Rhubarbe', 'Rhubarbe', 'P', 'E', 60, 90, 60, 2000, 14), ('Navet', 'Navet', 'P', 'E/A', 50, 70, 10, 900, 15),
('Epinard', 'Epinard', 'P', 'E/A', 40, 60, 20, 700, 16), ('Patate Douce', 'Patate Douce', 'P', 'A', 90, 120, 40, 2800, 17), ('Santal', 'Santal', 'P', 'E/A', 100, 130, 50, 1500, 18),
('Raisin', 'Vigne', 'P', 'A', 120, 150, 100, 3500, 19), ('Chene', 'Chene', 'P', 'A', 3000, 5000, 500, 50000, 20),
('Ancienne', 'Tomate', 'P', 'E/A', 90, 120, 50, 2500, 2), ('Grillage', 'Haricot Sec', 'E', 'A', 90, 120, 20, 1000, 3), ('Orange', 'Carotte', 'P', 'E/A', 80, 100, 5, 1200, 4),
('Precoce', 'Brocoli', 'P', 'E', 70, 90, 35, 1200, 1), ('Patidou', 'Courge', 'P', 'A', 90, 120, 100, 4000, 5), ('Ail Rose', 'Ail', 'P', 'E', 150, 180, 10, 800, 6),
('Romaine', 'Laitue', 'P', 'E/A', 50, 60, 30, 600, 7), ('Orge', 'Cereale', 'P', 'E', 90, 100, 10, 2000, 8), ('Blanche', 'Betterave', 'P', 'A', 90, 120, 15, 1600, 9),
('Thym', 'Thym', 'P', 'E', 60, 80, 15, 250, 10), ('Poire', 'Poirier', 'P', 'A', 1500, 2000, 400, 10000, 11), ('Artichaut', 'Artichaut', 'P', 'E', 90, 120, 70, 1800, 12),
('Chanvre', 'Chanvre', 'P', 'A', 100, 130, 20, 1500, 13), ('Sarrasin', 'Sarrasin', 'P', 'E/A', 60, 80, 10, 1000, 14), ('Chou Rave', 'Chou Rave', 'P', 'E', 60, 80, 25, 1100, 15),
('Amarante', 'Amarante', 'P', 'E/A', 70, 90, 20, 900, 16), ('Manioc', 'Manioc', 'P', 'A', 120, 150, 50, 3500, 17), ('Poivre', 'Poivrier', 'P', 'E/A', 100, 130, 50, 1500, 18),
('Mure', 'Murier', 'P', 'E/A', 90, 120, 200, 4000, 19), ('Hetre', 'Hetre', 'P', 'A', 3000, 5000, 500, 50000, 20);

INSERT INTO price (vegetable_price, price_date, active_price, "vegetableIdVegetable") VALUES
(250, '2025-01-01', TRUE, 1), (180, '2025-01-01', TRUE, 2), (120, '2025-01-01', TRUE, 3), (300, '2025-01-01', TRUE, 4), (150, '2025-01-01', TRUE, 5),
(220, '2025-01-01', TRUE, 6), (110, '2025-01-01', TRUE, 7), (200, '2025-01-01', TRUE, 8), (140, '2025-01-01', TRUE, 9), (350, '2025-01-01', TRUE, 10),
(400, '2025-01-01', TRUE, 11), (180, '2025-01-01', TRUE, 12), (120, '2025-01-01', TRUE, 13), (300, '2025-01-01', TRUE, 14), (150, '2025-01-01', TRUE, 15),
(220, '2025-01-01', TRUE, 16), (110, '2025-01-01', TRUE, 17), (200, '2025-01-01', TRUE, 18), (140, '2025-01-01', TRUE, 19), (350, '2025-01-01', TRUE, 20),
(250, '2025-01-01', TRUE, 21), (180, '2025-01-01', TRUE, 22), (120, '2025-01-01', TRUE, 23), (300, '2025-01-01', TRUE, 24), (150, '2025-01-01', TRUE, 25),
(220, '2025-01-01', TRUE, 26), (110, '2025-01-01', TRUE, 27), (200, '2025-01-01', TRUE, 28), (140, '2025-01-01', TRUE, 29), (350, '2025-01-01', TRUE, 30),
(400, '2025-01-01', TRUE, 31), (180, '2025-01-01', TRUE, 32), (120, '2025-01-01', TRUE, 33), (300, '2025-01-01', TRUE, 34), (150, '2025-01-01', TRUE, 35),
(220, '2025-01-01', TRUE, 36), (110, '2025-01-01', TRUE, 37), (200, '2025-01-01', TRUE, 38), (140, '2025-01-01', TRUE, 39), (350, '2025-01-01', TRUE, 40);


-- 4. TABLES DE DONNEES ET DE TRANSACTIONS (DOIVENT VENIR APRES LES CLES PARENTES)
INSERT INTO section (section_number, start_date, quantity_planted, end_date, section_active, "vegetableIdVegetable", "sectionPlanIdSectionPlan") VALUES
-- SECTIONS CLES QUI SERONT RETOURNEES (Sole 1, Periode de recherche : Mars 2025 - Mai 2025)
(1, '2025-03-15', 100, '2025-06-30', FALSE, 1, 1),
(2, '2025-03-20', 120, '2025-06-30', FALSE, 2, 2),
(3, '2025-03-25', 110, '2025-07-01', FALSE, 3, 3),
(1, '2025-04-01', 105, '2025-07-05', FALSE, 4, 4),
(2, '2025-04-01', 100, '2025-07-30', FALSE, 25, 5),
(3, '2025-04-10', 120, '2025-07-30', FALSE, 26, 6),
(1, '2025-04-20', 110, '2025-08-01', FALSE, 27, 7),
(2, '2025-04-25', 150, '2025-08-05', FALSE, 28, 8),
(3, '2025-05-01', 130, '2025-08-10', FALSE, 29, 9),
(1, '2025-05-10', 90, '2025-08-15', FALSE, 30, 10),

-- Autres sections (hors periode ou hors Sole) : conservees pour la completude
(1, '2024-04-01', 100, '2024-07-30', FALSE, 1, 1), (2, '2024-04-10', 120, '2024-07-30', FALSE, 2, 2), (3, '2024-04-20', 110, '2024-08-01', FALSE, 3, 3),
(1, '2024-04-25', 150, '2024-08-05', FALSE, 4, 4), (2, '2024-05-01', 130, '2024-08-10', FALSE, 5, 5), (3, '2024-05-10', 90, '2024-08-15', FALSE, 6, 6),
(1, '2024-05-15', 110, '2024-08-20', FALSE, 7, 7), (2, '2024-05-20', 100, '2024-08-25', FALSE, 8, 8), (3, '2024-05-25', 140, '2024-09-01', FALSE, 9, 9),
(1, '2025-06-01', 105, '2025-09-10', FALSE, 10, 10), (2, '2025-06-05', 115, '2025-09-15', FALSE, 11, 11), (3, '2025-06-10', 95, '2025-09-20', FALSE, 12, 12),
(1, '2024-04-01', 100, '2024-07-30', FALSE, 13, 13), (2, '2024-04-10', 120, '2024-07-30', FALSE, 14, 14), (3, '2024-04-20', 110, '2024-08-01', FALSE, 15, 15),
(1, '2025-04-25', 150, '2025-08-05', FALSE, 16, 16), (2, '2025-05-01', 130, '2025-08-10', FALSE, 17, 17), (3, '2025-05-10', 90, '2025-08-15', FALSE, 18, 18),
(1, '2025-05-15', 110, '2025-08-20', FALSE, 19, 19), (2, '2025-05-20', 100, '2025-08-25', FALSE, 20, 20), (3, '2025-05-25', 140, '2025-09-01', FALSE, 21, 1),
(1, '2025-06-01', 105, '2025-09-10', FALSE, 22, 2), (2, '2025-06-05', 115, '2025-09-15', FALSE, 23, 3), (3, '2025-06-10', 95, '2025-09-20', FALSE, 24, 4),
(1, '2025-04-25', 150, '2025-08-05', FALSE, 28, 8), (2, '2025-05-01', 130, '2025-08-10', FALSE, 29, 9), (3, '2025-05-10', 90, '2025-08-15', FALSE, 30, 10),
(1, '2025-05-15', 110, '2025-08-20', FALSE, 31, 11), (2, '2025-05-20', 100, '2025-08-25', FALSE, 32, 12), (3, '2025-05-25', 140, '2025-09-01', FALSE, 33, 13),
(1, '2025-06-01', 105, '2025-09-10', FALSE, 34, 14), (2, '2025-06-05', 115, '2025-09-15', FALSE, 35, 15), (3, '2025-06-10', 95, '2025-09-20', FALSE, 36, 16),
(1, '2025-04-01', 100, '2025-07-30', FALSE, 37, 17), (2, '2025-04-10', 120, '2025-07-30', FALSE, 38, 18), (3, '2025-04-20', 110, '2025-08-01', FALSE, 39, 19),
(1, '2025-04-25', 150, '2025-08-05', FALSE, 40, 20), (2, '2025-05-01', 130, '2025-08-10', FALSE, 1, 1), (3, '2025-05-10', 90, '2025-08-15', FALSE, 2, 2),
(1, '2025-05-15', 110, '2025-08-20', FALSE, 3, 3), (2, '2025-05-20', 100, '2025-08-25', FALSE, 4, 4), (3, '2025-05-25', 140, '2025-09-01', FALSE, 5, 5),
(1, '2025-06-01', 105, '2025-09-10', FALSE, 6, 6), (2, '2025-06-05', 115, '2025-09-15', FALSE, 7, 7), (3, '2025-06-10', 95, '2025-09-20', FALSE, 8, 8),
(1, '2025-04-01', 100, '2025-07-30', FALSE, 9, 9), (2, '2025-04-10', 120, '2025-07-30', FALSE, 10, 10), (3, '2025-04-20', 110, '2025-08-01', FALSE, 11, 11),
(1, '2025-04-25', 150, '2025-08-05', FALSE, 12, 12), (2, '2025-05-01', 130, '2025-08-10', FALSE, 13, 13), (3, '2025-05-10', 90, '2025-08-15', FALSE, 14, 14),
(1, '2025-05-15', 110, '2025-08-20', FALSE, 15, 15), (2, '2025-05-20', 100, '2025-08-25', FALSE, 16, 16), (3, '2025-05-25', 140, '2025-09-01', FALSE, 17, 17),
(1, '2025-06-01', 105, '2025-09-10', FALSE, 18, 18), (2, '2025-06-05', 115, '2025-09-15', FALSE, 19, 19), (3, '2025-06-10', 95, '2025-09-20', FALSE, 20, 20),
(1, '2025-04-01', 100, '2025-07-30', FALSE, 21, 1), (2, '2025-04-10', 120, '2025-07-30', FALSE, 22, 2), (3, '2025-04-20', 110, '2025-08-01', FALSE, 23, 3),
(1, '2025-04-25', 150, '2025-08-05', FALSE, 24, 4), (2, '2025-05-01', 130, '2025-08-10', FALSE, 25, 5), (3, '2025-05-10', 90, '2025-08-15', FALSE, 26, 6),
(1, '2025-05-15', 110, '2025-08-20', FALSE, 27, 7), (2, '2025-05-20', 100, '2025-08-25', FALSE, 28, 8), (3, '2025-05-25', 140, '2025-09-01', FALSE, 29, 9),
(1, '2025-06-01', 105, '2025-09-10', FALSE, 30, 10), (2, '2025-06-05', 115, '2025-09-15', FALSE, 31, 11), (3, '2025-06-10', 95, '2025-09-20', FALSE, 32, 12),
(1, '2025-04-01', 100, '2025-07-30', FALSE, 33, 13), (2, '2025-04-10', 120, '2025-07-30', FALSE, 34, 14), (3, '2025-04-20', 110, '2025-08-01', FALSE, 35, 15),
(1, '2025-04-25', 150, '2025-08-05', FALSE, 36, 16), (2, '2025-05-01', 130, '2025-08-10', FALSE, 37, 17), (3, '2025-05-10', 90, '2025-08-15', FALSE, 38, 18),
(1, '2025-05-15', 110, '2025-08-20', FALSE, 39, 19), (2, '2025-05-20', 100, '2025-08-25', FALSE, 40, 20), (3, '2025-05-25', 140, '2025-09-01', FALSE, 1, 1),
(1, '2025-06-01', 105, '2025-09-10', FALSE, 2, 2), (2, '2025-06-05', 115, '2025-09-15', FALSE, 3, 3), (3, '2025-06-10', 95, '2025-09-20', FALSE, 4, 4),
(1, '2025-04-01', 100, '2025-07-30', FALSE, 5, 5), (2, '2025-04-10', 120, '2025-07-30', FALSE, 6, 6), (3, '2025-04-20', 110, '2025-08-01', FALSE, 7, 7),
(1, '2025-04-25', 150, '2025-08-05', FALSE, 8, 8), (2, '2025-05-01', 130, '2025-08-10', FALSE, 9, 9), (3, '2025-05-10', 90, '2025-08-15', FALSE, 10, 10),
(1, '2025-05-15', 110, '2025-08-20', FALSE, 11, 11), (2, '2025-05-20', 100, '2025-08-25', FALSE, 12, 12), (3, '2025-05-25', 140, '2025-09-01', FALSE, 13, 13),
(1, '2025-06-01', 105, '2025-09-10', FALSE, 14, 14), (2, '2025-06-05', 115, '2025-09-15', FALSE, 15, 15), (3, '2025-06-10', 95, '2025-09-20', FALSE, 16, 16),
(1, '2025-04-01', 100, '2025-07-30', FALSE, 17, 17), (2, '2025-04-10', 120, '2025-07-30', FALSE, 18, 18), (3, '2025-04-20', 110, '2025-08-01', FALSE, 19, 19),
(1, '2025-04-25', 150, '2025-08-05', FALSE, 20, 20);

INSERT INTO watering (watering_date, "sectionIdSection") VALUES
('2025-05-01 08:00:00', 1),
('2025-05-05 08:00:00', 1),
('2025-05-10 08:00:00', 1),
('2025-05-02 09:00:00', 2),
('2025-05-06 09:00:00', 2),
('2025-05-11 09:00:00', 2),
('2025-05-01 08:00:00', 16),
('2025-05-05 08:00:00', 16),
('2025-05-10 08:00:00', 16);

INSERT INTO amended (amendment_date, treatment_quantity, treatment_unit, "boardIdBoard", "amendementIdAmendement") VALUES
('2025-03-01', 200, 'kg', 1, 1), ('2025-03-05', 250, 'kg', 2, 2),
('2025-03-25', 220, 'kg', 6, 1), ('2025-03-30', 280, 'kg', 7, 2);

INSERT INTO treated (treatment_date, treatment_quantity, treatment_unit, "boardIdBoard", "treatmentIdTreatment") VALUES
('2025-05-10', 5, 'L', 21, 1), ('2025-05-13', 6, 'L', 22, 2);

INSERT INTO "order" (order_date, order_delivery, "user_idUser") VALUES
('2025-07-06', '2025-07-08', 3),
('2025-07-20', '2025-07-22', 4);

INSERT INTO order_detail (quantity, quantity_unit, unit_price, "vegetableIdVegetable", "orderIdOrder") VALUES
(10, 'tete', 250, 1, 1), (5, 'kg', 180, 2, 1), (8, 'tete', 120, 3, 1),
(7, 'tete', 140, 9, 2), (11, 'kg', 350, 10, 2);

INSERT INTO harvest (harvest_date, quantity, quantity_unit, "user_idUser", "sectionIdSection") VALUES
('2025-08-01 13:00:00', 90, 'kg', 3, 16),
('2025-08-05 14:00:00', 150, 'tete', 4, 20);

COMMIT;