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
-- 6. USERS
-- ===========================================
INSERT INTO "user_" (
    user_first_name, user_last_name, birth_date, email, hpassword, phone, user_active, "id_role"
) VALUES
('Sylvie','Dubois','1980-01-01','sylvie@culturo.be','$2a$10$hash','0471111111',TRUE,1),
('Marc','Lefevre','1985-05-15','marc@culturo.be','$2a$10$hash','0472222222',TRUE,2),
('Antoine','Ferma','1995-01-01','antoine@culturo.be','$2a$10$hash','0473333333',TRUE,2);

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
-- 13. SECTIONS (3 sections par plan)
-- ===========================================
-- Exemple pour les 40 boards (à adapter pour chaque plan et légumes)
INSERT INTO section (
    section_number, start_date, quantity_planted, unity, end_date,
    section_active, id_vegetable, "sectionPlanIdSectionPlan"
) VALUES
(1,'2024-03-01',50,'plants','2024-06-01',TRUE,1,1),
(2,'2024-03-01',40,'plants','2024-06-01',TRUE,2,1),
(3,'2024-03-01',30,'plants','2024-06-01',TRUE,3,1),
(1,'2024-03-02',60,'plants','2024-06-02',TRUE,4,2),
(2,'2024-03-02',50,'plants','2024-06-02',TRUE,5,2),
(3,'2024-03-02',40,'plants','2024-06-02',TRUE,6,2);

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
