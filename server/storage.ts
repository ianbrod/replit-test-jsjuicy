import { 
  type User, 
  type InsertUser, 
  type LoginCredentials,
  type Profile,
  type InsertProfile,
  type Opportunity,
  type InsertOpportunity,
  type Match,
  type InsertMatch,
  type Application,
  type InsertApplication,
  type Resume,
  type InsertResume,
  type OpportunityWithMatch,
  type DashboardStats,
  type AuthUser
} from "@shared/schema";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<AuthUser>;
  validateCredentials(credentials: LoginCredentials): Promise<AuthUser | null>;
  
  // Profiles
  getProfile(userId: string): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(id: string, data: any): Promise<Profile>;
  
  // Opportunities and Matches
  getOpportunities(filters?: any): Promise<OpportunityWithMatch[]>;
  getHighPotentialMatches(userId: string): Promise<OpportunityWithMatch[]>;
  createMatch(match: InsertMatch): Promise<Match>;
  
  // Applications
  getApplications(userId: string): Promise<Application[]>;
  createApplication(application: InsertApplication): Promise<Application>;
  getDashboardStats(userId: string): Promise<DashboardStats>;
  
  // Resumes
  getResumes(userId: string): Promise<Resume[]>;
  createResume(resume: InsertResume): Promise<Resume>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private profiles: Map<string, Profile>;
  private opportunities: Map<string, Opportunity>;
  private matches: Map<string, Match>;
  private applications: Map<string, Application>;
  private resumes: Map<string, Resume>;

  constructor() {
    this.users = new Map();
    this.profiles = new Map();
    this.opportunities = new Map();
    this.matches = new Map();
    this.applications = new Map();
    this.resumes = new Map();
    
    // Initialize with some sample opportunities
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    const opportunities = [
      {
        id: "1",
        title: "Senior Product Manager",
        company: "Nimbus Labs",
        location: "Austin, TX",
        description: "Lead product strategy and development",
        requirements: "5+ years product management experience",
        salary: "$120,000 - $150,000",
        remote: false,
        createdAt: new Date(),
      },
      {
        id: "2",
        title: "Backend Software Engineer",
        company: "Bluecomma",
        location: "Toronto, ON",
        description: "Build scalable backend systems",
        requirements: "Strong Python/Java experience",
        salary: "$90,000 - $120,000",
        remote: true,
        createdAt: new Date(),
      },
      {
        id: "3",
        title: "UX Designer",
        company: "Atelier Co.",
        location: "Vancouver, BC",
        description: "Design user-centered experiences",
        requirements: "Portfolio required, Figma experience",
        salary: "$70,000 - $90,000",
        remote: false,
        createdAt: new Date(),
      },
      {
        id: "4",
        title: "Data Scientist",
        company: "Meridian AI",
        location: "Montreal, QC",
        description: "Build ML models and analyze data",
        requirements: "PhD preferred, Python, R experience",
        salary: "$100,000 - $130,000",
        remote: true,
        createdAt: new Date(),
      },
      {
        id: "5",
        title: "Growth Marketing Manager",
        company: "Harbor Growth",
        location: "Seattle, WA",
        description: "Drive user acquisition and retention",
        requirements: "3+ years marketing experience",
        salary: "$80,000 - $100,000",
        remote: false,
        createdAt: new Date(),
      }
    ];

    opportunities.forEach(opp => {
      this.opportunities.set(opp.id, opp);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<AuthUser> {
    const id = randomUUID();
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    
    const user: User = {
      ...insertUser,
      id,
      password: hashedPassword,
      tier: "free",
      createdAt: new Date(),
    };
    
    this.users.set(id, user);
    
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      tier: user.tier,
    };
  }

  async validateCredentials(credentials: LoginCredentials): Promise<AuthUser | null> {
    const user = await this.getUserByEmail(credentials.email);
    if (!user) return null;
    
    const isValid = await bcrypt.compare(credentials.password, user.password);
    if (!isValid) return null;
    
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      tier: user.tier,
    };
  }

  async getProfile(userId: string): Promise<Profile | undefined> {
    return Array.from(this.profiles.values()).find(
      profile => profile.userId === userId
    );
  }

  async createProfile(profile: InsertProfile): Promise<Profile> {
    const id = randomUUID();
    const newProfile: Profile = {
      ...profile,
      id,
      data: profile.data || null,
      status: "processing",
      createdAt: new Date(),
    };
    
    this.profiles.set(id, newProfile);
    return newProfile;
  }

  async updateProfile(id: string, data: any): Promise<Profile> {
    const profile = this.profiles.get(id);
    if (!profile) throw new Error("Profile not found");
    
    const updatedProfile = { ...profile, data, status: "complete" };
    this.profiles.set(id, updatedProfile);
    return updatedProfile;
  }

  async getOpportunities(filters?: any): Promise<OpportunityWithMatch[]> {
    const opportunities = Array.from(this.opportunities.values());
    const matches = Array.from(this.matches.values());
    
    return opportunities.map(opp => {
      const match = matches.find(m => m.opportunityId === opp.id);
      return {
        ...opp,
        matchScore: match?.matchScore || Math.floor(Math.random() * 40) + 60,
        intensityScore: match?.intensityScore || Math.floor(Math.random() * 40) + 50,
        perkScore: match?.perkScore || Math.floor(Math.random() * 40) + 60,
        opticsScore: match?.opticsScore || Math.floor(Math.random() * 40) + 60,
      };
    });
  }

  async getHighPotentialMatches(userId: string): Promise<OpportunityWithMatch[]> {
    const all = await this.getOpportunities();
    return all.filter(opp => opp.matchScore >= 85).slice(0, 4);
  }

  async createMatch(match: InsertMatch): Promise<Match> {
    const id = randomUUID();
    const newMatch: Match = {
      ...match,
      id,
      createdAt: new Date(),
    };
    
    this.matches.set(id, newMatch);
    return newMatch;
  }

  async getApplications(userId: string): Promise<Application[]> {
    return Array.from(this.applications.values()).filter(
      app => app.userId === userId
    );
  }

  async createApplication(application: InsertApplication): Promise<Application> {
    const id = randomUUID();
    const newApp: Application = {
      ...application,
      id,
      status: application.status || "applied",
      appliedAt: new Date(),
    };
    
    this.applications.set(id, newApp);
    return newApp;
  }

  async getDashboardStats(userId: string): Promise<DashboardStats> {
    const apps = await this.getApplications(userId);
    const responses = apps.filter(app => app.status === "interview").length;
    const interviews = apps.filter(app => app.status === "interview").length;
    
    return {
      applications: apps.length,
      responses,
      interviews,
    };
  }

  async getResumes(userId: string): Promise<Resume[]> {
    return Array.from(this.resumes.values()).filter(
      resume => resume.userId === userId
    );
  }

  async createResume(resume: InsertResume): Promise<Resume> {
    const id = randomUUID();
    const newResume: Resume = {
      ...resume,
      id,
      createdAt: new Date(),
    };
    
    this.resumes.set(id, newResume);
    return newResume;
  }
}

export const storage = new MemStorage();
