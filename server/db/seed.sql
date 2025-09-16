INSERT INTO events (name, date, location, description) VALUES
  ('Mariage Alice & Bob', '2025-06-14', 'Lyon', 'Cérémonie et réception'),
  ('Conférence Tech', '2025-10-20', 'Paris', 'Conférence annuelle tech');

INSERT INTO professionals (name, category, contact, description) VALUES
  ('Le Bon Traiteur', 'traiteur', 'contact@traiteur.fr', 'Service traiteur haut de gamme'),
  ('DJ Nightwave', 'dj', 'dj@nightwave.com', 'DJ pour soirées et mariages'),
  ('Studio Lumière', 'photographe', 'hello@studiolumiere.fr', 'Photographie événementielle');

-- Link some accommodations to first event
INSERT INTO accommodations (event_id, name, address, capacity) VALUES
  (1, 'Hôtel du Parc', '12 Rue des Fleurs, Lyon', 80),
  (1, 'Gîte Les Alizés', 'Chemin des Vignes, Lyon', 20);

-- Example guests
INSERT INTO guests (event_id, name, email, status) VALUES
  (1, 'Charlie', 'charlie@example.com', 'pending'),
  (1, 'Denise', 'denise@example.com', 'accepted');

-- Crowdfunding example
INSERT INTO crowdfundings (event_id, contributor, amount, message) VALUES
  (1, 'Eve', 100.00, 'Félicitations !'),
  (1, 'Frank', 50.00, 'Avec plaisir'); 