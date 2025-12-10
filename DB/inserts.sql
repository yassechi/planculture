BEGIN;

-- =====================================================
-- 1. TABLES DE BASE
-- =====================================================
INSERT INTO role (role_name) VALUES
('formateur'),
('stagiaire');

INSERT INTO family_importance (importance_name) VALUES
('primaire'),
('secondaire'),
('tertiaire');

-- =====================================================
-- Families (20 familles)
-- =====================================================
INSERT INTO family (family_name, "familyImportanceIdFamilyImportance") VALUES
('Brassicacees', 1),  -- ID 1 (Primaire)
('Solanacees', 1),    -- ID 2 (Primaire)
('Rosacees', 1),      -- ID 3 (Primaire)
('Vitacees', 1),      -- ID 4 (Primaire)
('Fagacees', 1),      -- ID 5 (Primaire)
('Cruciferes', 1),    -- ID 6 (Primaire)
('Fabacees', 2),      -- ID 7 (Secondaire)
('Apiacees', 2),      -- ID 8 (Secondaire)
('Cucurbitacees', 2), -- ID 9 (Secondaire)
('Amaryllidacees', 2),-- ID 10 (Secondaire)
('Malvacees', 2),     -- ID 11 (Secondaire)
('Euphorbiacees', 2), -- ID 12 (Secondaire)
('Asteracees', 3),    -- ID 13 (Tertiaire)
('Poacees', 3),       -- ID 14 (Tertiaire)
('Chenopodiaceae', 3),-- ID 15 (Tertiaire)
('Lamiacees', 3),     -- ID 16 (Tertiaire)
('Cannabinacees', 3), -- ID 17 (Tertiaire)
('Polygonacees', 3),  -- ID 18 (Tertiaire)
('Amaranthacees', 3), -- ID 19 (Tertiaire)
('Persicacees', 3);   -- ID 20 (Tertiaire)

-- =====================================================
-- Amendements
-- =====================================================
INSERT INTO amendement (amendment_name) VALUES
('Compost'),
('Fumier de cheval'),
('Engrais vert'),
('Chaux agricole'),
('Broyat de bois');

-- =====================================================
-- Treatments
-- =====================================================
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

-- =====================================================
-- 2. USERS ET EXPLOITATIONS
-- =====================================================
DO $$
DECLARE
    bcrypt_hash TEXT := '$2a$10$5tq0kH5m2X6d7K/j2uQkHj9H0kQOqUL8M7H6YgEkXpK'; 
BEGIN
    INSERT INTO "user_" (
        user_first_name, user_last_name, birth_date, email,
        hpassword, phone, path_photo, user_active, id_role, "harvestIdHarvest"
    ) VALUES
    ('Sylvie', 'Dubois', '1980-01-01', 'sylvie@culturo.be', bcrypt_hash, '0471111111', NULL, TRUE, 1, NULL),
    ('Marc', 'Lefevre', '1985-05-15', 'marc@culturo.be', bcrypt_hash, '0472222222', NULL, TRUE, 2, NULL),
    ('Antoine', 'Ferma', '1995-01-01', 'antoine@culturo.be', bcrypt_hash, '0473333333', NULL, TRUE, 2, NULL);
END $$;


INSERT INTO exploitation (exploitation_name, exploitation_locality, exploitation_active, "user_idUser") VALUES
('Domaine du Chene', 'Bruxelles', TRUE, 1), -- ID 1
('Le Hameau Vert', 'Namur', TRUE, 2);      -- ID 2

-- =====================================================
-- 3. SOLE + BOARD (4 Soles, 10 boards chacune = 40 boards)
-- =====================================================
INSERT INTO sole (sole_name, "exploitationIdExploitation") VALUES
('SOLE Nord', 1), -- ID 1
('SOLE Sud', 1),  -- ID 2
('SOLE Ouest', 2),-- ID 3
('SOLE Est', 2);  -- ID 4

