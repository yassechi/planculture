BEGIN;

-- ===========================================
-- 1. ROLES
-- ===========================================
INSERT INTO role (role_name) VALUES
('formateur'), ('stagiaire');

-- ===========================================
-- 2. FAMILY IMPORTANCE
-- ===========================================
INSERT INTO family_importance (importance_name) VALUES
('primaire'),('secondaire'),('tertiaire');

-- ===========================================
-- 3. FAMILY
-- ===========================================
INSERT INTO family (family_name, "familyImportanceIdFamilyImportance") VALUES
('Brassicacees',1),('Solanacees',1),('Rosacees',1),('Vitacees',1),('Fagacees',1),
('Cruciferes',1),('Fabacees',2),('Apiacees',2),('Cucurbitacees',2),('Amaryllidacees',2),
('Malvacees',2),('Euphorbiacees',2),('Asteracees',3),('Poacees',3),('Chenopodiaceae',3),
('Lamiacees',3),('Cannabinacees',3),('Polygonacees',3),('Amaranthacees',3),('Persicacees',3);

-- ===========================================
-- 4. AMENDEMENTS
-- ===========================================
INSERT INTO amendement (amendment_name) VALUES
('Compost'),('Fumier de cheval'),('Engrais vert'),('Chaux agricole'),('Broyat de bois');

-- ===========================================
-- 5. TRAITEMENTS
-- ===========================================
INSERT INTO treatment (treatment_name) VALUES
('Purin d ortie'),('Savon noir'),('Decoction de prele'),
('Huile essentielle de Thym'),('Bouillie bordelaise'),
('Pieges a pheromones'),('Bacillus thuringiensis'),
('Soufre mouillable'),('Rotenone'),('Pyrethre naturel');

-- ===========================================
-- 6. USERS (hpassword = hash de "123456")
-- ===========================================
INSERT INTO "user_" (
    user_first_name, user_last_name, birth_date, email, hpassword, phone, user_active, "id_role"
) VALUES
('Sylvie','Dubois','1980-01-01','sylvie@culturo.be','$2a$10$zJqIwtJxwBvFExvP6ZtjUu6RmZ3oIp6fM0yWj7RrULCOk2z/CBXqG','0471111111',TRUE,1),
('Marc','Lefevre','1985-05-15','marc@culturo.be','$2a$10$zJqIwtJxwBvFExvP6ZtjUu6RmZ3oIp6fM0yWj7RrULCOk2z/CBXqG','0472222222',TRUE,2),
('Antoine','Ferma','1995-01-01','antoine@culturo.be','$2a$10$zJqIwtJxwBvFExvP6ZtjUu6RmZ3oIp6fM0yWj7RrULCOk2z/CBXqG','0473333333',TRUE,2);

-- ===========================================
-- 7. EXPLOITATIONS
-- ===========================================
INSERT INTO exploitation (
    exploitation_name, exploitation_locality, exploitation_active, "user_idUser"
) VALUES
('Domaine du Chene','Bruxelles',TRUE,1),
('Le Hameau Vert','Namur',TRUE,2);

-- ===========================================
-- 8. SOLES
-- ===========================================
INSERT INTO sole (sole_name, "exploitationIdExploitation") VALUES
('SOLE Nord',1),('SOLE Sud',1),('SOLE Ouest',2),('SOLE Est',2);

