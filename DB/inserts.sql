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

-- =====================================================
-- 2. USERS ET EXPLOITATIONS
-- =====================================================

INSERT INTO "user_" (
  user_first_name, user_last_name, birth_date, email,
  hpassword, phone, path_photo, user_active, id_role, "harvestIdHarvest"
) VALUES
('Sylvie', 'Dubois', '1980-01-01', 'sylvie@culturo.be', '$2a$10$hash', '0471111111', NULL, TRUE, 1, NULL),
('Marc', 'Lefevre', '1985-05-15', 'marc@culturo.be', '$2a$10$hash', '0472222222', NULL, TRUE, 2, NULL),
('Antoine', 'Ferma', '1995-01-01', 'antoine@culturo.be', '$2a$10$hash', '0473333333', NULL, TRUE, 2, NULL),
('Emilie', 'Terres', '1996-02-02', 'emilie@culturo.be', '$2a$10$hash', '0474444444', NULL, TRUE, 2, NULL),
('Lucas', 'Verger', '1997-03-03', 'lucas@culturo.be', '$2a$10$hash', '0475555555', NULL, TRUE, 2, NULL);

INSERT INTO exploitation (exploitation_name, exploitation_locality, exploitation_active, "user_idUser") VALUES
('Domaine du Chene', 'Bruxelles', TRUE, 1),
('Le Hameau Vert', 'Namur', TRUE, 2),
('Les Jardins de l Eau', 'Liege', TRUE, 3);

-- =====================================================
-- 3. SOLE + BOARD
-- =====================================================

INSERT INTO sole (sole_name, "exploitationIdExploitation") VALUES
('SOLE Nord', 1),
('SOLE Ouest', 2),
('SOLE Est', 3),
('SOLE Sud', 1);

INSERT INTO board (board_name, board_width, board_length, board_active, id_sole) VALUES
('Bande A01', 120, 500, TRUE, 1),
('Bande A02', 120, 500, TRUE, 1),
('Bande A03', 120, 500, TRUE, 1),
('Bande A04', 120, 500, TRUE, 1),
('Bande A05', 120, 500, TRUE, 1),

('Bande B01', 100, 450, TRUE, 2),
('Bande B02', 100, 450, TRUE, 2),
('Bande B03', 100, 450, TRUE, 2),

('Bande C01', 110, 550, TRUE, 3),
('Bande C02', 110, 550, TRUE, 3),
('Bande C03', 110, 550, TRUE, 3);

-- =====================================================
-- 4. FAMILY + VEGETABLE
-- =====================================================

INSERT INTO vegetable (
  variety_name, vegetable_name, planting_season, harvest_season,
  harvest_duration_min, harvest_duration_max, inrow_distance,
  estimated_yield, "familyIdFamily"
) VALUES
('Chou de Milan', 'Chou', 'printemps', 'automne', 60, 120, 40, 150, 1),
('Tomate cerise', 'Tomate', 'printemps', 'été', 90, 150, 50, 200, 2),
('Carotte nantaise', 'Carotte', 'printemps', 'été', 70, 100, 5, 120, 4),
('Poireau d été', 'Poireau', 'printemps', 'hiver', 100, 180, 15, 180, 6),
('Courgette verte', 'Courgette', 'printemps', 'été', 60, 90, 80, 250, 5);

-- =====================================================
-- 5. SECTION PLAN
-- =====================================================

INSERT INTO section_plan (creation_date, number_of_section, section_plan_active, id_board) VALUES
('2024-01-01', 3, TRUE, 1),
('2024-01-01', 3, TRUE, 2),
('2024-01-01', 3, TRUE, 3),
('2024-01-01', 3, TRUE, 4),
('2024-01-01', 3, TRUE, 5),
('2024-01-01', 3, TRUE, 6),
('2024-01-01', 3, TRUE, 7),
('2024-01-01', 3, TRUE, 8),
('2024-01-01', 3, TRUE, 9);

-- =====================================================
-- 6. SECTION (3 PAR SECTION_PLAN)
-- =====================================================

INSERT INTO section (
  section_number, start_date, quantity_planted, end_date,
  section_active, id_vegetable, "sectionPlanIdSectionPlan"
) VALUES
-- SECTION PLAN 1
(1, '2024-01-01', 50, '2024-04-01', TRUE, 1, 1),
(2, '2024-01-01', 60, '2024-04-01', TRUE, 2, 1),
(3, '2024-01-01', 55, '2024-04-01', TRUE, 3, 1),

-- SECTION PLAN 2
(1, '2024-01-01', 50, '2024-04-01', TRUE, 1, 2),
(2, '2024-01-01', 60, '2024-04-01', TRUE, 2, 2),
(3, '2024-01-01', 55, '2024-04-01', TRUE, 3, 2),

-- SECTION PLAN 3
(1, '2024-01-01', 50, '2024-04-01', TRUE, 1, 3),
(2, '2024-01-01', 60, '2024-04-01', TRUE, 2, 3),
(3, '2024-01-01', 55, '2024-04-01', TRUE, 3, 3);

-- =====================================================
-- 7. WATERING
-- =====================================================

INSERT INTO watering (watering_date, "sectionIdSection") VALUES
('2024-02-10', 1),
('2024-02-12', 2),
('2024-02-15', 3);

-- =====================================================
-- 8. HARVEST (CORRIGÉ)
-- =====================================================

INSERT INTO harvest (harvest_date, quantity, quantity_unit, "user_idUser", "sectionIdSection") VALUES
('2024-04-15', 30, 'kg', 1, 1),
('2024-04-15', 40, 'kg', 1, 2),
('2024-04-15', 35, 'kg', 1, 3);

COMMIT;