-- Sole 1 (id_sole = 1) -> Boards 1 à 10
INSERT INTO board (board_name, board_width, board_length, board_active, id_sole) VALUES
('Bande 101',120,500,TRUE,1),('Bande 102',120,500,TRUE,1),('Bande 103',120,500,TRUE,1),
('Bande 104',120,500,TRUE,1),('Bande 105',120,500,TRUE,1),('Bande 106',120,500,TRUE,1),
('Bande 107',120,500,TRUE,1),('Bande 108',120,500,TRUE,1),('Bande 109',120,500,TRUE,1),('Bande 110',120,500,TRUE,1),
-- Sole 2 (id_sole = 2) -> Boards 11 à 20
('Bande 201',120,500,TRUE,2),('Bande 202',120,500,TRUE,2),('Bande 203',120,500,TRUE,2),
('Bande 204',120,500,TRUE,2),('Bande 205',120,500,TRUE,2),('Bande 206',120,500,TRUE,2),
('Bande 207',120,500,TRUE,2),('Bande 208',120,500,TRUE,2),('Bande 209',120,500,TRUE,2),('Bande 210',120,500,TRUE,2),
-- Sole 3 (id_sole = 3) -> Boards 21 à 30
('Bande 301',120,500,TRUE,3),('Bande 302',120,500,TRUE,3),('Bande 303',120,500,TRUE,3),
('Bande 304',120,500,TRUE,3),('Bande 305',120,500,TRUE,3),('Bande 306',120,500,TRUE,3),
('Bande 307',120,500,TRUE,3),('Bande 308',120,500,TRUE,3),('Bande 309',120,500,TRUE,3),('Bande 310',120,500,TRUE,3),
-- Sole 4 (id_sole = 4) -> Boards 31 à 40
('Bande 401',120,500,TRUE,4),('Bande 402',120,500,TRUE,4),('Bande 403',120,500,TRUE,4),
('Bande 404',120,500,TRUE,4),('Bande 405',120,500,TRUE,4),('Bande 406',120,500,TRUE,4),
('Bande 407',120,500,TRUE,4),('Bande 408',120,500,TRUE,4),('Bande 409',120,500,TRUE,4),('Bande 410',120,500,TRUE,4);

-- =====================================================
-- 4. VEGETABLES (20 légumes) - CORRIGÉ
-- =====================================================
INSERT INTO vegetable (
    variety_name, vegetable_name, planting_season, harvest_season,
    harvest_duration_min, harvest_duration_max, inrow_distance,
    estimated_yield, "familyIdFamily"
) VALUES
('Chou de Milan','Chou','printemps','automne',60,120,40,150,1),   -- ID 1 (Brassicacées - Primaire)
('Chou-fleur','Chou','printemps','été',70,130,35,140,1),           -- ID 2
('Brocoli','Brocoli','printemps','été',65,120,30,160,1),           -- ID 3
('Navet','Navet','printemps','automne',50,110,25,130,1),            -- ID 4
('Radis','Radis','printemps','été',25,50,5,80,1),                  -- ID 5
('Tomate cerise','Tomate','printemps','été',90,150,50,200,2),      -- ID 6 (Solanacées - Primaire)
('Tomate ronde','Tomate','printemps','été',85,145,50,190,2),       -- ID 7
('Aubergine','Aubergine','printemps','été',100,160,50,180,2),      -- ID 8
('Poivron','Poivron','printemps','été',90,150,50,170,2),           -- ID 9
('Piment','Piment','printemps','été',80,140,40,160,2),             -- ID 10
('Pois','Pois','printemps','été',60,120,5,120,7),                  -- ID 11 (Fabacées - Secondaire)
('Haricot','Haricot','printemps','été',65,130,8,110,7),            -- ID 12
('Lentille','Lentille','printemps','été',70,140,5,100,7),          -- ID 13
('Fève','Fève','printemps','été',75,150,10,90,7),                  -- ID 14
('Soja','Soja','printemps','été',80,160,10,80,7),                  -- ID 15
('Carotte nantaise','Carotte','printemps','été',70,100,5,120,8),   -- ID 16 (Apiacées - Secondaire)
('Poireau','Poireau','printemps','hiver',100,180,15,180,8),        -- ID 17
('Celeri','Celeri','printemps','été',60,120,20,140,8),             -- ID 18
('Fenouil','Fenouil','printemps','été',50,100,15,130,8),           -- ID 19
('Persil','Persil','printemps','été',30,60,10,130,8);             -- ID 20