-- ===========================================
-- 9. BOARDS
-- ===========================================
-- Nord
INSERT INTO board (board_name, board_width, board_length, board_active, id_sole) VALUES
('N1',120,500,TRUE,1),('N2',120,500,TRUE,1),('N3',120,500,TRUE,1),('N4',120,500,TRUE,1),
('N5',120,500,TRUE,1),('N6',120,500,TRUE,1),('N7',120,500,TRUE,1),('N8',120,500,TRUE,1),
('N9',120,500,TRUE,1),('N10',120,500,TRUE,1);
-- Sud
INSERT INTO board (board_name, board_width, board_length, board_active, id_sole) VALUES
('S1',120,500,TRUE,2),('S2',120,500,TRUE,2),('S3',120,500,TRUE,2),('S4',120,500,TRUE,2),
('S5',120,500,TRUE,2),('S6',120,500,TRUE,2),('S7',120,500,TRUE,2),('S8',120,500,TRUE,2),
('S9',120,500,TRUE,2),('S10',120,500,TRUE,2);
-- Ouest
INSERT INTO board (board_name, board_width, board_length, board_active, id_sole) VALUES
('O1',120,500,TRUE,3),('O2',120,500,TRUE,3),('O3',120,500,TRUE,3),('O4',120,500,TRUE,3),
('O5',120,500,TRUE,3),('O6',120,500,TRUE,3),('O7',120,500,TRUE,3),('O8',120,500,TRUE,3),
('O9',120,500,TRUE,3),('O10',120,500,TRUE,3);
-- Est
INSERT INTO board (board_name, board_width, board_length, board_active, id_sole) VALUES
('E1',120,500,TRUE,4),('E2',120,500,TRUE,4),('E3',120,500,TRUE,4),('E4',120,500,TRUE,4),
('E5',120,500,TRUE,4),('E6',120,500,TRUE,4),('E7',120,500,TRUE,4),('E8',120,500,TRUE,4),
('E9',120,500,TRUE,4),('E10',120,500,TRUE,4);

-- ===========================================
-- 10. VEGETABLES
-- ===========================================
INSERT INTO vegetable (
    variety_id, vegetable_name, planting_season, harvest_season,
    harvest_duration_min, harvest_duration_max, inrow_distance, in_row_spacing, estimated_yield, "familyIdFamily"
) VALUES
(1,'Chou','printemps','automne',60,120,40,40,150,1),
(2,'Brocoli','printemps','été',65,120,30,30,160,1),
(3,'Tomate','printemps','été',90,150,50,50,200,2),
(4,'Carotte','printemps','été',70,100,5,5,120,8),
(5,'Poireau','printemps','hiver',100,180,15,15,80,8),
(6,'Celeri','printemps','été',60,120,20,20,140,8),
(7,'Fenouil','printemps','été',50,100,15,15,130,8),
(8,'Persil','printemps','été',30,60,10,10,130,8),
(9,'Courgette','printemps','été',50,100,50,50,180,2),
(10,'Aubergine','printemps','été',80,150,50,50,180,2),
(11,'Poivron','printemps','été',80,150,50,50,180,2),
(12,'Radis','printemps','été',25,50,5,5,120,3),
(13,'Epinard','printemps','été',30,60,5,5,140,3);

-- ===========================================
-- 11. VARIETIES
-- ===========================================
INSERT INTO variety (variety_name, id_vegetable) VALUES
('Chou de Milan', 1),
('Chou de Bruxelles', 1),
('Chou de Rabat', 1),
('Brocoli Calabrese', 2),
('Tomate Cerise', 3),
('Carotte Nantaise', 4),
('Poireau Bleu', 5),
('Celeri Branche', 6),
('Fenouil Blanc', 7),
('Persil Plat', 8),
('Courgette Verte', 9),
('Aubergine', 10),
('Poivron Rouge', 11),
('Radis', 12),
('Epinard', 13);

-- ===========================================
-- 12. SECTION_PLANS (1 plan par board)
-- ===========================================
INSERT INTO section_plan (creation_date, number_of_section, section_plan_active, id_board) VALUES
('2024-03-01',3,TRUE,1),('2024-03-02',3,TRUE,2),('2024-03-03',3,TRUE,3),('2024-03-04',3,TRUE,4),
('2024-03-05',3,TRUE,5),('2024-03-06',3,TRUE,6),('2024-03-07',3,TRUE,7),('2024-03-08',3,TRUE,8),
('2024-03-09',3,TRUE,9),('2024-03-10',3,TRUE,10),('2024-03-11',3,TRUE,11),('2024-03-12',3,TRUE,12),
('2024-03-13',3,TRUE,13),('2024-03-14',3,TRUE,14),('2024-03-15',3,TRUE,15),('2024-03-16',3,TRUE,16),
('2024-03-17',3,TRUE,17),('2024-03-18',3,TRUE,18),('2024-03-19',3,TRUE,19),('2024-03-20',3,TRUE,20),
('2024-03-21',3,TRUE,21),('2024-03-22',3,TRUE,22),('2024-03-23',3,TRUE,23),('2024-03-24',3,TRUE,24),
('2024-03-25',3,TRUE,25),('2024-03-26',3,TRUE,26),('2024-03-27',3,TRUE,27),('2024-03-28',3,TRUE,28),
('2024-03-29',3,TRUE,29),('2024-03-30',3,TRUE,30),('2024-03-31',3,TRUE,31),('2024-04-01',3,TRUE,32),
('2024-04-02',3,TRUE,33),('2024-04-03',3,TRUE,34),('2024-04-04',3,TRUE,35),('2024-04-05',3,TRUE,36),
('2024-04-06',3,TRUE,37),('2024-04-07',3,TRUE,38),('2024-04-08',3,TRUE,39),('2024-04-09',3,TRUE,40);

