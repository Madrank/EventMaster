const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const path = require("path");

// Charger les variables d'environnement depuis server/.env
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const app = express();

// CORS restreint par origine si fournie, sinon permissif en dev
const allowedOrigin = process.env.CORS_ORIGIN || "*";
app.use(
  cors({
    origin: allowedOrigin === "*" ? true : allowedOrigin,
    credentials: true,
  })
);
app.use(express.json());

// Configure la connexion MySQL via variables d'environnement
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "eventmaster",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Route d'accueil
app.get("/", (req, res) => {
  res.send("EventMaster API is running!");
});

// ----------- EVENTS -----------
app.get("/api/events", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM events");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/events", async (req, res) => {
  const { name, date, location, description } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO events (name, date, location, description) VALUES (?, ?, ?, ?)",
      [name, date, location, description]
    );
    const [rows] = await pool.query("SELECT * FROM events WHERE id = ?", [
      result.insertId,
    ]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/events/:id", async (req, res) => {
  const { id } = req.params;
  const { name, date, location, description } = req.body;
  try {
    await pool.query(
      "UPDATE events SET name = ?, date = ?, location = ?, description = ? WHERE id = ?",
      [name, date, location, description, id]
    );
    const [rows] = await pool.query("SELECT * FROM events WHERE id = ?", [id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/events/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM events WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------- GUESTS -----------
app.get("/api/events/:eventId/guests", async (req, res) => {
  const { eventId } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM guests WHERE event_id = ?", [
      eventId,
    ]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/events/:eventId/guests", async (req, res) => {
  const { eventId } = req.params;
  const { name, email, status } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO guests (event_id, name, email, status) VALUES (?, ?, ?, ?)",
      [eventId, name, email, status || "pending"]
    );
    const [rows] = await pool.query("SELECT * FROM guests WHERE id = ?", [
      result.insertId,
    ]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/guests/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, status } = req.body;
  try {
    await pool.query(
      "UPDATE guests SET name = ?, email = ?, status = ? WHERE id = ?",
      [name, email, status, id]
    );
    const [rows] = await pool.query("SELECT * FROM guests WHERE id = ?", [id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/guests/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM guests WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------- PROFESSIONALS -----------
app.get("/api/professionals", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM professionals");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/professionals", async (req, res) => {
  const { name, category, contact, description } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO professionals (name, category, contact, description) VALUES (?, ?, ?, ?)",
      [name, category, contact, description]
    );
    const [rows] = await pool.query(
      "SELECT * FROM professionals WHERE id = ?",
      [result.insertId]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/professionals/:id", async (req, res) => {
  const { id } = req.params;
  const { name, category, contact, description } = req.body;
  try {
    await pool.query(
      "UPDATE professionals SET name = ?, category = ?, contact = ?, description = ? WHERE id = ?",
      [name, category, contact, description, id]
    );
    const [rows] = await pool.query(
      "SELECT * FROM professionals WHERE id = ?",
      [id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/professionals/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM professionals WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------- ACCOMMODATIONS -----------
app.get("/api/events/:eventId/accommodations", async (req, res) => {
  const { eventId } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM accommodations WHERE event_id = ?",
      [eventId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/events/:eventId/accommodations", async (req, res) => {
  const { eventId } = req.params;
  const { name, address, capacity } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO accommodations (event_id, name, address, capacity) VALUES (?, ?, ?, ?)",
      [eventId, name, address, capacity]
    );
    const [rows] = await pool.query(
      "SELECT * FROM accommodations WHERE id = ?",
      [result.insertId]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/accommodations/:id", async (req, res) => {
  const { id } = req.params;
  const { name, address, capacity } = req.body;
  try {
    await pool.query(
      "UPDATE accommodations SET name = ?, address = ?, capacity = ? WHERE id = ?",
      [name, address, capacity, id]
    );
    const [rows] = await pool.query(
      "SELECT * FROM accommodations WHERE id = ?",
      [id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/accommodations/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM accommodations WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------- CROWDFUNDINGS -----------
app.get("/api/events/:eventId/crowdfundings", async (req, res) => {
  const { eventId } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM crowdfundings WHERE event_id = ?",
      [eventId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/events/:eventId/crowdfundings", async (req, res) => {
  const { eventId } = req.params;
  const { contributor, amount, message } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO crowdfundings (event_id, contributor, amount, message) VALUES (?, ?, ?, ?)",
      [eventId, contributor, amount, message]
    );
    const [rows] = await pool.query(
      "SELECT * FROM crowdfundings WHERE id = ?",
      [result.insertId]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/crowdfundings/:id", async (req, res) => {
  const { id } = req.params;
  const { contributor, amount, message } = req.body;
  try {
    await pool.query(
      "UPDATE crowdfundings SET contributor = ?, amount = ?, message = ? WHERE id = ?",
      [contributor, amount, message, id]
    );
    const [rows] = await pool.query(
      "SELECT * FROM crowdfundings WHERE id = ?",
      [id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/crowdfundings/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM crowdfundings WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