-- =====================================================
-- 5. SECTION PLAN (1 par board, soit 40 plans)
-- ID Section Plan vont de 1 à 40
-- =====================================================
INSERT INTO section_plan (creation_date, number_of_section, section_plan_active, id_board) VALUES
-- Sole 1 (Boards 1 à 10) -> Section Plans 1 à 10
('2024-01-01',3,TRUE,1),('2024-01-01',3,TRUE,2),('2024-01-01',3,TRUE,3),
('2024-01-01',3,TRUE,4),('2024-01-01',3,TRUE,5),('2024-01-01',3,TRUE,6),
('2024-01-01',3,TRUE,7),('2024-01-01',3,TRUE,8),('2024-01-01',3,TRUE,9),('2024-01-01',3,TRUE,10),
-- Sole 2 (Boards 11 à 20) -> Section Plans 11 à 20
('2024-02-01',3,TRUE,11),('2024-02-01',3,TRUE,12),('2024-02-01',3,TRUE,13),
('2024-02-01',3,TRUE,14),('2024-02-01',3,TRUE,15),('2024-02-01',3,TRUE,16),
('2024-02-01',3,TRUE,17),('2024-02-01',3,TRUE,18),('2024-02-01',3,TRUE,19),('2024-02-01',3,TRUE,20),
-- Sole 3 (Boards 21 à 30) -> Section Plans 21 à 30
('2024-03-01',3,TRUE,21),('2024-03-01',3,TRUE,22),('2024-03-01',3,TRUE,23),
('2024-03-01',3,TRUE,24),('2024-03-01',3,TRUE,25),('2024-03-01',3,TRUE,26),
('2024-03-01',3,TRUE,27),('2024-03-01',3,TRUE,28),('2024-03-01',3,TRUE,29),('2024-03-01',3,TRUE,30),
-- Sole 4 (Boards 31 à 40) -> Section Plans 31 à 40
('2024-04-01',3,TRUE,31),('2024-04-01',3,TRUE,32),('2024-04-01',3,TRUE,33),
('2024-04-01',3,TRUE,34),('2024-04-01',3,TRUE,35),('2024-04-01',3,TRUE,36),
('2024-04-01',3,TRUE,37),('2024-04-01',3,TRUE,38),('2024-04-01',3,TRUE,39),('2024-04-01',3,TRUE,40);