-- ===========================================
-- 13. SECTIONS (120 sections, 3 par plan)
-- ===========================================
INSERT INTO section (
    section_number, start_date, quantity_planted, unity, end_date,
    section_active, id_vegetable, "sectionPlanIdSectionPlan"
) VALUES
-- Plans 1 à 20 (moitié 2024, fin 2024)
(1,'2024-01-10',50,'plants','2024-04-10',TRUE,1,1),
(2,'2024-02-01',40,'plants','2024-05-01',TRUE,2,1),
(3,'2024-03-01',30,'plants','2024-06-01',TRUE,3,1),

(1,'2024-01-15',60,'plants','2024-04-15',TRUE,4,2),
(2,'2024-02-10',50,'plants','2024-05-10',TRUE,5,2),
(3,'2024-03-10',40,'plants','2024-06-10',TRUE,6,2),

(1,'2024-01-20',55,'plants','2024-04-20',TRUE,7,3),
(2,'2024-02-15',45,'plants','2024-05-15',TRUE,8,3),
(3,'2024-03-15',35,'plants','2024-06-15',TRUE,9,3),

(1,'2024-01-25',50,'plants','2024-04-25',TRUE,10,4),
(2,'2024-02-20',40,'plants','2024-05-20',TRUE,11,4),
(3,'2024-03-20',30,'plants','2024-06-20',TRUE,12,4),

(1,'2024-01-30',60,'plants','2024-04-30',TRUE,13,5),
(2,'2024-02-25',50,'plants','2024-05-25',TRUE,1,5),
(3,'2024-03-25',40,'plants','2024-06-25',TRUE,2,5),

(1,'2024-02-05',55,'plants','2024-05-05',TRUE,3,6),
(2,'2024-03-01',45,'plants','2024-06-01',TRUE,4,6),
(3,'2024-03-05',35,'plants','2024-06-05',TRUE,5,6),

(1,'2024-02-10',50,'plants','2024-05-10',TRUE,6,7),
(2,'2024-03-05',40,'plants','2024-06-05',TRUE,7,7),
(3,'2024-03-10',30,'plants','2024-06-10',TRUE,8,7),

(1,'2024-02-15',60,'plants','2024-05-15',TRUE,9,8),
(2,'2024-03-10',50,'plants','2024-06-10',TRUE,10,8),
(3,'2024-03-15',40,'plants','2024-06-15',TRUE,11,8),

(1,'2024-02-20',55,'plants','2024-05-20',TRUE,12,9),
(2,'2024-03-15',45,'plants','2024-06-15',TRUE,13,9),
(3,'2024-03-20',35,'plants','2024-06-20',TRUE,1,9),

(1,'2024-02-25',50,'plants','2024-05-25',TRUE,2,10),
(2,'2024-03-20',40,'plants','2024-06-20',TRUE,3,10),
(3,'2024-03-25',30,'plants','2024-06-25',TRUE,4,10),

(1,'2024-03-01',60,'plants','2024-06-01',TRUE,5,11),
(2,'2024-03-05',50,'plants','2024-06-05',TRUE,6,11),
(3,'2024-03-10',40,'plants','2024-06-10',TRUE,7,11),

(1,'2024-03-15',55,'plants','2024-06-15',TRUE,8,12),
(2,'2024-03-20',45,'plants','2024-06-20',TRUE,9,12),
(3,'2024-03-25',35,'plants','2024-06-25',TRUE,10,12),

