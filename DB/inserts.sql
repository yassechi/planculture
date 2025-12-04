-- ======================================================
-- INSERTS POUR LES TABLES
-- ======================================================

-- ===========================
-- TABLE role
-- ===========================
INSERT INTO role (role_name) 
  VALUES
  ('Formateur'),
  ('Stagiaire');

-- ===========================
-- TABLE user_
-- ===========================
INSERT INTO "user_" (user_first_name, user_last_name, email, birth_day, hpassword, phone, path_photo, user_active, id_role)
VALUES
('John', 'Doe', 'john.doe2@example.com', '1990-01-01', '$2b$10$h5kQOXCWO5noJXk7sLvKiu5bzDKMnHbAFk7El6nEinVpCkwPPFO7a', '0123456789', NULL, TRUE, 1),
('Jane', 'Smith', 'jane.smith2@example.com', '1992-02-02',  '$2b$10$h5kQOXCWO5noJXk7sLvKiu5bzDKMnHbAFk7El6nEinVpCkwPPFO7a', '0987654321', NULL, TRUE, 2);

-- ===========================
-- TABLE family_importance
-- ===========================
INSERT INTO family_importance (importance_name) 
  VALUES
  ('Principale'), 
  ('Secondaire'), 
  ('Tertiaire');

-- ===========================
-- TABLE family
-- ===========================
INSERT INTO family (family_name, "familyImportanceIdFamilyImportance")
  VALUES
  ('Alliacées','1'),
  ('Apiacées','2'),
  ('Asparagagées','3'),
  ('Astéracées','2'),
  ('Brassicacées','1'),
  ('Chénopodiacées','2'),
  ('Cucurbitacées','1'),
  ('Graminées','3'),
  ('Ipomées','3'),
  ('Lamiacées','3'),
  ('Légumineuses','1'),
  ('Montiacées','3'),
  ('Portulacacées','3'),
  ('Rosacées','3'),
  ('Solanacées','1'),
  ('Valérianacées','3');

-- ===========================
-- TABLE vegetable
-- ===========================
INSERT INTO vegetable (vegetable_name, variety_name, planting_season, harvest_season, harvest_duration_min, harvest_duration_max, inrow_distance, estimated_yield, "familyIdFamily")
  VALUES
('Tomato', 'B. Varensis', 'Spring', 'Summer', 60, 90, 30, 5000, 1),
('Cucumber', 'B. Suspensis', 'Spring', 'Summer', 50, 70, 40, 3000, 2),
('Cabbage', 'B. Hardy', 'Summer', 'Fall', 70, 100, 25, 4000, 3);

-- ===========================
-- TABLE exploitation
-- ===========================
INSERT INTO exploitation (exploitation_name, exploitation_locality, exploitation_active, "user_idUser")
  VALUES
  ('Le Grand Pré', 'Ath', TRUE, '1'), 
  ('Les fauchis', 'Roucourt', TRUE, '2');

-- ===========================
-- TABLE sole
-- ===========================
INSERT INTO sole (sole_name, "exploitationIdExploitation") 
  VALUES
  ('Plein champ 1', 1),
  ('Plein champ 2', 1),
  ('Plein champ 1', 2),
  ('Plein champ 2', 2),
  ('Plein champ 3', 2);

-- ===========================
-- TABLE board (CORRIGÉ)
-- ===========================
INSERT INTO board (board_name, board_width, board_lenght, board_active, id_sole)
  VALUES
  ('Planche 1', 2, 5, TRUE, '1'),
  ('Planche 2', 2, 5, TRUE, '1'),
  ('Planche 3', 2, 5, TRUE, '1'),
  ('Planche 4', 2, 5, TRUE, '1'),
  ('Planche 5', 2, 5, TRUE, '1'),
  ('Planche 6', 3, 5, TRUE, '1'),
  ('Planche 1', 2, 5, TRUE, '2'),
  ('Planche 2', 2, 5, TRUE, '2'),
  ('Planche 3', 2, 5, TRUE, '2'),
  ('Planche 4', 2, 5, TRUE, '2'),
  ('Planche 5', 2, 5, TRUE, '2'),
  ('Planche 6', 3, 5, TRUE, '2');

-- ===========================
-- TABLE section_plan    
-- ===========================
-- comment identifier la board_id ?

INSERT INTO section_plan (creation_date, number_of_section)
  VALUES 
  ('2025-01-01 08:00:00', 3);

-- ===========================
-- TABLE section
-- ===========================
INSERT INTO section (section_number, start_date, end_date,quantity_planted, "vegetableIdVegetable", "sectionPlanIdSection")
  VALUES
(1, '2025-04-01 00:00:00', '2025-07-01 00:00:00',50, 1, 1),
(2, '2025-05-01 00:00:00', '2025-07-10 00:00:00',70, 2, 1),
(3, '2025-06-01 00:00:00', '2025-09-10 00:00:00',120, 3, 1);

-- ===========================
-- TABLE amendement
-- ===========================
INSERT INTO amendement (amendement_name) VALUES
('Compost'),
('Fertilizer');

-- ===========================
-- TABLE amended
-- ===========================
INSERT INTO amended (amendement_date, treatment_quantity, treatment_unit, "boardIdBoard", "amendementIdAmendement") VALUES
('2025-03-10 08:00:00', 10, 'kg', 1, 1),
('2025-03-12 08:00:00', 5, 'kg', 2, 2);

-- ===========================
-- TABLE treatment
-- ===========================
INSERT INTO treatment (treatment_name) VALUES
('Pesticide'),
('Herbicide');

-- ===========================
-- TABLE treated
-- ===========================
INSERT INTO treated (treatment_date, treatment_quantity, treatment_unit, "boardIdBoard", "treatmentIdTreatment") VALUES
('2025-03-15 08:00:00', 2, 'L', 1, 1),
('2025-03-18 08:00:00', 1, 'L', 2, 2);

-- ===========================
-- TABLE watering
-- ===========================
INSERT INTO watering (watering_date, quantity, "sectionIdSection") VALUES
('2025-03-05 08:00:00', 20, 1),
('2025-03-06 08:00:00', 25, 2),
('2025-06-05 08:00:00', 30, 3);

-- ===========================
-- TABLE harvest
-- ===========================
INSERT INTO harvest (id_harvest_date, quantity, quantity_unit, "user_idUser", "sectionIdSection") VALUES
('2025-06-15 08:00:00', 100, 'kg', 1, 1),
('2025-07-01 08:00:00', 50, 'kg', 2, 2);

-- ===========================
-- TABLE "order"
-- ===========================
INSERT INTO "order" (order_date, order_delivery, "user_idUser") VALUES
('2025-07-05 10:00:00', '2025-07-06 10:00:00', 1),
('2025-07-07 10:00:00', '2025-07-08 10:00:00', 2);

-- ===========================
-- TABLE order_detail
-- ===========================
INSERT INTO order_detail (quantity, quantity_unit, unit_price, "vegetableIdVegetable", "orderIdOrder") VALUES
(10, 'kg', '5', 1, 1),
(5, 'kg', '4', 2, 2);

-- ===========================
-- TABLE price
-- ===========================
INSERT INTO price (vegetable_price, price_date, active_price, "vegetableIdVegetable") VALUES
(5, '2025-01-01 00:00:00', TRUE, 1),
(4, '2025-01-01 00:00:00', TRUE, 2);
 