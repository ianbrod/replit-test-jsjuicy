import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  loginSchema, 
  insertUserSchema, 
  insertProfileSchema,
  insertApplicationSchema,
  insertResumeSchema
} from "@shared/schema";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.SESSION_SECRET || "fallback-secret";

// Middleware to verify JWT token
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const credentials = loginSchema.parse(req.body);
      const user = await storage.validateCredentials(credentials);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
      
      res.json({ user, token });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/auth/signup", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
      
      const user = await storage.createUser(userData);
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
      
      res.json({ user, token });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/auth/me", authenticateToken, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        tier: user.tier,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Profile routes
  app.get("/api/profile", authenticateToken, async (req: any, res) => {
    try {
      const profile = await storage.getProfile(req.user.userId);
      res.json(profile);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/profile/synthesize", authenticateToken, async (req: any, res) => {
    try {
      const profileData = insertProfileSchema.parse({
        userId: req.user.userId,
        data: req.body.data,
      });
      
      const profile = await storage.createProfile(profileData);
      
      // Simulate AI processing
      setTimeout(async () => {
        try {
          await storage.updateProfile(profile.id, {
            skills: ["JavaScript", "Python", "React", "Node.js"],
            experience: "5 years",
            summary: "Experienced software engineer with expertise in full-stack development.",
          });
        } catch (error) {
          console.error("Profile synthesis error:", error);
        }
      }, 3000);
      
      res.json(profile);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Opportunities routes
  app.get("/api/opportunities", authenticateToken, async (req: any, res) => {
    try {
      const opportunities = await storage.getOpportunities(req.query);
      res.json(opportunities);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/opportunities/matches", authenticateToken, async (req: any, res) => {
    try {
      const matches = await storage.getHighPotentialMatches(req.user.userId);
      res.json(matches);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Applications routes
  app.get("/api/applications", authenticateToken, async (req: any, res) => {
    try {
      const applications = await storage.getApplications(req.user.userId);
      res.json(applications);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/applications", authenticateToken, async (req: any, res) => {
    try {
      const applicationData = insertApplicationSchema.parse({
        ...req.body,
        userId: req.user.userId,
      });
      
      const application = await storage.createApplication(applicationData);
      res.json(application);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Dashboard routes
  app.get("/api/dashboard/stats", authenticateToken, async (req: any, res) => {
    try {
      const stats = await storage.getDashboardStats(req.user.userId);
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Resume routes
  app.get("/api/resumes", authenticateToken, async (req: any, res) => {
    try {
      const resumes = await storage.getResumes(req.user.userId);
      res.json(resumes);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/resumes", authenticateToken, async (req: any, res) => {
    try {
      const resumeData = insertResumeSchema.parse({
        ...req.body,
        userId: req.user.userId,
      });
      
      const resume = await storage.createResume(resumeData);
      res.json(resume);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