(1,'2024-03-30',50,'plants','2024-06-30',TRUE,11,13),
(2,'2024-04-05',40,'plants','2024-07-05',TRUE,12,13),
(3,'2024-04-10',30,'plants','2024-07-10',TRUE,13,13),

(1,'2024-04-15',60,'plants','2024-07-15',TRUE,1,14),
(2,'2024-04-20',50,'plants','2024-07-20',TRUE,2,14),
(3,'2024-04-25',40,'plants','2024-07-25',TRUE,3,14),

(1,'2024-05-01',55,'plants','2024-08-01',TRUE,4,15),
(2,'2024-05-05',45,'plants','2024-08-05',TRUE,5,15),
(3,'2024-05-10',35,'plants','2024-08-10',TRUE,6,15),

(1,'2024-05-15',50,'plants','2024-08-15',TRUE,7,16),
(2,'2024-05-20',40,'plants','2024-08-20',TRUE,8,16),
(3,'2024-05-25',30,'plants','2024-08-25',TRUE,9,16),

(1,'2024-06-01',60,'plants','2024-09-01',TRUE,10,17),
(2,'2024-06-05',50,'plants','2024-09-05',TRUE,11,17),
(3,'2024-06-10',40,'plants','2024-09-10',TRUE,12,17),

(1,'2024-06-15',55,'plants','2024-09-15',TRUE,13,18),
(2,'2024-06-20',45,'plants','2024-09-20',TRUE,1,18),
(3,'2024-06-25',35,'plants','2024-09-25',TRUE,2,18),

(1,'2024-07-01',50,'plants','2024-10-01',TRUE,3,19),
(2,'2024-07-05',40,'plants','2024-10-05',TRUE,4,19),
(3,'2024-07-10',30,'plants','2024-10-10',TRUE,5,19),

(1,'2024-07-15',60,'plants','2024-10-15',TRUE,6,20),
(2,'2024-07-20',50,'plants','2024-10-20',TRUE,7,20),
(3,'2024-07-25',40,'plants','2024-10-25',TRUE,8,20),

-- Plans 21 à 40 (moitié 2025 et chevauchement)
(1,'2025-01-10',50,'plants','2025-04-10',TRUE,9,21),
(2,'2025-02-01',40,'plants','2025-05-01',TRUE,10,21),
(3,'2025-03-01',30,'plants','2025-06-01',TRUE,11,21),

(1,'2025-01-15',60,'plants','2025-04-15',TRUE,12,22),
(2,'2025-02-10',50,'plants','2025-05-10',TRUE,13,22),
(3,'2025-03-10',40,'plants','2025-06-10',TRUE,1,22),

(1,'2024-12-20',55,'plants','2025-03-20',TRUE,2,23),
(2,'2024-12-25',45,'plants','2025-03-25',TRUE,3,23),
(3,'2025-01-05',35,'plants','2025-04-05',TRUE,4,23),

(1,'2025-01-20',50,'plants','2025-04-20',TRUE,5,24),
(2,'2025-02-15',40,'plants','2025-05-15',TRUE,6,24),
(3,'2025-03-15',30,'plants','2025-06-15',TRUE,7,24),

(1,'2025-01-25',60,'plants','2025-04-25',TRUE,8,25),
(2,'2025-02-20',50,'plants','2025-05-20',TRUE,9,25),
(3,'2025-03-20',40,'plants','2025-06-20',TRUE,10,25),

(1,'2025-01-30',55,'plants','2025-04-30',TRUE,11,26),
(2,'2025-02-25',45,'plants','2025-05-25',TRUE,12,26),
(3,'2025-03-25',35,'plants','2025-06-25',TRUE,13,26),

(1,'2025-02-05',50,'plants','2025-05-05',TRUE,1,27),
(2,'2025-03-01',40,'plants','2025-06-01',TRUE,2,27),
(3,'2025-03-05',30,'plants','2025-06-05',TRUE,3,27),

(1,'2025-02-10',60,'plants','2025-05-10',TRUE,4,28),
(2,'2025-03-05',50,'plants','2025-06-05',TRUE,5,28),
(3,'2025-03-10',40,'plants','2025-06-10',TRUE,6,28),