-- =====================================================
-- 6. SECTION (Données de test pour les contraintes de rotation et d'occupation)
-- ATTENTION: end_date est obligatoire, donc les sections actives ont une date future.
-- =====================================================

--- SOLE 1 (Plans 1 à 10) ---
-- Plan 1 (Board 1): Rotation PRIMAIRE violée.
INSERT INTO section(section_number, start_date, quantity_planted, end_date, section_active, id_vegetable, "sectionPlanIdSectionPlan") VALUES
(1,'2022-04-01',50,'2022-07-01',FALSE,1,1),  -- Famille 1 (Brassicacées, Primaire)
(2,'2023-04-01',50,'2023-07-01',FALSE,1,1),  -- Famille 1 (Rotation violée si on replante Famille 1 avant Juil. 2028)
(3,'2024-01-01',50,'2024-04-01',FALSE,11,1); -- Famille 7 (Fabacées, Secondaire)

-- Plan 2 (Board 2): Cohabitation active existante.
INSERT INTO section(section_number, start_date, quantity_planted, end_date, section_active, id_vegetable, "sectionPlanIdSectionPlan") VALUES
(1,'2024-03-01',50,'2024-10-30',TRUE,6,2),   -- Famille 2 (Solanacées, Primaire) => ACTIF
(2,'2024-03-01',50,'2024-05-30',FALSE,16,2),
(3,'2024-06-01',50,'2024-09-30',FALSE,17,2);

-- Plans 3 à 5: Rotation OK
INSERT INTO section(section_number, start_date, quantity_planted, end_date, section_active, id_vegetable, "sectionPlanIdSectionPlan") VALUES
(1,'2019-01-01',50,'2019-04-01',FALSE,1,3), 
(1,'2019-01-01',50,'2019-04-01',FALSE,6,4), 
(1,'2023-08-01',50,'2023-11-01',FALSE,11,5); 

-- Plans 6 à 10: Historique récent mais secondaire/tertiaire (rotation OK).
INSERT INTO section(section_number, start_date, quantity_planted, end_date, section_active, id_vegetable, "sectionPlanIdSectionPlan") VALUES
(1,'2024-03-01',50,'2024-06-01',FALSE,11,6), 
(1,'2024-03-01',50,'2024-06-01',FALSE,16,7), 
(1,'2024-03-01',50,'2024-06-01',FALSE,13,8),
(1,'2024-03-01',50,'2024-06-01',FALSE,14,9),
(1,'2024-03-01',50,'2024-06-01',FALSE,15,10);

--- SOLE 2 (Plans 11 à 20) ---
-- Plan 11 (Board 11): OCCUPATION ACTIVE (Date de fin future fixée à 2025-05-01)
INSERT INTO section(section_number, start_date, quantity_planted, end_date, section_active, id_vegetable, "sectionPlanIdSectionPlan") VALUES
(1,'2024-05-01',50,'2025-05-01',TRUE,1,11), 
(2,'2024-05-01',50,'2024-12-31',FALSE,2,11); 

-- Plan 12 (Board 12): OCCUPATION (Chevauchement de Dates)
INSERT INTO section(section_number, start_date, quantity_planted, end_date, section_active, id_vegetable, "sectionPlanIdSectionPlan") VALUES
(1,'2024-06-01',50,'2024-08-30',FALSE,2,12), 
(2,'2024-10-01',50,'2024-12-31',FALSE,7,12);

--- SOLE 3 (Plans 21 à 30) ---
-- Plan 21 (Board 21): Cohabitation (Famille 2 Active - Date de fin future fixée)
INSERT INTO section(section_number, start_date, quantity_planted, end_date, section_active, id_vegetable, "sectionPlanIdSectionPlan") VALUES
(1,'2024-05-01',50,'2025-06-01',TRUE,6,21),   
(2,'2024-06-01',50,'2025-06-01',FALSE,16,21);

-- Plan 22 (Board 22): Rotation OK, mais Section 1 occupée (Active mais terminée dans le passé)
INSERT INTO section(section_number, start_date, quantity_planted, end_date, section_active, id_vegetable, "sectionPlanIdSectionPlan") VALUES
(1,'2024-01-01',50,'2024-04-01',TRUE,12,22), 
(2,'2018-12-01',50,'2019-04-01',FALSE,7,22); 


-- =====================================================
-- 7. WATERING (Exemples) - CORRIGÉ
-- =====================================================
INSERT INTO watering(watering_date, "sectionIdSection") VALUES
('2024-02-10',1),
('2024-02-12',2),
('2024-02-15',3);

-- =====================================================
-- 8. HARVEST (Exemples)
-- =====================================================
INSERT INTO harvest(harvest_date, quantity, quantity_unit, "user_idUser", "sectionIdSection") VALUES
('2024-04-15',50,'kg',1,1),
('2024-04-15',60,'kg',1,2),
('2024-04-15',55,'kg',1,3);

COMMIT;