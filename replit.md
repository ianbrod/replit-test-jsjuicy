# JobSniper - AI Career Co-Pilot Platform

## Overview

JobSniper is a tech-first career co-pilot platform designed to help mid-to-senior level professionals overcome inefficiencies in the modern job search. The platform provides AI-driven opportunity matching, application optimization, and strategic career guidance. It shifts user focus from "applying" to "strategizing" by building a proprietary data moat of enriched company and job opportunity information paired with an intelligent AI co-pilot engine.

The application targets "The Aspiring Director" - high-performing managers with 10+ years experience targeting $120k+ roles who are consistently overlooked for Director-level positions due to ATS systems and poor resume optimization.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **UI Library**: Radix UI components with shadcn/ui component system for consistent, accessible design
- **Styling**: Tailwind CSS with CSS custom properties for theming, configured for dark/light mode support
- **State Management**: TanStack Query for server state management, React Context for auth and subscription state
- **Routing**: Wouter for lightweight client-side routing
- **Form Management**: React Hook Form with Zod schema validation for type-safe forms

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: JWT-based authentication with bcrypt for password hashing
- **API Design**: RESTful API with structured error handling and request/response logging
- **Development**: Hot module replacement via Vite integration in development mode

### Data Layer
- **ORM**: Drizzle with PostgreSQL dialect for database schema management
- **Schema**: Structured tables for users, profiles, opportunities, matches, applications, and resumes
- **Migration Management**: Drizzle Kit for schema migrations and database versioning
- **Data Enrichment**: AI-synthesized profile data stored as JSONB for flexible schema evolution

### Authentication & Authorization
- **Authentication Method**: JWT tokens stored in localStorage with automatic token refresh
- **Session Management**: Stateless JWT approach with 7-day expiration
- **Authorization**: Tier-based access control (free, pro, enterprise) with feature gating
- **Security**: Password hashing with bcrypt, input validation with Zod schemas

### Application Structure
- **Monorepo Layout**: Client and server code in separate directories with shared schema definitions
- **Component Architecture**: Reusable UI components with consistent prop interfaces and TypeScript definitions
- **Page Structure**: Protected routes with authentication guards, lazy loading for optimal performance
- **Error Handling**: Global error boundaries with user-friendly error messages and fallback UI

### AI Integration Points
- **Profile Synthesis**: AI-powered analysis of user documents and preferences to generate optimized profiles
- **Opportunity Matching**: Multi-factor scoring system (match, intensity, perk, optics scores) for job recommendations
- **Application Optimization**: AI-assisted resume and cover letter generation based on job requirements
- **Strategic Guidance**: Intelligent recommendations for career progression and application strategy

## External Dependencies

### Core Technologies
- **Database**: Neon PostgreSQL serverless database for scalable data storage
- **Authentication**: JWT (jsonwebtoken) for secure token-based authentication
- **Password Security**: bcrypt for secure password hashing and validation

### UI & Styling
- **Component Library**: Radix UI primitives for accessible, unstyled components
- **Design System**: shadcn/ui component collection built on Radix UI
- **Icons**: Lucide React for consistent iconography
- **Styling**: Tailwind CSS for utility-first styling approach

### Development Tools
- **Build System**: Vite for fast development server and optimized production builds
- **Type Checking**: TypeScript for static type safety across the entire application
- **Code Quality**: ESBuild for fast transpilation and bundling
- **Development Enhancement**: Replit-specific plugins for runtime error handling and development banners

### Data & API Management
- **HTTP Client**: Axios for API requests with interceptors for auth and error handling
- **Server State**: TanStack React Query for efficient data fetching and caching
- **Validation**: Zod for runtime type validation and schema definition
- **Form Handling**: React Hook Form with Hookform Resolvers for form validation integration

### Planned Integrations
- **AI Services**: Integration points prepared for OpenAI GPT models for content generation
- **Job Board APIs**: Structured for integration with major job boards and company APIs
- **Document Processing**: Framework ready for resume parsing and document analysis services
- **Email Services**: Prepared for transactional email and notification services