(1,'2024-12-01',55,'plants','2025-03-01',TRUE,7,29),
(2,'2024-12-15',45,'plants','2025-03-15',TRUE,8,29),
(3,'2025-01-05',35,'plants','2025-04-05',TRUE,9,29),

(1,'2025-02-15',50,'plants','2025-05-15',TRUE,10,30),
(2,'2025-03-10',40,'plants','2025-06-10',TRUE,11,30),
(3,'2025-03-15',30,'plants','2025-06-15',TRUE,12,30),

(1,'2025-02-20',60,'plants','2025-05-20',TRUE,13,31),
(2,'2025-03-15',50,'plants','2025-06-15',TRUE,1,31),
(3,'2025-03-20',40,'plants','2025-06-20',TRUE,2,31),

(1,'2025-02-25',55,'plants','2025-05-25',TRUE,3,32),
(2,'2025-03-20',45,'plants','2025-06-20',TRUE,4,32),
(3,'2025-03-25',35,'plants','2025-06-25',TRUE,5,32),

(1,'2025-03-01',50,'plants','2025-06-01',TRUE,6,33),
(2,'2025-03-05',40,'plants','2025-06-05',TRUE,7,33),
(3,'2025-03-10',30,'plants','2025-06-10',TRUE,8,33),

(1,'2025-03-15',60,'plants','2025-06-15',TRUE,9,34),
(2,'2025-03-20',50,'plants','2025-06-20',TRUE,10,34),
(3,'2025-03-25',40,'plants','2025-06-25',TRUE,11,34),

(1,'2025-03-30',55,'plants','2025-06-30',TRUE,12,35),
(2,'2025-04-05',45,'plants','2025-07-05',TRUE,13,35),
(3,'2025-04-10',35,'plants','2025-07-10',TRUE,1,35),

(1,'2025-04-15',50,'plants','2025-07-15',TRUE,2,36),
(2,'2025-04-20',40,'plants','2025-07-20',TRUE,3,36),
(3,'2025-04-25',30,'plants','2025-07-25',TRUE,4,36),

(1,'2025-05-01',60,'plants','2025-08-01',TRUE,5,37),
(2,'2025-05-05',50,'plants','2025-08-05',TRUE,6,37),
(3,'2025-05-10',40,'plants','2025-08-10',TRUE,7,37),

(1,'2025-05-15',55,'plants','2025-08-15',TRUE,8,38),
(2,'2025-05-20',45,'plants','2025-08-20',TRUE,9,38),
(3,'2025-05-25',35,'plants','2025-08-25',TRUE,10,38),

(1,'2025-06-01',50,'plants','2025-09-01',TRUE,11,39),
(2,'2025-06-05',40,'plants','2025-09-05',TRUE,12,39),
(3,'2025-06-10',30,'plants','2025-09-10',TRUE,13,39),

(1,'2025-06-15',60,'plants','2025-09-15',TRUE,1,40),
(2,'2025-06-20',50,'plants','2025-09-20',TRUE,2,40),
(3,'2025-06-25',40,'plants','2025-09-25',TRUE,3,40);



-- ===========================================
-- 14. WATERING (exemple)
-- ===========================================
INSERT INTO watering (watering_date, "sectionIdSection") VALUES
('2024-04-01',1),('2024-04-01',2),('2024-04-01',3);

-- ===========================================
-- 15. HARVEST (exemple)
-- ===========================================
INSERT INTO harvest (harvest_date, quantity, quantity_unit, "user_idUser", "sectionIdSection") VALUES
('2024-06-01',50,'kg',1,1),
('2024-06-01',60,'kg',1,2),
('2024-06-01',55,'kg',1,3);

-- ===========================================
-- 16. EXEMPLES AMENDED
-- ===========================================
INSERT INTO amended (amendment_date, title, description, id_board, amendement_id) VALUES
('2024-03-01', 'Compost N1', 'Appliqué sur la planche N1',1,1),
('2024-03-02', 'Fumier N2', 'Appliqué sur la planche N2',2,2);

-- ===========================================
-- 17. EXEMPLES TREATED
-- ===========================================
INSERT INTO treated (treatment_date, treatment_quantity, treatment_unit, "boardIdBoard", "treatmentIdTreatment") VALUES
('2024-03-05',5,'L',1,1),
('2024-03-06',3,'L',2,2);

COMMIT;
