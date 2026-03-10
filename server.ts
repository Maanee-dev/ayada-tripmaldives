import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import compression from "compression";
import Database from "better-sqlite3";

const db = new Database("leads.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    resort TEXT,
    name TEXT,
    email TEXT,
    phone TEXT,
    check_in TEXT,
    check_out TEXT,
    adults INTEGER,
    children INTEGER,
    room_type TEXT,
    meal_plan TEXT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(compression());
  app.use(express.json());

  // API Routes
  app.post("/api/leads", (req, res) => {
    const { 
      resort, name, email, phone, 
      checkIn, checkOut, adults, children, 
      roomType, mealPlan, notes 
    } = req.body;

    try {
      const stmt = db.prepare(`
        INSERT INTO leads (
          resort, name, email, phone, 
          check_in, check_out, adults, children, 
          room_type, meal_plan, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      stmt.run(
        resort, name, email, phone, 
        checkIn, checkOut, adults, children, 
        roomType, mealPlan, notes
      );

      console.log(`New Lead for ${resort}:`, { name, email });
      
      res.status(201).json({ 
        success: true, 
        message: "Inquiry received. A luxury travel specialist will contact you shortly." 
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Failed to save inquiry" });
    }
  });

  app.get("/api/resort/:slug", (req, res) => {
    const { slug } = req.params;
    // Mock data for Ayada Maldives
    if (slug === "ayada") {
      res.json({
        name: "Ayada Maldives",
        location: "Gaafu Dhaalu Atoll",
        tagline: "A Turkish-Inspired Tropical Paradise",
        highlights: [
          "Award-winning Turkish Spa",
          "Private infinity pools in every villa",
          "Surfing and diving excellence",
          "Pristine coral reefs"
        ],
        offers: "Exclusive 45% Off + Complimentary Seaplane Transfers",
        trustSignals: ["Voted World's Leading Water Villa Resort", "5/5 Tripadvisor Rating"]
      });
    } else {
      res.status(404).json({ error: "Resort not found" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist"), {
      maxAge: '1y',
      etag: true
    }));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
