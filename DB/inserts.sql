BEGIN;

-- =====================================================
-- 1. TABLES DE BASE
-- =====================================================
INSERT INTO role (role_name) VALUES
('formateur'), ('stagiaire');

INSERT INTO family_importance (importance_name) VALUES
('primaire'), ('secondaire'), ('tertiaire');

INSERT INTO family (family_name, "familyImportanceIdFamilyImportance") VALUES
('Brassicacees', 1), ('Solanacees', 1), ('Rosacees', 1), ('Vitacees', 1), ('Fagacees', 1),
('Cruciferes', 1), ('Fabacees', 2), ('Apiacees', 2), ('Cucurbitacees', 2), ('Amaryllidacees', 2),
('Malvacees', 2), ('Euphorbiacees', 2), ('Asteracees', 3), ('Poacees', 3), ('Chenopodiaceae', 3),
('Lamiacees', 3), ('Cannabinacees', 3), ('Polygonacees', 3), ('Amaranthacees', 3), ('Persicacees', 3);

INSERT INTO amendement (amendment_name) VALUES
('Compost'), ('Fumier de cheval'), ('Engrais vert'), ('Chaux agricole'), ('Broyat de bois');

INSERT INTO treatment (treatment_name) VALUES
('Purin d ortie'), ('Savon noir'), ('Decoction de prele'), ('Huile essentielle de Thym'),
('Sulfate de cuivre (Bouillie bordelaise)'), ('Pieges a pheromones'), ('Bacillus thuringiensis'),
('Soufre mouillable'), ('Rotenone'), ('Pyrethre naturel');

-- =====================================================
-- 2. USERS ET EXPLOITATIONS
-- =====================================================
DO $$
DECLARE
    bcrypt_hash TEXT := '$2a$10$5tq0kH5m2X6d7K/j2uQkHj9H0kQOqUL8M7H6YgEkXpK';
BEGIN
    INSERT INTO "user_" (
        user_first_name, user_last_name, birth_date, email, hpassword, phone, path_photo, user_active, id_role, "harvestIdHarvest"
    ) VALUES
    ('Sylvie', 'Dubois', '1980-01-01', 'sylvie@culturo.be', bcrypt_hash, '0471111111', NULL, TRUE, 1, NULL),
    ('Marc', 'Lefevre', '1985-05-15', 'marc@culturo.be', bcrypt_hash, '0472222222', NULL, TRUE, 2, NULL),
    ('Antoine', 'Ferma', '1995-01-01', 'antoine@culturo.be', bcrypt_hash, '0473333333', NULL, TRUE, 2, NULL);
END $$;

INSERT INTO exploitation (exploitation_name, exploitation_locality, exploitation_active, "user_idUser") VALUES
('Domaine du Chene', 'Bruxelles', TRUE, 1),
('Le Hameau Vert', 'Namur', TRUE, 2);

-- =====================================================
-- 3. SOLE + BOARD (40 boards)
-- =====================================================
INSERT INTO sole (sole_name, "exploitationIdExploitation") VALUES
('SOLE Nord', 1), ('SOLE Sud', 1), ('SOLE Ouest', 2), ('SOLE Est', 2);

INSERT INTO board (board_name, board_width, board_length, board_active, id_sole) VALUES
('N1',120,500,TRUE,1),('N2',120,500,TRUE,1),('N3',120,500,TRUE,1),('N4',120,500,TRUE,1),
('N5',120,500,TRUE,1),('N6',120,500,TRUE,1),('N7',120,500,TRUE,1),('N8',120,500,TRUE,1),
('N9',120,500,TRUE,1),('N10',120,500,TRUE,1),
('S1',120,500,TRUE,2),('S2',120,500,TRUE,2),('S3',120,500,TRUE,2),('S4',120,500,TRUE,2),
('S5',120,500,TRUE,2),('S6',120,500,TRUE,2),('S7',120,500,TRUE,2),('S8',120,500,TRUE,2),
('S9',120,500,TRUE,2),('S10',120,500,TRUE,2),
('O1',120,500,TRUE,3),('O2',120,500,TRUE,3),('O3',120,500,TRUE,3),('O4',120,500,TRUE,3),
('O5',120,500,TRUE,3),('O6',120,500,TRUE,3),('O7',120,500,TRUE,3),('O8',120,500,TRUE,3),
('O9',120,500,TRUE,3),('O10',120,500,TRUE,3),
('E1',120,500,TRUE,4),('E2',120,500,TRUE,4),('E3',120,500,TRUE,4),('E4',120,500,TRUE,4),
('E5',120,500,TRUE,4),('E6',120,500,TRUE,4),('E7',120,500,TRUE,4),('E8',120,500,TRUE,4),
('E9',120,500,TRUE,4),('E10',120,500,TRUE,4);

-- =====================================================
-- 4. VEGETABLES (20 légumes)
-- =====================================================
INSERT INTO vegetable (
    variety_name, vegetable_name, planting_season, harvest_season, harvest_duration_min, 
    harvest_duration_max, inrow_distance, estimated_yield, "familyIdFamily"
) VALUES
('Chou de Milan','Chou','printemps','automne',60,120,40,150,1), ('Chou-fleur','Chou','printemps','été',70,130,35,140,1),           
('Brocoli','Brocoli','printemps','été',65,120,30,160,1), ('Navet','Navet','printemps','automne',50,110,25,130,1),            
('Radis','Radis','printemps','été',25,50,5,80,1), ('Tomate cerise','Tomate','printemps','été',90,150,50,200,2),      
('Tomate ronde','Tomate','printemps','été',85,145,50,190,2), ('Aubergine','Aubergine','printemps','été',100,160,50,180,2),      
('Poivron','Poivron','printemps','été',90,150,50,170,2), ('Piment','Piment','printemps','été',80,140,40,160,2),             
('Pois','Pois','printemps','été',60,120,5,120,7), ('Haricot','Haricot','printemps','été',65,130,8,110,7),            
('Lentille','Lentille','printemps','été',70,140,5,100,7), ('Fève','Fève','printemps','été',75,150,10,90,7),                  
('Soja','Soja','printemps','été',80,160,10,80,7), ('Carotte nantaise','Carotte','printemps','été',70,100,5,120,8),   
('Poireau','Poireau','printemps','hiver',100,180,15,180,8), ('Celeri','Celeri','printemps','été',60,120,20,140,8),              
('Fenouil','Fenouil','printemps','été',50,100,15,130,8), ('Persil','Persil','printemps','été',30,60,10,130,8); 

