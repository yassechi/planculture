-- ===========================
-- INSERTS POUR LES TABLES
-- ===========================

-- Table role
INSERT INTO role (role_name) VALUES
('formateur'),
('stagiaire');

-- Table user_
INSERT INTO "user_" (user_first_name, user_last_name, email, hpassword, phone, path_photo, user_active, id_role)
VALUES
('John', 'Doe', 'john.doe@example.com', '$2b$10$h5kQOXCWO5noJXk7sLvKiu5bzDKMnHbAFk7El6nEinVpCkwPPFO7a', '0123456789', null, TRUE, 1),
('Jane', 'Smith', 'jane.smith@example.com', '$$2b$10$h5kQOXCWO5noJXk7sLvKiu5bzDKMnHbAFk7El6nEinVpCkwPPFO7a', '0987654321', null, TRUE, 2);

-- Table family_importance
INSERT INTO family_importance (importance_name) VALUES
('High'),
('Medium'),
('Low');

-- Table family
INSERT INTO family (family_name, "familyImportanceIdFamilyImportance") VALUES
('Solanaceae', 1),
('Cucurbitaceae', 2),
('Brassicaceae', 3);

-- Table vegetable
INSERT INTO vegetable (vegetable_name, planting_season, harvest_season, harvest_duration_min, harvest_duration_max, inrow_distance, estimated_yield, "familyIdFamily") VALUES
('Tomato', 'Spring', 'Summer', 60, 90, 30, 5000, 1),
('Cucumber', 'Spring', 'Summer', 50, 70, 40, 3000, 2),
('Cabbage', 'Summer', 'Fall', 70, 100, 25, 4000, 3);

-- Table section_plan
INSERT INTO section_plan (creation_date, number_of_section) VALUES
('2025-01-01 08:00:00', 5);

-- Table section
INSERT INTO section (numero_section, num_semaine_debut, num_semaine_fin, "vegetableIdVegetable", "sectionPlanIdSection") VALUES
(1, '2025-03-01 00:00:00', '2025-05-01 00:00:00', 1, 1),
(2, '2025-03-01 00:00:00', '2025-05-01 00:00:00', 2, 1),
(3, '2025-06-01 00:00:00', '2025-09-01 00:00:00', 3, 1);

-- Table watering
INSERT INTO watering (watering_date, quantity, "sectionIdSection") VALUES
('2025-03-05 08:00:00', 20, 1),
('2025-03-06 08:00:00', 25, 2),
('2025-06-05 08:00:00', 30, 3);

-- Table harvest
INSERT INTO harvest (id_harvest_date, quantity, quantity_unit, "user_idUser", "sectionIdSection") VALUES
('2025-06-15 08:00:00', 100, 'kg', 1, 1),
('2025-07-01 08:00:00', 50, 'kg', 2, 2);

-- Table "order"
INSERT INTO "order" (order_date, order_delivery, "user_idUser") VALUES
('2025-07-05 10:00:00', '2025-07-06 10:00:00', 1),
('2025-07-07 10:00:00', '2025-07-08 10:00:00', 2);

-- Table order_detail
INSERT INTO order_detail (quantity, quantity_unit, unit_price, "vegetableIdVegetable", "orderIdOrder") VALUES
(10, 'kg', '5', 1, 1),
(5, 'kg', '4', 2, 2);

-- Table price
INSERT INTO price (vegetable_price, price_date, active_price, "vegetableIdVegetable") VALUES
(5, '2025-01-01 00:00:00', TRUE, 1),
(4, '2025-01-01 00:00:00', TRUE, 2);

-- Table exploitation
INSERT INTO exploitation (exploitation_name, exploitation_locality, exploitation_active, "user_idUser") VALUES
('Farm A', 'Village X', 'Y', 1),
('Farm B', 'Village Y', 'Y', 2);

-- Table sole
INSERT INTO sole (sole_name, "exploitationIdExploitation") VALUES
('Sole 1', 1),
('Sole 2', 2);

-- Table board
INSERT INTO board (board_name, board_width, board_lenght, board_active, "soleIdSole") VALUES
('Board 1', 2, 5, TRUE, 1),
('Board 2', 3, 6, TRUE, 2);

-- Table amendement
INSERT INTO amendement (amendement_name) VALUES
('Compost'),
('Fertilizer');

-- Table amended
INSERT INTO amended (amendement_date, treatment_quantity, treatment_unit, "boardIdBoard", "amendementIdAmendement") VALUES
('2025-03-10 08:00:00', 10, 'kg', 1, 1),
('2025-03-12 08:00:00', 5, 'kg', 2, 2);

-- Table treatment
INSERT INTO treatment (treatment_name) VALUES
('Pesticide'),
('Herbicide');

-- Table treated
INSERT INTO treated (treatment_date, treatment_quantity, treatment_unit, "boardIdBoard", "treatmentIdTreatment") VALUES
('2025-03-15 08:00:00', 2, 'L', 1, 1),
('2025-03-18 08:00:00', 1, 'L', 2, 2);
