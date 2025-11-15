
-- Inserts des rôles initiaux dans la table roles
INSERT INTO roles (name, description, created_at, updated_at)
VALUES
('admin', 'Administrateur du système', NOW(), NOW()),
('formateur', 'Formateur de la plateforme', NOW(), NOW()),
('stagiaire', 'Stagiaire inscrit sur la plateforme', NOW(), NOW());

-- Inserts d'un utilisateur initial dans la table users
INSERT INTO users (name, email, password, role_id, created_at, updated_at) VALUES
('Admin User', 'admin@planculture.com', 'admin123', 1, NOW(), NOW()),
('Formateur User', 'formateur@planculture.com', 'formateur123', 2, NOW(), NOW()),
('Stagiaire User', 'stagiaire@planculture.com', 'stagiaire123', 3, NOW(), NOW());


INSERT INTO "user" (name, email, password, photo, created_at, updated_at, role) VALUES
('Alice Admin', 'alice.admin@example.com', 'admin123', NULL, NOW(), NOW(), 'admin'),

('Bob Formateur', 'bob.formateur@example.com', 'formateur123', NULL, NOW(), NOW(), 'formateur'),

('Charlie Stagiaire 1', 'charlie.stagiaire1@example.com', 'stagiaire123', NULL, NOW(), NOW(), 'stagiaire'),
('Dana Stagiaire 2', 'dana.stagiaire2@example.com', 'stagiaire123', NULL, NOW(), NOW(), 'stagiaire'),
('Evan Stagiaire 3', 'evan.stagiaire3@example.com', 'stagiaire123', NULL, NOW(), NOW(), 'stagiaire'),
('Fiona Stagiaire 4', 'fiona.stagiaire4@example.com', 'stagiaire123', NULL, NOW(), NOW(), 'stagiaire'),
('George Stagiaire 5', 'george.stagiaire5@example.com', 'stagiaire123', NULL, NOW(), NOW(), 'stagiaire');