-- =====================================================
-- 5. VARIETY
-- =====================================================
INSERT INTO variety (variety_name, id_vegetable) VALUES
('Chou de Milan Vert',1), ('Chou de Milan Rouge',1),
('Chou-fleur Blanche',2), ('Chou-fleur Violet',2),
('Brocoli Calabrese',3), ('Brocoli Romanesco',3),
('Navet Rond',4), ('Navet Long',4),
('Radis Rouge',5), ('Radis Blanc',5),
('Tomate Cerise Jaune',6), ('Tomate Cerise Rouge',6),
('Tomate Ronde Rouge',7), ('Tomate Ronde Jaune',7),
('Aubergine Violette',8), ('Aubergine Blanche',8),
('Poivron Rouge',9), ('Poivron Vert',9),
('Piment Fort',10), ('Piment Doux',10),
('Pois Mangetout',11), ('Pois Mange-tout',11),
('Haricot Vert',12), ('Haricot Blanc',12),
('Lentille Verte',13), ('Lentille Rose',13),
('Fève Large',14), ('Fève Commune',14),
('Soja Jaune',15), ('Soja Vert',15),
('Carotte Nantaise Orange',16), ('Carotte Nantaise Jaune',16),
('Poireau Bleu',17), ('Poireau Blanc',17),
('Celeri Branche',18), ('Celeri Rave',18),
('Fenouil Violet',19), ('Fenouil Blanc',19),
('Persil Plat',20), ('Persil Frisé',20);

-- =====================================================
-- 6. SECTION PLAN
-- =====================================================
INSERT INTO section_plan (creation_date, number_of_section, section_plan_active, id_board) VALUES
-- Sole 1 (Boards 1 à 10)
('2024-01-01',3,TRUE,1),('2024-01-01',3,TRUE,2),('2024-01-01',3,TRUE,3),('2024-01-01',3,TRUE,4),
('2024-01-01',3,TRUE,5),('2024-01-01',3,TRUE,6),('2024-01-01',3,TRUE,7),('2024-01-01',3,TRUE,8),
('2024-01-01',3,TRUE,9),('2024-01-01',3,TRUE,10),
-- Sole 2 (Boards 11 à 20)
-- ('2024-02-01',3,TRUE,11),('2024-02-01',3,TRUE,12),('2024-02-01',3,TRUE,13),('2024-02-01',3,TRUE,14),
-- ('2024-02-01',3,TRUE,15),('2024-02-01',3,TRUE,16),('2024-02-01',3,TRUE,17),('2024-02-01',3,TRUE,18),
-- ('2024-02-01',3,TRUE,19),('2024-02-01',3,TRUE,20),
-- Sole 3 (Boards 21 à 30)
('2024-03-01',3,TRUE,21),('2024-03-01',3,TRUE,22),('2024-03-01',3,TRUE,23),('2024-03-01',3,TRUE,24),
('2024-03-01',3,TRUE,25),('2024-03-01',3,TRUE,26),('2024-03-01',3,TRUE,27),('2024-03-01',3,TRUE,28),
('2024-03-01',3,TRUE,29),('2024-03-01',3,TRUE,30),
-- Sole 4 (Boards 31 à 40)
('2024-04-01',3,TRUE,31),('2024-04-01',3,TRUE,32),('2024-04-01',3,TRUE,33),('2024-04-01',3,TRUE,34),
('2024-04-01',3,TRUE,35),('2024-04-01',3,TRUE,36),('2024-04-01',3,TRUE,37),('2024-04-01',3,TRUE,38),
('2024-04-01',3,TRUE,39),('2024-04-01',3,TRUE,40);

-- =====================================================
-- 7. SECTION
-- Création de 1 section par section_plan pour éviter les FK errors
-- =====================================================
INSERT INTO section (section_number, start_date, quantity_planted, end_date, section_active, id_vegetable, "sectionPlanIdSectionPlan") VALUES
(1,'2024-01-01',50,'2024-04-01',TRUE,1,1),
(1,'2024-01-01',50,'2024-04-01',TRUE,2,2),
(1,'2024-01-01',50,'2024-04-01',TRUE,3,3),
(1,'2024-01-01',50,'2024-04-01',TRUE,4,4);

-- Tu peux compléter les autres sections comme tu veux pour correspondre aux section_plans 5 à 40

-- =====================================================
-- 8. WATERING
-- =====================================================
INSERT INTO watering(watering_date, "sectionIdSection") VALUES
('2024-02-10',1), ('2024-02-12',2), ('2024-02-15',3);

-- =====================================================
-- 9. HARVEST
-- =====================================================
INSERT INTO harvest(harvest_date, quantity, quantity_unit, "user_idUser", "sectionIdSection") VALUES
('2024-04-15',50,'kg',1,1), ('2024-04-15',60,'kg',1,2), ('2024-04-15',55,'kg',1,3);

COMMIT;
