import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import compression from "compression";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(compression());
  app.use(express.json());

  // API Routes
  app.post("/api/leads", (req, res) => {
    const { resort, name, email, phone, dates, guests } = req.body;
    console.log(`New Lead for ${resort}:`, { name, email, phone, dates, guests });
    
    // In a real app, integrate with CRM (e.g., HubSpot, Salesforce)
    // and send to Maldives Serenity Travels backend.
    
    res.status(201).json({ 
      success: true, 
      message: "Inquiry received. A luxury travel specialist will contact you shortly." 
    });
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
