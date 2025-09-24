<!-- File: A01_brief.md -->

### **Project Brief: JobSniper**

This brief provides the foundational business context and strategic direction for the JobSniper platform initiative. It is the definitive high-level guide for the project.

---

#### **1. Executive Summary**
JobSniper is a tech-first career co-pilot designed to help mid-to-senior level professionals overcome the inefficiencies of the modern job search. The primary problem is that qualified candidates are systematically filtered out by automated Applicant Tracking Systems (ATS). Our solution is a powerful, data-driven SaaS platform that leverages a proprietary, enriched database of opportunities and an intelligent AI engine. This combination allows us to craft superior, tailored application materials that give our users a decisive advantage in securing interviews.

#### **2. Problem Statement**
The modern job application process is a "black hole." Over 98% of large companies use ATS, which erroneously rejects millions of qualified candidates based on flawed keyword matching. This leaves ambitious professionals feeling frustrated and powerless, trapped in a cycle of applying without response. Existing solutions are inadequate; generic AI tools produce low-quality, easily-detected spam, while high-touch human services are unscalable and offer inconsistent results. There is a clear and urgent need for a strategic, automated, and data-driven solution.

#### **3. Proposed Solution**
JobSniper will be an intelligent platform that shifts the user's focus from "applying" to "strategizing." The core of our solution is a synergistic model that provides a durable competitive advantage:

1.  **A Proprietary Data Moat:** We will build and maintain an enriched, taxonomy-style database of companies and job opportunities. By cleaning, structuring, and enriching public data with AI-driven insights, we create a unique and superior data source that powers our entire platform.
2.  **The AI Co-Pilot Engine:** Users interact with an intelligent platform that guides them from opportunity discovery to application creation. The AI engine handles the heavy lifting of data analysis, semantic matching, and initial draft generation, producing application materials that are strategically optimized for both automated screeners and human reviewers.

#### **4. Target Users**
*   **Primary User Segment: "The Aspiring Director"**
    *   A high-performing manager (10+ years experience, targeting $120k+ roles) who is consistently overlooked for Director-level positions. They are frustrated that their resume fails to communicate their strategic and leadership capabilities, causing their career to plateau. They are tech-savvy and willing to invest in a premium software service that provides a clear, measurable return on investment.

#### **5. Product Goals & Success Metrics**
*   **Primary Product Goal:** Deliver a platform that demonstrably improves a user's ability to secure interviews by providing them with superior, data-driven opportunity matching and application materials.
*   **User Success Metrics:**
    *   The platform's diagnostic tools (ATS Report Card) will provide users with a clear "Aha!" moment, identifying specific, actionable flaws in their current job application materials.
    *   The platform's "Opportunity Hub" will present users with highly relevant job matches that they perceive as superior to those found on generic job boards.
*   **Key Performance Indicators (KPIs):**
    *   **Onboarding Success:** >70% of new users will successfully complete the profile synthesis and approval step.
    *   **Core Feature Engagement:** The "ATS Report Card" will be utilized by >50% of activated free users.
    *   **Value Proposition Validation:** >10% of activated free users will upgrade to a paid plan.

#### **6. Execution Risks & Mitigations (NEW)**
The technical plan explicitly addresses key operational risks to ensure a resilient and compliant launch:
*   **AI Quality & Consistency:** Mitigated via version-controlled **"Golden Sets"** (a trusted test dataset) that are enforced by the CI pipeline, preventing any AI model or prompt changes that cause a quality regression from reaching production.
*   **PII & Data Privacy:** Mitigated via a **Hybrid PII Redaction** pipeline that combines multiple techniques (regex, NER) to robustly sanitize all data before it is sent to third-party AI providers. All redaction events will be auditable.
*   **Performance & User Experience:** Mitigated by defining formal **Service Level Objectives (SLOs)** for all long-running AI tasks and implementing a **UX Fallback** pattern, ensuring users receive immediate, valuable feedback while complex operations complete in the background.
*   **Financial & AI Cost Control:** Mitigated via a deterministic **AI Cost Reservation** system that uses conservative, pre-call cost estimation, preventing budget overruns even under concurrent load.
*   **Operational Stability:** Mitigated through comprehensive **Monitoring & Operational Runbooks**, with automated alerts for critical system health indicators (e.g., job queue depth, error rates, SLO breaches), ensuring a proactive approach to incident response.


<!-- ========================================== -->
<!-- File: A02_prd.md -->
<!-- ========================================== -->

### **Product Requirements Document: JobSniper**

This PRD translates the strategic goals from the Brief into detailed, complete, and verifiable requirements. It is the definitive source of truth for the platform and will guide architecture, design, and story creation.

---

#### **1. Goals and Background Context**
The goal of this PRD is to define the features and functionality required to build the JobSniper platform. This includes the core data engine, the user profile synthesis flow, the free diagnostic tools, and the paid application generation workshop. Success is defined by shipping a platform that delivers a demonstrably valuable, reliable, and cohesive user experience for our target persona, built to its full, envisioned scope.

#### **2. Functional Requirements (FR)**
*   **FR1: User Accounts:** The system must allow a new user to create a free account using an email address and a password.
*   **FR2: Document Intake:** The system must provide an interface for an authenticated user to upload one or more career documents in PDF and DOCX formats.
*   **FR3: Voice Narrative Intake:** The system must provide a voice input feature for an authenticated user to verbally describe their career narrative.
*   **FR4: AI Profile Synthesis:** The system must use an AI model to process all uploaded documents and transcribed voice inputs to generate a single, structured, synthesized career profile. The user must be able to edit and explicitly approve this profile before it is used by the platform.
*   **FR5: ATS Report Card:** The system must provide a free "ATS Report Card" tool where a user can paste the text of a job description, select one of their uploaded resumes, and receive a multi-stage analysis.
    *   **Stage 1 (Preview):** An immediate, computationally cheap keyword match score and visual comparison of missing/matched keywords.
    *   **Stage 2 (Full Result):** An asynchronously generated set of **AI-powered, actionable suggestions** for the top missing keywords.
    *   Use of this tool will be limited for free-tier users.
*   **FR6: Personalized Opportunity Hub:** The system must display a personalized "Opportunity Hub" feed of job postings from its internal database, with results ranked based on a conceptual match to the user's approved career profile.
*   **FR7: Application Workshop (Paid):** A user on a paid plan must be able to select a job opportunity from the Hub and use an "Application Workshop" to generate a new, optimized resume that is tailored to that specific job description, using their approved profile as the source of truth.
*   **FR8: Asynchronous Document Export (Paid):** A paid user must be able to make text edits to the AI-generated resume within the Workshop and initiate an **asynchronous job** to export the final document as a formatted PDF file.
*   **FR9: Data Deduplication:** The system must prevent the ingestion of duplicate job postings by generating and checking a unique, deterministic hash for each job.
*   **FR10: Tiered AI Enrichment:** The system must use a tiered approach for AI-driven skill extraction to manage operational costs, prioritizing a low-cost, rule-based method before escalating to a high-cost generative AI model.
*   **FR11: Asynchronous Job State Management:** The system must track and expose the state (`pending`, `completed`, `failed`, `awaiting_review`) of all long-running, user-initiated asynchronous jobs (e.g., Profile Synthesis, Resume Generation, PDF Export). The system must provide a clear path for recovery or support escalation upon a `failed` state.
*   **FR12: Subscription & Credit Management:** The system must manage user subscriptions and a credit-based system for accessing paid features. A paid user receives a monthly allotment of credits, with 1 credit corresponding to 1 document generation.

#### **3. Non-Functional Requirements (NFR)**
*   **NFR1: Technology Stack:** The system must be built with the FOSS-first technology stack defined in the `tad.md`.
*   **NFR2: Data Security:** All user data, especially PII, must be encrypted at rest. Row Level Security must be enabled in the database to ensure a user can only ever query their own data.
*   **NFR3: Responsiveness:** The platform's user interface must be fully responsive and functional on the latest versions of modern web browsers for both desktop and mobile form factors.
*   **NFR4: Performance & Latency:** The system must adhere to formally defined Service Level Objectives (SLOs).
    *   **Synchronous APIs:** The P95 latency for core, synchronous API endpoints must be under 500ms.
    *   **Fallback Previews:** The P95 latency for generating and returning a "preview" result (`FR5 Stage 1`) must be under 2 seconds.
    *   **Asynchronous Jobs:** The P95 completion time for core asynchronous jobs must be under 90 seconds.
*   **NFR5: AI Cost Control:** The system architecture must implement deterministic AI cost control. This must include capabilities for per-user metering, conservative pre-call cost estimation, an atomic reservation system, and an automated circuit-breaker, as defined in `ADR-009`.
*   **NFR6: AI Data & PII Governance:** The system must enforce a strict, hybrid PII redaction policy on all data sent to third-party AI providers. All redaction events must be auditable. All data handling must adhere to the policies for data minimization, prompt logging, and vendor compliance defined in `ADR-004`.
*   **NFR7: Data Provenance Mandate:** The system must only ingest and display data from sources approved per the policy in `A06_operational-gating.md`. The data ingestion pipeline must programmatically enforce this requirement.
*   **NFR8: AI Output Validation:** All AI-generated artifacts must pass automated validation checks before being stored or presented to the user. A failure in validation must result in the corresponding asynchronous job being moved to a `failed` state or escalated for review.
*   **NFR9: Observability & Monitoring:** The system must be instrumented to monitor key health and performance indicators. Dashboards and automated alerts must be configured for SLO breaches, async job queue depth, AI provider error rates, and AI cost budget consumption.
*   **NFR10: Human-in-the-Loop (HITL) Capacity (NEW):** The system must account for the operational capacity constraints of human review, as defined in `A06_operational-gating.md`. Any feature requiring HITL must include logic to handle delays if the review queue capacity is exceeded.

#### **4. Instrumentation & Analytics**
To measure the KPIs defined in the Brief, the platform must track the following events. The initial analytics tool will be PostHog. All event properties must be anonymized to exclude PII as per `NFR6`.

*   **Event Dictionary:**
    | Event Name | Trigger | Properties |
    | :--- | :--- | :--- |
    | `account_registered` | User successfully completes the sign-up form. | `userId` |
    | `profile_approved` | User clicks the final "Approve and Get Started" button. | `userId` |
    | `ats_report_run` | User successfully receives a full ATS report. | `userId`, `matchScore` |
    | `fallback_preview_shown` | A user is shown a fast, rule-based preview. | `userId`, `featureType` |
    | `subscription_started` | A successful payment webhook is processed. | `userId`, `plan` |
    | `credits_consumed` | A user spends a credit on a document generation. | `userId`, `creditsRemaining` |
    | `resume_generated` | User successfully generates a resume in the Workshop. | `userId`, `jobId` |
    | `pdf_exported` | A user's asynchronous PDF export job completes successfully. | `userId`, `jobId` |
    | `ai_enrichment_escalation`| A job is escalated to the high-cost AI model. | `jobId` |
    | `async_job_failed` | An asynchronous job enters a final `failed` state. | `userId`, `jobType`, `reason` |
    | `slo_breached` | An asynchronous job exceeds its defined P95 SLO. | `jobType`, `duration` |
    | `hitl_job_escalated` | An AI job is flagged for human review. | `userId`, `jobType`, `reason` |

*   **KPI Mapping is unchanged.**

#### **5. User-Facing Error Handling**
*   **Master Error Message Copy Deck:**
    | Situation | Backend Status Code | Frontend User-Facing Message |
    | :--- | :--- | :--- |
    | User not logged in | `401 Unauthorized` | "Your session has expired. Please log in again to continue." |
    | Free user accesses paid feature | `403 Forbidden` | "This is a premium feature. Please upgrade your account to access the Application Workshop." |
    | User out of credits | `402 Payment Required` | "You're out of credits for this month. You can upgrade your plan to get more." |
    | Free user exceeds ATS limit | `429 Too Many Requests` | "You've reached your limit of free reports this month. Upgrade to get unlimited reports." |
    | User uploads wrong file type | `400 Bad Request` | "Upload failed. Please select a valid PDF or DOCX file." |
    | AI Service circuit-breaker tripped | `503 Service Unavailable` | "Our AI services are currently under heavy load. Please try again in a few minutes. You can still access your existing documents." |
    | Async job fails permanently | `500 Internal Server Error` | "We were unable to complete your request. Our team has been notified. Please try again or contact support." |
    | Unexpected server error | `500 Internal Server Error` | "Something went wrong on our end. Please try again in a few moments. Our team has been notified." |


<!-- ========================================== -->
<!-- File: A03_tad.md -->
<!-- ========================================== -->

### **Technical Architecture Document: JobSniper**

This document provides the definitive technical blueprint for the JobSniper platform. It covers architectural principles, technology stack, system design, and operational procedures. It is governed by the policies set forth in `A06_operational-gating.md`.

---

#### **1. Architectural Principles**
*   **Build for the Target State:** The architecture is designed to support the full, envisioned scope of the platform from day one, prioritizing completeness and capability over MVP simplification.
*   **Performance & Correctness First:** The core of our business is a data engine. All architectural decisions prioritize its speed, security, and reliability.
*   **FOSS-First Preference:** We will default to Free and Open-Source Software, but will use managed services where they provide a clear strategic advantage.
*   **Right Tool for the Job:** We will use a polyglot approach, selecting the superior language for each domain (Rust for the API, Python for data pipelines, TypeScript for the frontend).

#### **2. Technology Stack**
| Category | Technology | Rationale |
| :--- | :--- | :--- |
| **Backend API** | **Rust (with Axum/Tokio)** | Optimal for performance, correctness, and security. Memory safety is critical for handling PII. |
| **Database** | **PostgreSQL on Supabase/GCP** | Provides a robust relational foundation, `pgvector` for semantic search, and FOSS-friendly services. |
| **Frontend** | **React (with Vite)** | Industry standard for dynamic UIs, leveraging modern features for performance. |
| **AI/LLM** | **Google Gemini (Primary), OpenRouter (Fallback)** | The backend will use an adapter pattern to mitigate vendor lock-in and provide redundancy. |
| **Data Pipelines** | **Python (JobSpy, Scrapy, Pandas)** | Superior ecosystem for data acquisition and manipulation. |

#### **3. System Architecture**
*   **Monorepo Structure:** The project will be organized as a monorepo to facilitate type-sharing and integrated tooling.
*   **Backend Architecture (Rust):** A RESTful API pattern governed by an **OpenAPI 3.0 specification** will be used. Database interaction will be via `sqlx`.
*   **Frontend Architecture (React):** State management will use React's native tools and **TanStack Query v5**. Styling will be with **Tailwind CSS**.

#### **4. Architectural Decisions & Patterns (ADRs)**
*   **ADR-001: Asynchronous Task Processing**
    *   **Decision:** A strict separation between synchronous operations and asynchronous, long-running tasks. All computationally intensive or high-latency I/O operations—such as AI generation, document transcription, and **formatted document exports (PDF generation)**—**must** use this pattern. The API will immediately return `202 Accepted`, and the frontend will be notified of completion via `ADR-006`.
*   **ADR-002: Multi-Provider AI Service Abstraction is unchanged.**
*   **ADR-003: API Contract Governance is unchanged.**
*   **ADR-004: AI Data & PII Governance is unchanged.**
*   **ADR-005: ATS Keyword Analysis Algorithm is unchanged.**
*   **ADR-006: Asynchronous Job Execution & State Management is unchanged.**
*   **ADR-007: Vector Embedding Generation Strategy is unchanged.**
*   **ADR-008: AI Output Validation**
    *   **Decision:** A lightweight, automated validation step using a semantic similarity check (cosine similarity) will be appended to all generative AI jobs. A job output that fails this check will be moved to a `failed` state or escalated to the **Human-in-the-Loop (HITL) review queue** if it falls within a "borderline" threshold.
*   **ADR-009: Deterministic AI Cost Control is unchanged.**
*   **ADR-010: Latency SLOs & Fallback Architecture**
    *   **Context:** To meet the strict latency requirements of `NFR4` and provide a superior user experience, the system cannot make the user wait for slow AI operations, particularly for the flagship `ATS Report Card` tool.
    *   **Decision:** A formal fallback architecture will be implemented for applicable features.
        1.  **SLOs:** The P95 completion times defined in `NFR4` are the official SLOs for the system.
        2.  **Pattern:** An API endpoint for a feature like the ATS Report Card will synchronously execute only the fast, deterministic part of the operation (e.g., the `RAKE` keyword match).
        3.  **Response:** The API will immediately return a `200 OK` with a `preview` payload (containing the keyword match) and a `job_id`.
        4.  **Full Generation:** The API handler will simultaneously enqueue a job for the full, generative AI portion of the task. The frontend will use the `job_id` to poll or subscribe to updates for the full result, displaying it when ready.
*   **ADR-011: Human-in-the-Loop (HITL) Integration (NEW)**
    *   **Context:** Certain AI-generated artifacts may require expert human review for quality assurance, as defined by `ADR-008` or other business logic. The founder's time is a finite operational resource.
    *   **Decision:** The system will treat the HITL process as a formal part of the architecture.
        1.  **Queue:** A dedicated table or queue (`hitl_review_queue`) will manage jobs flagged for review.
        2.  **Capacity Constraint:** The system must be aware of the HITL capacity defined in `A06_operational-gating.md`. If the queue is backlogged, the system will gracefully handle the delay, potentially by notifying the user or temporarily disabling features that rely on HITL.
        3.  **Tooling:** An internal admin interface will be required for reviewers to process the queue efficiently.

#### **5. Data Architecture & Strategy**
*   **5.1. Database Schema:**
    *   The PostgreSQL schema is the definitive source of truth.
    *   **ERD:**
        ```mermaid
        erDiagram
            users { UUID id PK, TEXT subscription_status, INT credits }
            user_profiles { UUID user_id PK,FK, JSONB synthesized_profile, VECTOR embedding }
            job_postings { BIGINT id PK, TEXT job_title, VECTOR embedding, TEXT source_provenance }
            applications { BIGINT id PK, UUID user_id FK, BIGINT job_posting_id FK, TEXT generated_resume_content }
            users ||--|| user_profiles : "has"
            users ||--o{ applications : "creates"
            job_postings ||--o{ applications : "receives"
            
            jobs { BIGINT id PK, UUID user_id FK, TEXT status, INT attempts }
            ai_api_usage { BIGINT id PK, UUID user_id FK, TEXT model, FLOAT cost_usd }
            ai_api_reservations { BIGINT id PK, UUID user_id FK, TEXT status, FLOAT estimated_cost_usd }
            pii_redaction_logs { BIGINT id PK, UUID user_id FK, TEXT original_hash, TEXT context }
            hitl_review_queue { BIGINT id PK, BIGINT job_id FK, TEXT review_status }
            users ||--o{ jobs : "initiates"
            jobs ||--|| hitl_review_queue : "can be in"
            users ||--o{ ai_api_usage : "consumes"
            users ||--o{ ai_api_reservations : "reserves"
            users ||--o{ pii_redaction_logs : "generates"
        ```
*   **5.2. Data Ingestion & Seeding:**
    *   **Policy:** All data ingestion is governed by `NFR7` and the policies defined in `A06_operational-gating.md`.
    *   **Phased Approach:** The data acquisition strategy will be executed in phases to manage legal and quality risks.
        *   **Phase 1 (Pre-Launch Seeding):** An initial seed of 10,000+ postings will be acquired from `Tier 1 (Licensed/Permitted)` sources only.
        *   **Phase 2 (Post-Launch Scaling):** The strategy may be expanded to include vetted `Tier 2` sources, prioritizing direct, compliant crawlers for a target list of "Aspirational 100" company career pages.
*   **5.3. Data Governance & Quality:**
    *   **Provenance:** Every job posting in the database must have a `source_provenance` field, tracking its origin and the compliance check performed.
    *   **Deduplication & Tiered Enrichment:** Logic remains as previously defined.
*   **5.4. Development Sandboxing (NEW)**
    *   **Policy:** To decouple engineering velocity from the legal review process (`Story 0.1`), a sandboxed development environment will be maintained.
    *   **Implementation:** Developers can ingest data from any source into this environment, which is physically isolated from production. All data within this sandbox must be programmatically tagged (e.g., `provenance='sandbox'`) and must never be migrated to or mixed with production data. This allows for the development and testing of data-dependent features (`FR6`, `FR7`) in parallel with legal compliance work.

#### **6. Testing & Quality Assurance Strategy**
*   **Testing Pyramid:** Adherence to Unit, Integration, and E2E tests is required.
*   **Critical Feature Validation:**
    *   **Golden Set Validation:** The CI pipeline must include a dedicated stage to run the core algorithms against the golden sets defined in `A06_operational-gating.md`. A failure in this stage will block deployment.
    *   **Semantic Search:** A dedicated integration test suite must validate the `pgvector` ranking algorithm against `golden_set_semantic_search.json`.
    *   **PII Redaction:** The CI pipeline must include a test that attempts to send documents with known PII through the `prompt_sanitizer` and asserts that the PII is successfully removed.
    *   **Async Job Lifecycle:** E2E tests must cover the full lifecycle of async jobs, including permanent failure states and their corresponding UI representations.

#### **7. Development & Deployment Strategy**
*   **Environments:** Developers will use a personal, free-tier Supabase project for local development, leveraging the development sandbox (`5.4`). A formal `Staging` environment will mirror production on GCP.
*   **Production Readiness:** The transition from Supabase-based development to the production GCP environment is a critical, high-risk procedural milestone.
    *   **Clarification:** This process does not involve migrating user data, as the platform will launch to new customers on the GCP infrastructure. The risk is in the correct and efficient provisioning of infrastructure and porting of the finalized database schema.
    *   **Runbook:** A `gcp-migration.md` runbook detailing every command, configuration, Infrastructure-as-Code (IaC) script, and rollback procedure must be authored and peer-reviewed.
    *   **Dry-Run:** At least one full, successful dry-run of the infrastructure provisioning and deployment process to the `Staging` environment must be completed before the production launch.

#### **8. Observability, Monitoring, & Incident Response (NEW)**
*   **Tooling:** The primary observability stack will consist of Prometheus for metrics, Grafana for dashboards, and PagerDuty for alerting.
*   **Monitoring Mandate:** Dashboards and alerts are not optional nice-to-haves; they are required deliverables for a feature launch.
*   **Key Alerts:** The SRE team will configure PagerDuty alerts for:
    *   Any P1/P0 SLO breach (as defined in `NFR4`).
    *   Dead Letter Queue (DLQ) depth exceeding a defined threshold (e.g., >50 jobs).
    *   A spike in the `async_job_failed` rate (>5% over a 10-minute window).
    *   AI provider API error rate exceeding 2%.
    *   AI budget consumption forecast to exceed the monthly cap.
*   **Runbooks:** For every configured P1/P0 alert, a corresponding runbook must be authored and stored in a version-controlled repository. The runbook must detail diagnostic steps, escalation procedures, and remediation actions.


<!-- ========================================== -->
<!-- File: A04_uiux-specs.md -->
<!-- ========================================== -->

### **JobSniper: UI/UX Specification Sheet**

This document provides the formal, definitive specifications for the JobSniper user interface. It is the single source of truth for all design and frontend development.

**1. Overall UX Goals & Principles**

*   **Target Persona:** "The Aspiring Director" — A high-intent, strategically-minded professional seeking a decisive advantage in their career progression.
*   **Prime Directive:** The platform's singular purpose is to **get the user interviews.** Every feature and design choice must serve this objective.
*   **Design Principles:**
    *   **Co-pilot, Not Autopilot:** The user is always in command; the AI is a powerful tool they wield.
    *   **Trust Through Control & Transparency:** The user explicitly approves their core data (the Master CV) and is shown the logic behind the AI's recommendations (via scores).
    *   **Precision Over Volume:** The experience is engineered to identify and engage with a few high-value opportunities, not to encourage mass-applying.
    *   **Data-Driven Strategy:** The UI surfaces key metrics and scores, empowering the user to make informed, strategic decisions.
*   **Aesthetic:** Premium-tech, minimalist, and clean. Inspired by the functional polish of platforms like Linear, Vercel, and Stripe.

**2. Information Architecture (IA) & Navigation**

*   **Primary Navigation (Left Sidebar):** A static, vertical sidebar containing the following items:
    1.  `Dashboard`
    2.  `Opportunities`
    3.  `Launchpad`
*   **User & Settings Navigation (Bottom-Left of Sidebar):** A dedicated block containing the user's avatar, name, and subscription tier. This block serves as the entry point to the `Settings` page and contains a clear "Upgrade" call-to-action.

**3. Core Screen Specifications**

*   **3.1. Dashboard:**
    *   **Layout:** A two-part interface designed for engagement and at-a-glance status checks.
    *   **Header:** A visually engaging, high-quality image that changes periodically to maintain a fresh, relaxed aesthetic.
    *   **Primary Widget:** A "New High-Potential Matches Found" component. This serves as the primary call-to-action, displaying a shortlist of top-matched roles as small cards with their corresponding match scores and links to view details in the `Opportunities` hub.
    *   **Funnel:** A "Weekly Snapshot" section composed of three distinct metric cards: `Applications Sent`, `Responses`, and `Interviews`.

*   **3.2. Settings & The Master CV:**
    *   **Layout:** The Master CV editor is the primary feature of the `Settings` page. It is a **full-screen, single-column, vertical-scroll-only** interface designed to handle a large volume of text without compromise.
    *   **Features:**
        *   Full text editing capabilities for all sections of the synthesized profile.
        *   The UI must visually flag statements where the AI had medium or low confidence during synthesis (e.g., with amber and red highlights), requiring the user's direct attention and approval.
        *   Dedicated fields for managing external user links (e.g., LinkedIn, personal portfolios).
        *   A "Download Master CV" button that is visible and enabled for paid-tier users only.

*   **3.3. Opportunity Hub:**
    *   **Layout:** The mandatory default view is the **Strategic ListView**, a wide, data-dense format optimized for analysis. A card-based view is available as a secondary option.
    *   **Tabs:** The page is organized into two primary tabs: `Search` and `Saved`.
    *   **Search Interface:** Contains three distinct methods for sourcing opportunities:
        1.  **Keyword Search:** Standard inputs for `Job Title/Keyword/Company` and `Region`, with a `Remote Only` toggle.
        2.  **Auto-Search:** A single "Find Best Matches" button that leverages the user's Master CV to execute a perfectly tailored search.
        3.  **Manual Input:** A dedicated area for the user to paste a job ad URL or its full text content.
    *   **List Row Content:** Each row in the Strategic ListView is a data-rich summary and must contain: a persistent checkbox for multi-select, Job Role, Company, Location, a direct link to the original job posting, and dedicated columns for the platform's proprietary scores: **Match Score, Intensity Score, Perk Score,** and **Optics Score**.
    *   **Monetization Gates:**
        *   Advanced filtering of search results is a paid-tier feature.
        *   Free-tier users have a fixed monthly search limit.
        *   Free-tier users can only view the top N results of any given search; all other results are obfuscated.

*   **3.4. Launchpad:**
    *   **Layout:** The default view is a **Card View**, where each card represents a generated Application Package.
    *   **Card Content:**
        *   **Header:** Displays the target Company, Role, Match Score, and the post-generation **ATS Score**.
        *   **Thumbnail (Tier-Dependent):** For paid users, the card body is a high-fidelity thumbnail preview of the resume formatted with a premium template. For free users, it is a barebones markdown/text preview.
    *   **Primary Actions:** Each card has three primary interaction points:
        1.  **Download Materials:** Initiates the final, formatted PDF download.
        2.  **View Original Post:** Links out to the source job ad for the user to manually submit their application.
        3.  **Edit/Refine:** Opens the Application Package in the dedicated Application Workshop view.

*   **3.5. Application Workshop:**
    *   **Layout:** A three-panel interface designed for final review and refinement.
        *   **Left Panel:** The main site navigation (collapsible).
        *   **Center Panel:** The main document editor canvas, populated with the AI-generated content for the resume and cover letter.
        *   **Right Panel (Context & Tools):** A collapsible panel containing a summary of the target job, a link to the original post, automated suggestions for the best visual template, and a gallery of other available templates.
    *   **Functionality:** This screen allows users to make final text edits, apply different visual templates (a paid-tier feature), and trigger the final download.

<!-- ========================================== -->
<!-- File: A05_epics.md -->
<!-- ========================================== -->

### **Epic 0: Pre-Flight & Validation**

**Epic Goal:** To establish the non-negotiable legal, compliance, and technical validation gates that must be cleared before core feature development begins. This epic de-risks the entire project.

---

#### **Story 0.1: Legal & Compliance Vetting for Data Sources**

**Status:** Ready

**Story**
*   **As the** CTO,
*   **I want** to ensure all data sources for the MVP are legally vetted and programmatically enforced,
*   **so that** we build our "data moat" on a compliant and sustainable foundation.

**Acceptance Criteria**
1.  The `approved_sources.yaml` registry is created in the root of the monorepo.
2.  The registry is populated with the initial list of `Tier 1` data sources for the MVP.
3.  Each source in the registry has a `status` of `approved` and a valid link in `review_documentation_link`.
4.  A legal sign-off for the initial set of sources is documented and linked.
5.  A CI job is created that validates the syntax of the `approved_sources.yaml` file.

**Tasks / Subtasks (Implementation Checklist)**
*   [ ] **Task 1: Create `approved_sources.yaml` Registry** (AC: #1)
    *   [ ] Define the final schema and create the file.
*   [ ] **Task 2: Conduct Legal Review of Initial Sources** (AC: #3, #4)
    *   [ ] Compile a list of all proposed MVP data sources.
    *   [ ] Obtain a formal legal review memo for the list.
    *   [ ] Populate the registry with the results of the review.
*   [ ] **Task 3: Implement CI Validation Job** (AC: #5)
    *   [ ] Create a new CI job that runs on changes to `approved_sources.yaml`.

**Dev Notes**
*   **BLOCKER:** `Story 1.2: Compliant Data Ingestion` (for production data) is blocked until this story is complete. Development can proceed using the sandbox environment from `Story 0.3`.

---

#### **Story 0.2: Establish Golden Validation Sets**

**Status:** Ready

**Story**
*   **As an** Architect,
*   **I want** to create and version-control the initial "golden sets" for our core algorithms,
*   **so that** we have an objective, automated baseline for system correctness and quality.

**Acceptance Criteria**
1.  A `validation/` directory is created in the project repository.
2.  The `golden_set_ats_scoring.json` file is created and populated with at least 50 valid entries.
3.  The `golden_set_semantic_search.json` file is created and populated with at least 100 valid entries.
4.  The CI pipeline is updated to include a new "Validation" stage that runs the core algorithms against these files.
5.  The build must fail if the performance against a golden set drops below the threshold defined in `A06_operational-gating.md`.

**Tasks / Subtasks (Implementation Checklist)**
*   [ ] **Task 1: Create Golden Set Files** (AC: #1, #2, #3)
    *   [ ] Create the `validation/` directory.
    *   [ ] Author a script or manually create the `golden_set_ats_scoring.json` file.
    *   [ ] Author a script or manually create the `golden_set_semantic_search.json` file.
*   [ ] **Task 2: Integrate Golden Set Tests into CI** (AC: #4, #5)
    *   [ ] Create a new test runner script that loads the golden sets.
    *   [ ] Add a new job to the CI configuration to execute this script.
    *   [ ] Configure the job to fail the build on a validation failure.

---

#### **Story 0.3: Establish Development Sandbox Environment**

**Status:** Ready

**Story**
*   **As a** Developer,
*   **I want** to work with a sandboxed data environment that is isolated from production,
*   **so that** I can build and test data-dependent features in parallel with the formal legal review of production data sources.

**Acceptance Criteria**
1.  The sandbox environment is provisioned (e.g., a separate Supabase project or database schema).
2.  The data ingestion pipeline has a "sandbox mode" that tags all ingested data with a non-production provenance marker.
3.  There are programmatic controls in place to prevent sandbox data from ever being promoted to or mixed with the production environment.
4.  Developer documentation is updated with instructions on how to use the sandbox.

**Tasks / Subtasks (Implementation Checklist)**
*   [ ] **Task 1: Provision Sandbox Environment** (AC: #1)
    *   [ ] Create a dedicated Supabase project or schema for sandbox development.
*   [ ] **Task 2: Implement Sandbox Ingestion Mode** (AC: #2, #3)
    *   [ ] Modify the Python data pipeline to accept a `sandbox_mode` flag.
    *   [ ] Ensure `sandbox_mode` adds a distinct `source_provenance` value (e.g., "sandbox:manual_ingest").
    *   [ ] Implement a CI check or database role that prevents sandbox data from being used in production contexts.
*   [ ] **Task 3: Document Sandbox Usage** (AC: #4)
    *   [ ] Add a section to the developer onboarding guide for using the sandbox.

**Dev Notes**
*   This story unblocks feature development that depends on having a populated database (e.g., `Story 1.2`, `Story 3.2`).

---

### **Epic 1: Foundation & The Data Engine**

**Epic Goal:** To establish the project's core infrastructure, implement the definitive and resilient database schema, build a compliant data ingestion pipeline, and create the secure, contract-driven API that powers the entire platform.

---

#### **Story 1.1: Database Schema & Setup**

**Status:** Ready

**Story**
*   **As an** Architect,
*   **I want** to implement the complete and finalized PostgreSQL schema in Supabase, including tables for core entities and operational governance,
*   **so that** we have a structured, scalable, and secure foundation for all platform data.

**Acceptance Criteria**
1.  All core tables (`users`, `user_profiles`, `companies`, `job_postings`, `applications`, etc.) from the ERD in `tad.md` are created.
2.  All operational tables (`jobs`, `ai_api_usage`, `ai_api_reservations`, `pii_redaction_logs`) from the ERD are created.
3.  The `job_postings` table includes a non-nullable `source_provenance` text field.
4.  The `pgvector` extension is successfully enabled.
5.  Row Level Security (RLS) policies are enabled on all user-specific tables, restricting access to the data's owner.

**Tasks / Subtasks (Implementation Checklist)**
*   [ ] **Task 1: Provision Supabase Project** (AC: #4, #5)
    *   [ ] Create a new, free-tier Supabase project for development.
    *   [ ] Document project URL and API keys in a secure, local `.env` file.
*   [ ] **Task 2: Implement Tables via SQL Migration Script** (AC: #1, #2, #3)
    *   [ ] Create the `users`, `user_profiles`, and `applications` tables.
    *   [ ] Create the `companies` and `job_postings` tables, ensuring `source_provenance` is included.
    *   [ ] Create the canonical `jobs`, `ai_api_usage`, `ai_api_reservations`, and `pii_redaction_logs` tables.
*   [ ] **Task 3: Establish Relationships and Indexes**
    *   [ ] Implement all foreign key relationships as defined in the ERD.
    *   [ ] Add indexes to foreign key columns and frequently queried columns.
*   [ ] **Task 4: Implement Row Level Security Policies** (AC: #5)
    *   [ ] Enable RLS on all user-specific tables.
    *   [ ] Create policies ensuring a user can only access their own records (`auth.uid() = user_id`).

**Dev Notes**
*   **Schema Source of Truth:** The definitive schema is the ERD located in `tad.md`, Section 5.1. Do not deviate.
*   **Security Mandate:** RLS implementation is a non-negotiable security requirement as per `NFR2`.

**Testing**
*   An integration test must verify the RLS policies by confirming that User B cannot query data created by User A.

---

#### **Story 1.2: Compliant Data Ingestion & Enrichment Pipeline**

**Status:** Ready (dev unblocked by `Story 0.3`)

**Story**
*   **As a** Data Engineer,
*   **I want** to build a Python script that seeds our database with an initial set of clean, compliant, and non-duplicate job postings,
*   **so that** the platform provides immediate and legally sound value to our first users.

**Acceptance Criteria**
1.  Before processing for the **production environment**, the pipeline programmatically checks that the data source is listed as `approved` in `approved_sources.yaml`. The job must fail if the check fails.
2.  The pipeline generates a unique hash for each job posting to prevent duplicates (`FR9`).
3.  The pipeline implements the tiered AI enrichment strategy (`FR10`).
4.  The pipeline generates and stores a vector embedding for each job posting, per `ADR-007`.
5.  The cleaned, unique, and enriched data is correctly inserted, and every posting includes a `source_provenance` field.

**Tasks / Subtasks (Implementation Checklist)**
*   [ ] **Task 1: Setup Python Project**
    *   [ ] Initialize a new Python project with `scrapy` and `pandas`.
*   [ ] **Task 2: Develop Compliant Ingestor** (AC: #1)
    *   [ ] Create a module to ingest data from an approved `Tier 1` source (e.g., licensed API).
    *   [ ] **Subtask: Implement pre-flight check against the `approved_sources.yaml` registry for production runs.**
*   [ ] **Task 3: Implement Core Processing Pipeline** (AC: #2, #3, #4)
    *   [ ] Create a Scrapy Item Pipeline for data processing.
    *   [ ] Subtask: Implement HTML cleaning logic.
    *   [ ] Subtask: Implement the deduplication hashing logic (`FR9`).
    *   [ ] Subtask: Implement the tiered skill extraction logic (`FR10`).
    *   [ ] Subtask: Implement the vector embedding generation logic (`ADR-007`).
*   [ ] **Task 4: Implement Database Insertion** (AC: #5)
    *   [ ] Implement logic to insert/update `companies` and `skills`.
    *   [ ] Implement logic to insert the final `job_postings`, ensuring the `source_provenance` field is populated.

**Dev Notes**
*   **Data Governance:** The compliance checks and provenance tracking are mission-critical. Refer to `tad.md`, Section 5.2 for the phased data strategy.
*   **Deployment Target:** This script will be containerized to run as a Google Cloud Run Job.

**Testing**
*   Unit tests must cover the data cleaning, hashing, and enrichment logic.
*   An integration test must verify that a job from a disallowed source is rejected by the pipeline (when run in production mode).

---

#### **Story 1.3: Core Opportunity API**

**Status:** Ready

**Story**
*   **As a** Backend Developer,
*   **I want** to create a secure, contract-driven Rust-based API endpoint to query job postings,
*   **so that** the frontend has a reliable data source for the Opportunity Hub.

**Acceptance Criteria**
1.  An `openapi.yaml` specification defines the `GET /api/opportunities` endpoint, its parameters, and response objects.
2.  A CI job generates TypeScript types and Rust server stubs from the `openapi.yaml` file.
3.  The endpoint is implemented in Rust using Axum and `sqlx`.
4.  The endpoint supports filtering and pagination.
5.  The endpoint is protected and returns `401 Unauthorized` if accessed without a valid JWT.

**Tasks / Subtasks (Implementation Checklist)**
*   [ ] **Task 1: Define API Contract** (AC: #1)
    *   [ ] Initialize the `openapi.yaml` file and define the `/opportunities` path.
*   [ ] **Task 2: Setup Codegen Pipeline** (AC: #2)
    *   [ ] Configure a CI job to run an OpenAPI generator.
*   [ ] **Task 3: Implement Rust Endpoint** (AC: #3, #4)
    *   [ ] Create the Axum router and handler for `/api/opportunities`.
    *   [ ] Implement `sqlx` repository logic for querying `job_postings`.
*   [ ] **Task 4: Implement Security** (AC: #5)
    *   [ ] Create and apply the JWT authentication middleware.

**Dev Notes**
*   **API Contract:** The `openapi.yaml` file is the absolute source of truth as per `ADR-003`.

**Testing**
*   Integration tests must validate the authentication middleware and a successful, authenticated request.

---

### **Epic 2: User Onboarding & Profile Synthesis**

**Epic Goal:** To build the complete user registration and data intake process, and the resilient, AI-powered profile synthesis and approval workflow.

---

#### **Story 2.1: User Account Creation**

**Status:** Ready

**Story**
*   **As a** new user,
*   **I want** to create a free account using an email and password,
*   **so that** I can access the JobSniper platform.

**Acceptance Criteria**
1.  Dedicated sign-up and log-in pages are created.
2.  A user can register with a valid email and secure password.
3.  Upon successful registration, the user is automatically logged in and redirected to the first onboarding step.
4.  The system provides clear error messages for invalid inputs.

**Tasks / Subtasks (Implementation Checklist)**
*   [ ] **Task 1: Build Frontend Auth UI** (AC: #1, #4)
    *   [ ] Create `SignUp.tsx` and `LogIn.tsx` React components.
*   [ ] **Task 2: Integrate Supabase Auth Client** (AC: #2)
    *   [ ] Create service functions to wrap the Supabase JS client's auth methods.
*   [ ] **Task 3: Implement Routing and Session Management** (AC: #3)
    *   [ ] Set up React Router with public and protected routes.

---

#### **Story 2.2: Onboarding - Career Document Upload**

**Status:** Ready

**Story**
*   **As a** new user,
*   **I want** to upload my resume and other career documents,
*   **so that** the system has the raw material to build my synthesized profile.

**Acceptance Criteria**
1.  The UI presents a clear "drag and drop" area and a "browse files" button.
2.  The system accepts files in PDF and DOCX formats (`FR2`).
3.  Uploaded files are securely stored in a private Supabase Storage bucket.

**Tasks / Subtasks (Implementation Checklist)**
*   [ ] **Task 1: Build Frontend Upload Component** (AC: #1, #2)
    *   [ ] Create a React component for the document upload step.
*   [ ] **Task 2: Create Backend Upload Endpoint** (AC: #3)
    *   [ ] In Rust, create a protected `POST /api/users/documents` endpoint that uploads the file to a private bucket.

---

#### **Story 2.3: Onboarding - Voice Narrative Capture & Transcription**

**Status:** Ready

**Story**
*   **As a** new user,
*   **I want** to record a short audio clip describing my career narrative using a polished UI,
*   **so that** the AI can understand my goals and tone in my own words.

**Acceptance Criteria**
1.  The UI displays the interface from `A04_uiux-specs.md` with controls to record, stop, playback, and a waveform visualizer.
2.  The final audio clip is uploaded to a secure backend endpoint.
3.  The backend endpoint creates a new entry in the canonical `jobs` table, triggers an asynchronous job, and immediately returns `202 Accepted`.
4.  The asynchronous job transcribes the audio using the AI Adapter service and updates the `jobs` table record upon completion.

**Tasks / Subtasks (Implementation Checklist)**
*   [ ] **Task 1: Build Frontend Recording UI** (AC: #1)
    *   [ ] Create a React component using the `MediaRecorder` API.
    *   [ ] Implement the waveform visualizer and re-record functionality as specified in the UI/UX doc.
*   [ ] **Task 2: Implement Backend API Endpoint** (AC: #2, #3)
    *   [ ] Create a protected `POST /api/users/narrative` endpoint in Rust.
    *   [ ] The handler saves the audio file and dispatches a task by creating a record in the `jobs` table.
    *   [ ] The handler immediately returns `202 Accepted`.
*   [ ] **Task 3: Implement Transcription Job** (AC: #4)
    *   [ ] Create a separate Rust application (e.g., Cloud Run Job) that polls the `jobs` table.
    *   [ ] The job retrieves the audio file, calls the AI Adapter's transcription method, and updates the `jobs` table record with the result.

**Dev Notes**
*   **Architecture Pattern:** This implementation **must** follow the resilient asynchronous processing pattern defined in `ADR-006`.

---

#### **Story 2.4: AI Profile Synthesis and User Approval**

**Status:** Ready

**Story**
*   **As a** new user,
*   **I want** the system to generate a structured career profile from my inputs, which I can then review, edit, and approve,
*   **so that** I have a single source of truth for my job search.

**Acceptance Criteria**
1.  After a user submits all their onboarding data, an asynchronous backend process is triggered to synthesize their profile (`FR4`).
2.  The UI shows distinct visual states for `processing`, `completed`, `failed`, and `awaiting_review` as defined in `A04_uiux-specs.md`.
3.  The asynchronous job uses the AI Adapter to generate a structured JSONB profile.
4.  The generated profile must pass the automated validation check defined in `ADR-008`. A validation failure sets the job status to `failed` or `awaiting_review`.
5.  Upon successful generation and validation, a second asynchronous job is triggered to generate the user's vector embedding per `ADR-007`.
6.  The user is presented with a UI to review, edit, and finally approve the profile.

**Tasks / Subtasks (Implementation Checklist)**
*   [ ] **Task 1: Implement Backend Synthesis Trigger** (AC: #1)
    *   [ ] Create a protected `POST /api/users/synthesize` endpoint.
    *   [ ] The endpoint handler dispatches a synthesis job via the `jobs` table and returns `202 Accepted`.
*   [ ] **Task 2: Implement Synthesis Job** (AC: #3, #4)
    *   [ ] The background job retrieves all user documents and transcriptions.
    *   [ ] It constructs a detailed prompt and calls the AI Adapter's generation method.
    *   [ ] **Subtask: Upon receiving the AI output, run the validation logic from `ADR-008`.**
    *   [ ] **Subtask: If validation is 'borderline', create an entry in the `hitl_review_queue` and set job status to `awaiting_review`.**
    *   [ ] On success, it saves the resulting JSON to `user_profiles.synthesized_profile` and updates the job status.
*   [ ] **Task 3: Implement Embedding Generation Job** (AC: #5)
    *   [ ] Create a new job type for embedding generation.
    *   [ ] The synthesis job, on completion, dispatches this new job.
    *   [ ] The embedding job calculates and saves the vector to `user_profiles.embedding`.
*   [ ] **Task 4: Build Frontend Review UI** (AC: #2, #6)
    *   [ ] Create a "Review Profile" React component that polls for the synthesis job result.
    *   [ ] **Implement the distinct UI states for `processing`, `completed`, `failed`, and `awaiting_review` as specified in `A04_uiux-specs.md`.**
    *   [ ] Implement the "Approve" button, which finalizes the profile.

**Dev Notes**
*   **Architecture Pattern:** This is a critical long-running task. The implementation **must** follow the asynchronous processing pattern defined in `ADR-006`.

---

### **Epic 3: The Diagnostic Funnel & Opportunity Hub**

**Epic Goal:** To develop the free "ATS Report Card" that delivers the core "Aha!" moment and the personalized job feed that demonstrates the platform's value.

---

#### **Story 3.1: The ATS Report Card Tool**

**Status:** Ready

**Story**
*   **As a** free user,
*   **I want** to get an immediate keyword analysis and then receive deeper AI suggestions for a job description,
*   **so that** I get instant value and understand the power of the full platform.

**Acceptance Criteria**
1.  The UI provides the two-panel layout as defined in `A04_uiux-specs.md`.
2.  Upon submission, the backend synchronously calculates and returns the keyword match score (`ADR-005`) and a `job_id` in under 2 seconds (`NFR4`).
3.  The backend simultaneously enqueues an asynchronous job to generate the AI-powered suggestions.
4.  The UI immediately displays the "Preview Ready" state with the score and keyword comparison, then polls for the full result using the `job_id`.
5.  When the async job completes, the UI updates to show the "Completed State" with the AI suggestions.
6.  The system enforces a usage limit for free-tier users.

**Tasks / Subtasks (Implementation Checklist)**
*   [ ] **Task 1: Build the Frontend UI** (AC: #1, #4, #5)
    *   [ ] Create the `ATSReportCard` React component with the two-panel layout.
    *   [ ] **Implement state management to handle `Processing`, `Preview Ready`, `Completed`, and `Failed` states.**
*   [ ] **Task 2: Create the Backend Analysis Endpoint** (AC: #2, #3, #6)
    *   [ ] Create a protected endpoint: `POST /api/tools/ats-report`.
    *   [ ] Implement logic to check usage limits.
    *   [ ] The handler will run the RAKE + Jaccard algorithm synchronously.
    *   [ ] The handler will enqueue a job for AI suggestion generation.
    *   [ ] **The handler will return the synchronous `preview` result and the `job_id` immediately.**
*   [ ] **Task 3: Implement the AI Suggestion Job** (AC: #3)
    *   [ ] Create the background job that takes the inputs and calls the AI Adapter to generate actionable suggestions.
    *   [ ] The job result is stored and linked to the `job_id`.

**Dev Notes**
*   **"Aha!" Moment**: The side-by-side comparison view and actionable suggestions are the key UX elements.

**Testing**
*   An integration test must verify the rate-limiting logic.
*   A unit test must validate the scoring algorithm against a known good and known bad resume/job pair.

---

#### **Story 3.2: Personalized Opportunity Hub Feed**

**Status:** Ready

**Story**
*   **As an** authenticated user with an approved profile,
*   **I want** to see a personalized feed of job opportunities that are conceptually matched and ranked for me,
*   **so that** I can efficiently discover the best-fit roles.

**Acceptance Criteria**
1.  A dedicated "Opportunity Hub" page exists.
2.  The backend `GET /api/opportunities` endpoint is enhanced to perform a `pgvector` cosine similarity search between the user's profile embedding and the job posting embeddings.
3.  The API returns a paginated list of job postings, ordered from highest match to lowest.
4.  The frontend displays each job as a card, including the "Fit" score.

**Tasks / Subtasks (Implementation Checklist)**
*   [ ] **Task 1: Implement Backend Ranking Logic** (AC: #2, #3)
    *   [ ] Enhance the `GET /api/opportunities` Rust endpoint.
    *   [ ] Retrieve the current user's embedding from `user_profiles`. This should fail gracefully if the embedding doesn't exist yet.
    *   [ ] **Modify the `sqlx` query to use a `pgvector` distance operator (`<->`) in the `ORDER BY` clause.**
*   [ ] **Task 2: Build the Frontend Opportunity Hub UI** (AC: #1, #4)
    *   [ ] Create a new `OpportunityHub.tsx` React component.
    *   [ ] Create a reusable `JobCard` component that displays the job title, company, location, and "Fit Score."

**Dev Notes**
*   **Core Technology**: The use of **`pgvector`** is the key technical component.

**Testing**
*   A critical integration test must seed test user/jobs with known vectors and assert that the returned jobs are ordered correctly.

---

### **Epic 4: The Application Workshop & Monetization**

**Epic Goal:** To build the core paid features, including the resume generation "Workshop" and the payment integration that drives revenue.

---

#### **Story 4.1: Subscription and Payment Integration**

**Status:** Ready

**Story**
*   **As a** free user,
*   **I want** to upgrade to a paid subscription plan that uses credits,
*   **so that** I can unlock premium features.

**Acceptance Criteria**
1.  The UI presents clear calls-to-action for upgrading.
2.  Payment is handled by a third-party processor (e.g., Stripe).
3.  A backend webhook handler securely validates and processes payment events.
4.  Upon successful payment, the user's `subscription_status` is updated and their monthly `credits` are allocated.

**Tasks / Subtasks (Implementation Checklist)**
*   [ ] **Task 1: Setup Payment Processor** (AC: #2)
    *   [ ] Configure subscription products in the Stripe dashboard.
*   [ ] **Task 2: Build Frontend Billing UI** (AC: #1)
    *   [ ] Create an `UpgradePage.tsx` component using the Stripe React library.
*   [ ] **Task 3: Create Backend Subscription Endpoints** (AC: #3, #4)
    *   [ ] Create a `POST /api/billing/create-subscription` endpoint.
    *   [ ] Create a public `POST /api/billing/webhook` endpoint, ensuring to verify the webhook signature.

---

#### **Story 4.2: The Application Workshop - Resume Generation**

**Status:** Ready

**Story**
*   **As a** paid user,
*   **I want** to select a job and have the AI generate a tailored resume for it,
*   **so that** I can dramatically increase my chances of getting an interview.

**Acceptance Criteria**
1.  A paid user can select a job to start the workshop.
2.  This action triggers an asynchronous resume generation job via the `jobs` table (`FR7`).
3.  The UI shows `processing` and `failed` states correctly as defined in `A04_uiux-specs.md`, Section 3.5.
4.  The asynchronous job uses the AI Adapter to generate the resume.
5.  **The generated resume must pass the automated validation check defined in `ADR-008`.**
6.  The validated resume content is saved and displayed in the Workshop UI.

**Tasks / Subtasks (Implementation Checklist)**
*   [ ] **Task 1: Implement Feature Gating**
    *   [ ] In the frontend, check the user's subscription status before enabling "Start Application" buttons.
*   [ ] **Task 2: Create Backend Generation Trigger** (AC: #2)
    *   [ ] Create a protected `POST /api/workshop/generate-resume` endpoint.
    *   [ ] The handler validates the subscription and dispatches a generation job via the `jobs` table.
*   [ ] **Task 3: Implement Resume Generation Job** (AC: #4, #5)
    *   [ ] The background job retrieves the user profile and job description.
    *   [ ] It engineers the prompt and calls the AI Adapter.
    *   [ ] **Subtask: Upon receiving the AI output, run the validation logic from `ADR-008`.**
    *   [ ] On success, it saves the result to the `applications` table and updates the job status.
*   [ ] **Task 4: Build Frontend Workshop UI** (AC: #1, #3, #6)
    *   [ ] Create an `ApplicationWorkshop.tsx` component that polls for the job result.
    *   [ ] **Implement the distinct UI states for `processing`, `completed`, and `failed` as specified in `A04_uiux-specs.md`.**

**Dev Notes**
*   **Architecture Pattern:** This implementation **must** follow the resilient asynchronous processing pattern defined in `ADR-006`.

---

#### **Story 4.3: Application Workshop - Editing and Asynchronous Exporting**

**Status:** Ready

**Story**
*   **As a** paid user,
*   **I want** to make final edits to my AI-generated resume and export it as a formatted PDF asynchronously,
*   **so that** I have a polished, submission-ready document without blocking the UI or timing out.

**Acceptance Criteria**
1.  The user can directly edit the text within the Workshop interface.
2.  The updated resume content is stored in the `applications` table.
3.  An "Export to PDF" button triggers a backend endpoint that creates an asynchronous export job and immediately returns `202 Accepted`.
4.  The UI enters a "generating PDF" state, as defined in `A04_uiux-specs.md`.
5.  The asynchronous background job uses a robust rendering service to generate the PDF from the resume content and saves it to secure storage.
6.  Upon job completion, the frontend is notified and initiates a file download for the user.

**Tasks / Subtasks (Implementation Checklist)**
*   [ ] **Task 1: Implement Frontend Editing and Saving** (AC: #1, #2)
    *   [ ] Add a "Save" button to the workshop UI that calls a `PUT /api/applications/{id}` endpoint.
*   [ ] **Task 2: Create Backend Export Job Trigger** (AC: #3, #4)
    *   [ ] Create a protected `POST /api/applications/{id}/export-pdf` endpoint.
    *   [ ] The handler validates subscription, **dispatches an export job to the `jobs` table, and returns `202 Accepted`.**
*   [ ] **Task 3: Implement Asynchronous PDF Generation Job** (AC: #5)
    *   [ ] Create a new background worker (e.g., Cloud Run Job) for PDF generation.
    *   [ ] The worker retrieves resume content, uses a headless browser (e.g., Puppeteer, or a managed service) to render HTML to PDF.
    *   [ ] The generated PDF is uploaded to a secure Supabase Storage bucket.
*   [ ] **Task 4: Implement Frontend Job Completion & Download** (AC: #6)
    *   [ ] The `ApplicationWorkshop` component polls for the PDF export job status.
    *   [ ] Upon `completed` status, it triggers a client-side download of the PDF from the generated URL.

---

### **Epic 5: Operational Readiness & Governance**

**Epic Goal:** To implement the critical, non-functional systems required for running the platform securely, cost-effectively, and reliably in production.

---

#### **Story 5.1: AI Governance & Hybrid PII Redaction**

**Status:** Ready

**Story**
*   **As the** CTO,
*   **I want** to ensure no user PII is ever sent to third-party AI providers using a robust, multi-layered, and auditable system,
*   **so that** we exceed compliance requirements and earn user trust.

**Acceptance Criteria**
1.  The `prompt_sanitizer` module in the Rust backend implements the hybrid (Regex + NER) redaction pipeline defined in `ADR-004`.
2.  The sanitizer is applied to all relevant AI-driven features.
3.  All redaction events are logged to the `pii_redaction_logs` table for auditing.
4.  A CI test exists that will fail the build if a known piece of PII passes through the sanitizer.

**Tasks / Subtasks (Implementation Checklist)**
*   [ ] **Task 1: Implement the `prompt_sanitizer` Module** (AC: #1)
    *   [ ] Implement the fast-pass regex layer.
    *   [ ] Integrate a lightweight, local NER model for entity detection.
    *   [ ] Implement the deterministic pseudonymization layer.
*   [ ] **Task 2: Implement Audit Logging** (AC: #3)
    *   [ ] Create the `pii_redaction_logs` table.
    *   [ ] Ensure the sanitizer writes an audit record for each redaction event.
*   [ ] **Task 3: Integrate Sanitizer with AI Adapter** (AC: #2)
    *   [ ] Ensure all calls to the AI Adapter first pass inputs through the full sanitizer pipeline.
*   [ ] **Task 4: Create CI Validation Test** (AC: #4)
    *   [ ] Enhance the integration test with adversarial PII examples (e.g., names in unusual formats).

---

#### **Story 5.2: AI Cost Control & Conservative Reservations**

**Status:** Ready

**Story**
*   **As the** Head of Finance,
*   **I want** to enforce our AI budget using a deterministic reservation system based on conservative, pre-calculated cost estimates,
*   **so that** our operational costs are predictable and immune to race conditions.

**Acceptance Criteria**
1.  The backend implements the atomic reservation pattern from `ADR-009`.
2.  For each AI operation, a conservative `cost_estimator` function is implemented.
3.  Before any AI call, a `pending` reservation is created using the estimated cost.
4.  The system logs an event for reconciliation if the actual cost significantly exceeds the estimated cost.
5.  An integration test successfully demonstrates the system's resilience to concurrent requests attempting to overspend the budget.

**Tasks / Subtasks (Implementation Checklist)**
*   [ ] **Task 1: Implement Conservative Cost Estimators** (AC: #2)
    *   [ ] Codify functions to calculate worst-case token counts for each AI prompt type.
*   [ ] **Task 2: Implement Atomic Reservation System in AI Adapter** (AC: #1, #3)
    *   [ ] Implement the database transaction logic to create a `pending` reservation.
    *   [ ] Implement the post-call logic to update the reservation to `committed` or `canceled`.
*   [ ] **Task 3: Implement Reconciliation Logging** (AC: #4)
    *   [ ] Add logic to compare actual vs. estimated cost and log significant variances.
*   [ ] **Task 4: Create Concurrency Integration Test** (AC: #5)
    *   [ ] Write a test that proves the budget cannot be overspent.

---

#### **Story 5.3: Production Readiness & Infrastructure Transition Plan**

**Status:** Ready

**Story**
*   **As the** DevOps Lead,
*   **I want** to plan, document, and rehearse the procedural transition from the development environment to the production GCP environment,
*   **so that** we can have a smooth, predictable, and low-risk launch.

**Acceptance Criteria**
1.  A detailed `gcp-migration.md` runbook is created and peer-reviewed, focusing on Infrastructure-as-Code (IaC) scripts, schema porting, and service deployment sequences.
2.  The production GCP environment (Cloud SQL, Cloud Run, etc.) is provisioned using the IaC scripts.
3.  At least one full, successful dry-run of the infrastructure provisioning and application deployment to a staging environment is completed and documented.
4.  The runbook is updated with any lessons learned from the dry-run, including timing and manual verification steps.

**Tasks / Subtasks (Implementation Checklist)**
*   [ ] **Task 1: Author the Migration Runbook** (AC: #1)
    *   [ ] Create `docs/ops/gcp-migration.md`.
    *   [ ] Document every step: IaC for all GCP services, database schema provisioning, application deployment, health checks, DNS changes, and rollback procedures.
*   [ ] **Task 2: Provision Production & Staging Infrastructure** (AC: #2)
    *   [ ] Write Terraform or similar IaC scripts to define the GCP resources.
    *   [ ] Use these scripts to provision both production and staging environments.
*   [ ] **Task 3: Execute and Document the Dry-Run** (AC: #3)
    *   [ ] Follow the runbook to perform a full infrastructure provisioning and application deployment to the staging environment.
    *   [ ] Document the outcome, including timing, any errors encountered, and successful verification of all services.
*   [ ] **Task 4: Finalize the Runbook** (AC: #4)
    *   [ ] Update the runbook with any corrections or improvements based on the dry-run experience.

**Dev Notes**
*   **Goal:** The final runbook should be so clear that a new engineer could execute the launch.
*   **No Data Migration:** This transition focuses on infrastructure and schema setup for a greenfield launch; no existing user data will be migrated from Supabase. The risk is purely procedural and infrastructural.

---

#### **Story 5.4: Implement Production Observability & Runbooks**

**Status:** Ready

**Story**
*   **As an** SRE,
*   **I want** to have comprehensive monitoring, actionable alerts, and clear incident response playbooks for our critical systems,
*   **so that** we can proactively identify and resolve production issues before they impact users.

**Acceptance Criteria**
1.  Monitoring dashboards (e.g., in Grafana) are created for key system health indicators defined in `NFR9`.
2.  Automated alerts (e.g., to PagerDuty) are configured for all P1/P0 scenarios defined in the TAD.
3.  For each configured P1/P0 alert, a version-controlled runbook is authored, detailing diagnostic and remediation steps.
4.  The on-call rotation is established and documented.

**Tasks / Subtasks (Implementation Checklist)**
*   [ ] **Task 1: Set Up Monitoring Infrastructure** (AC: #1)
    *   [ ] Configure Prometheus to scrape metrics from the backend services.
    *   [ ] Build Grafana dashboards for Latency SLOs, async job queues, AI provider error rates, and AI cost consumption.
*   [ ] **Task 2: Configure Alerting** (AC: #2)
    *   [ ] Write alert rules in Prometheus for SLO breaches, DLQ depth, error rate spikes, and budget thresholds.
    *   [ ] Integrate alerts with PagerDuty and a team Slack channel.
*   [ ] **Task 3: Author Initial Runbooks** (AC: #3)
    *   [ ] Create markdown files in a `runbooks/` directory for critical alerts (e.g., `ai_provider_outage.md`, `database_failover.md`).
    *   [ ] Each runbook must include sections for Severity, Diagnosis, Mitigation, and Escalation.
*   [ ] **Task 4: Establish On-Call Process** (AC: #4)
    *   [ ] Create and document the primary on-call rotation schedule and responsibilities.


<!-- ========================================== -->
<!-- File: A06_operational-gating.md -->
<!-- ========================================== -->

This document establishes the non-negotiable, foundational prerequisites that govern the project's data handling and core technical implementations. All development must adhere to these policies.

---

#### **1. Data Acquisition & Provenance Policy**

**1.1. Mandate**
No data source may be ingested, processed, or displayed within the JobSniper platform without first being vetted and explicitly approved according to the procedures defined herein. This policy is the single source of truth for data compliance.

**1.2. Source Classification**
All data sources are classified into one of two tiers:

*   **Tier 1 (Licensed & Permitted):** Data acquired through official, licensed APIs, direct partnerships, or sources that provide an explicit grant of permission for the intended use case. This is the preferred and default tier for all production data.
*   **Tier 2 (Publicly Available):** Data acquired from publicly accessible web sources. Ingestion from a Tier 2 source is permitted only after a formal review of its Terms of Service, `robots.txt`, and any other relevant legal notices has been completed and documented.

**1.3. The Approved Sources Registry**
The engineering team will maintain a version-controlled `approved_sources.yaml` file in the project's primary code repository. This registry is the definitive record of all vetted data sources.

*   **Schema:** Each entry in the registry must contain the following fields:
    *   `source_id`: A unique identifier (e.g., `linkedin_jobs_api`).
    *   `source_name`: The human-readable name (e.g., "LinkedIn Jobs API").
    *   `tier`: The classification (`Tier 1` or `Tier 2`).
    *   `status`: The current approval status (`approved`, `pending_review`, `denied`).
    *   `review_documentation_link`: A direct link to the legal review memo or contract document.
    *   `last_reviewed_on`: The date of the last formal review.

*   **Enforcement:** The data ingestion pipeline must perform a programmatic check against this registry before processing data from any source. Any attempt to ingest from a source not marked as `approved` must result in an immediate failure of the ingestion job.

---

#### **2. Core Algorithm Validation Framework**

**2.1. Mandate**
All mission-critical, user-facing algorithms must be validated for correctness and quality against a "golden set" of test data. A passing result against the relevant golden set is a mandatory quality gate for any deployment that modifies the underlying algorithm.

**2.2. Golden Set Definitions (MVP)**
The following golden sets will be established and maintained in a dedicated, version-controlled `validation/` directory within the project's primary code repository.

*   **`golden_set_ats_scoring.json`**
    *   **Purpose:** To validate the keyword extraction and scoring algorithm defined in `ADR-005`.
    *   **Content:** An array of at least 50 objects, each containing a resume text, a job description text, and a human-verified classification (`good_match`, `average_match`, `poor_match`).
    *   **Success Metric:** The algorithm must correctly classify >90% of the entries in the set.

*   **`golden_set_semantic_search.json`**
    *   **Purpose:** To validate the quality and relevance of the `pgvector` semantic search results for the Opportunity Hub.
    *   **Content:** An array of at least 100 objects, each containing a user profile summary and a list of 10 job postings, with the top 3 most relevant jobs explicitly marked by a human reviewer.
    *   **Success Metric:** The semantic search algorithm must achieve a Normalized Discounted Cumulative Gain (nDCG) score of >0.85 against this set.

---

#### **3. Human-in-the-Loop (HITL) Capacity Policy**

**3.1. Mandate**
The platform's ability to deliver exceptionally high-quality AI artifacts is augmented by an expert human review process. However, this human capacity is a finite, operational resource and must be managed as a potential system bottleneck.

**3.2. Policy**
*   **Capacity Definition:** The total HITL capacity is defined as **5 founder-hours per week**.
*   **Unit Cost:** Each review unit (e.g., one synthesized profile) is estimated to cost **3 minutes** of review time.
*   **System Awareness:** The backend system must be aware of this capacity limit. The number of items in the `hitl_review_queue` must be monitored.
*   **Contingency Protocol:** If the queue depth exceeds a level that can be cleared within the weekly capacity, the system must trigger a "backlogged" state. In this state:
    1.  The automated AI validation (`ADR-008`) may be configured with a stricter threshold to reduce the number of items escalated to the queue.
    2.  The user-facing UI (`A04_uiux-specs.md`) will display updated messaging to manage expectations regarding review times.
    3.  An alert will be sent to project leadership to evaluate the need for additional review resources.


<!-- ========================================== -->
<!-- File: A07_gcp-migration.md -->
<!-- ========================================== -->

# GCP Migration Runbook

## Overview
This runbook provides step-by-step instructions for migrating the JobSniper platform to production on Google Cloud Platform (GCP). This includes infrastructure provisioning, application deployment, data migration, and verification procedures.

## Prerequisites
- ✅ All previous waves completed
- ✅ CI/CD pipeline validated
- ✅ Database schema finalized
- ✅ Application code tested and ready
- ✅ Monitoring and observability configured
- ✅ Security hardening completed
- ✅ Compliance requirements met

## Migration Checklist

### Phase 1: Pre-Migration Preparation
- [ ] Environment validation completed
- [ ] Backup procedures tested
- [ ] Rollback plan documented
- [ ] Team communication plan established
- [ ] Migration window scheduled

### Phase 2: Infrastructure Provisioning
- [ ] Production GCP project created
- [ ] VPC and networking configured
- [ ] Database instance provisioned
- [ ] Load balancers configured
- [ ] CDN configured
- [ ] DNS updated

### Phase 3: Application Deployment
- [ ] Backend API deployed
- [ ] Frontend application deployed
- [ ] Workers deployed
- [ ] Data pipeline deployed

### Phase 4: Data Migration
- [ ] Database schema deployed
- [ ] Initial data seeded
- [ ] Approved sources configured
- [ ] PII redaction verified

### Phase 5: Verification and Testing
- [ ] Health checks passed
- [ ] Integration tests passed
- [ ] Performance tests completed
- [ ] Security scan completed

### Phase 6: Go-Live
- [ ] Traffic switched to production
- [ ] Monitoring confirmed
- [ ] Team notified
- [ ] Post-launch verification completed

## Detailed Migration Steps

### 1. Environment Setup
```bash
# Set GCP project
gcloud config set project jobsniper-production

# Enable required APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable sqladmin.googleapis.com
gcloud services enable vpcaccess.googleapis.com
gcloud services enable secretmanager.googleapis.com
gcloud services enable monitoring.googleapis.com
gcloud services enable logging.googleapis.com
```

### 2. Infrastructure as Code Deployment
```bash
# Deploy VPC and networking
cd infrastructure/terraform
terraform init
terraform plan -var="environment=production"
terraform apply -var="environment=production"

# Verify VPC setup
gcloud compute networks describe jobsniper-vpc --project=jobsniper-production
gcloud compute firewall-rules list --filter="network:jobsniper-vpc"
```

### 3. Database Migration
```bash
# Create production database instance
gcloud sql instances create jobsniper-prod \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=us-central1 \
  --root-password=[SECURE_PASSWORD] \
  --database-flags=cloudsql.iam_authentication=on

# Run database migrations
cd database/migrations
psql -h [INSTANCE_IP] -U postgres -d postgres < 001_initial_schema.sql

# Import seed data
psql -h [INSTANCE_IP] -U postgres -d jobsniper < seed_data.sql
```

### 4. Application Deployment
```bash
# Deploy backend API
gcloud run deploy jobsniper-backend \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars="DATABASE_URL=[PROD_DB_URL]" \
  --set-env-vars="RUST_ENV=production"

# Deploy frontend
gcloud run deploy jobsniper-frontend \
  --source ./frontend-web \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars="API_URL=https://api.jobsniper.com"

# Deploy workers
gcloud run deploy jobsniper-workers \
  --source . \
  --platform managed \
  --region us-central1 \
  --no-allow-unauthenticated \
  --set-env-vars="DATABASE_URL=[PROD_DB_URL]"
```

### 5. Load Balancer Configuration
```bash
# Create load balancer
gcloud compute target-https-proxies create jobsniper-https-proxy \
  --url-map=jobsniper-url-map \
  --ssl-certificates=jobsniper-ssl-cert

# Configure DNS
gcloud dns record-sets create api.jobsniper.com \
  --rrdatas=[LB_IP] \
  --ttl=300 \
  --type=A \
  --zone=jobsniper-zone
```

### 6. Monitoring and Alerting Setup
```bash
# Configure monitoring
gcloud monitoring dashboards create \
  --config-from-file=monitoring/production-dashboard.json

# Set up alerting
gcloud alpha monitoring policies create \
  --policy-from-file=monitoring/alert-policies.yaml
```

## Verification Procedures

### Health Checks
```bash
# Backend health check
curl -f https://api.jobsniper.com/health

# Frontend health check
curl -f https://jobsniper.com/health

# Database connectivity
psql -h [DB_HOST] -U postgres -c "SELECT 1;" jobsniper
```

### Integration Tests
```bash
# Run full integration test suite
cd backend-api
cargo test --test integration_tests

# Run data pipeline tests
cd data-pipeline
python -m pytest tests/ -v
```

### Performance Validation
```bash
# Load testing
artillery run performance-tests/load-test.yml

# Database performance
psql -h [DB_HOST] -U postgres -c "EXPLAIN ANALYZE SELECT * FROM jobs LIMIT 100;" jobsniper
```

## Rollback Procedures

### Emergency Rollback
```bash
# Switch traffic back to staging
gcloud compute url-maps remove-path-matcher jobsniper-url-map \
  --path-matcher-name=production

# Restore database from backup
gcloud sql backups restore [BACKUP_ID] \
  --restore-instance=jobsniper-prod
```

### Gradual Rollback
```bash
# Reduce traffic to production
gcloud compute backend-services update jobsniper-backend-service \
  --region=us-central1 \
  --balancing-mode=RATE \
  --max-rate-per-instance=50
```

## Post-Migration Tasks

### 1. Monitoring Setup
- [ ] Verify all monitoring dashboards are functional
- [ ] Confirm alerting rules are triggering correctly
- [ ] Set up log aggregation and analysis

### 2. Security Validation
- [ ] Run security scan on production environment
- [ ] Verify SSL certificates are properly configured
- [ ] Confirm firewall rules are restrictive

### 3. Performance Optimization
- [ ] Analyze query performance and create indexes as needed
- [ ] Configure CDN caching rules
- [ ] Set up database connection pooling

### 4. Documentation Updates
- [ ] Update API documentation with production URLs
- [ ] Document any environment-specific configurations
- [ ] Update runbooks with production-specific procedures

## Success Criteria

### Technical Success
- ✅ All health checks passing
- ✅ Zero-downtime migration completed
- ✅ Performance meets SLO requirements
- ✅ Security scan passes
- ✅ Monitoring and alerting functional

### Business Success
- ✅ User traffic successfully migrated
- ✅ No data loss or corruption
- ✅ All compliance requirements met
- ✅ Legal sign-off obtained
- ✅ Team trained on production procedures

## Support Contacts

### Technical Team
- DevOps Lead: [Name] - [Contact]
- Backend Lead: [Name] - [Contact]
- Frontend Lead: [Name] - [Contact]

### External Support
- GCP Support: [Ticket/Case Number]
- Database Support: [Contact]
- CDN Support: [Contact]

## Emergency Procedures

### Critical Issues
1. **Service Down**: Follow emergency response playbook
2. **Data Corruption**: Activate backup restoration procedure
3. **Security Breach**: Execute security incident response plan

### Communication Plan
- Internal team: Slack #production-alerts
- External users: Status page at status.jobsniper.com
- Stakeholders: Email distribution list

<!-- ========================================== -->
<!-- File: B01_pvd.md -->
<!-- ========================================== -->

### **JobSniper: Product Vision Document (PVD)**

This document outlines the complete strategic vision for the JobSniper user experience, from initial user psychology to the final delivery of its core value proposition. It serves as the foundational "why" for the entire platform.

**1. Core Philosophy & Mandates**

*   **The Prime Directive:** The platform exists for a single, focused purpose: **to get the user interviews.** Every feature, workflow, and design element must be ruthlessly optimized for this outcome.
*   **The User is the Operator:** Our target user is a high-intent, strategically-minded professional. The UI is not a passive browsing experience; it is a command console. The AI is a powerful tool under the user's explicit control. The design must be data-rich, efficient, and built for decisive action.
*   **Trust Through Control & Transparency:** Trust is established by placing the user in command. The user is the final arbiter of their own data, most critically during the approval of their Master CV. The AI proposes; the user approves. The system's logic is transparently exposed through scores and data, empowering the user to make informed strategic decisions.
*   **Automated & Scalable by Design:** The core engine is built for automation. All primary user-facing processes are designed to be self-sufficient and scalable. The architecture avoids manual bottlenecks in favor of resilient, automated workflows.

**2. System Glossary & Key Concepts**

*   **Master CV:** The user's central, foundational data asset. It is a comprehensive, potentially multi-page document that serves as the "single source of truth" for all AI-driven generation. It resides in a dedicated, full-screen, vertical-scroll editor within the `Settings` page.
*   **Strategic ListView:** The mandatory default layout for the `Opportunity Hub`. It is a wide, data-dense format modeled on professional software, designed for deep analysis and multi-selection rather than casual browsing.
*   **Proprietary Scores:** The core of the platform's analytical advantage, exposed directly to the user. These include the `Match Score` (the ultimate indicator of fit), `Intensity Score`, `Perk Score`, and `Optics Score`.
*   **Application Package:** The primary unit of value created by the platform. A single package consists of one AI-tailored Resume, one AI-tailored Cover Letter, and a resulting `ATS Score`. The generation of one package consumes one user credit.
*   **Launchpad:** The user's final command and control center for all generated application materials. It is the hub for reviewing, refining, and deploying their applications.

**3. The Critical User Journeys**

*   **The Onboarding Journey - Forging the Master CV:** The user's first experience is focused on forging their core strategic asset. They provide the raw materials (existing resumes, a voice or text-based narrative), and the AI performs the synthesis. The journey culminates when the user is directed to the full-screen editor in `Settings`. Here, they review the AI's draft, paying special attention to AI-flagged statements of low confidence (indicated with visual highlights), and give their final, explicit approval. This act establishes their command over the system.

*   **The Hunt - Strategic Target Acquisition:** This journey takes place in the `Opportunity Hub` and offers three distinct pathways:
    1.  **AI-Led Hunt (Auto-Search):** The highest-value path, where the user deploys the AI to find the best-fit opportunities based on their approved Master CV.
    2.  **Operator-Led Hunt (Keyword Search):** The traditional search path, providing full control for users with specific targets in mind.
    3.  **BYO-Target (Manual Input):** A streamlined path for users who have already found an opportunity. They paste a job ad link or text and are routed directly to the application generation trigger, bypassing the search execution steps.
    Regardless of the path, the user leverages the Strategic ListView to analyze targets with proprietary scores and select them for engagement.

*   **The Workshop - Assembling the Application Package:** This is the core, credit-consuming action of the platform, triggered from the `Opportunity Hub`. The AI asynchronously crafts the tailored materials for the selected target(s). The newly generated Application Package then appears as an interactive card in the `Launchpad`.

*   **The Refinement & Launch - The Application Workshop:** The `Launchpad` is an active workshop, not a static download folder. From a generated application's card, the user can perform quick actions like downloading the materials or viewing the original post. Critically, the user can also select to **"Edit/Refine,"** which opens the package in the dedicated **Application Workshop**. This three-panel interface (Navigation | Editor | Context & Tools) provides a powerful environment for making final text edits, selecting different visual templates (a paid feature), and reviewing all relevant job data before downloading the final, perfected PDFs for manual submission.

<!-- ========================================== -->
<!-- File: B02_flow-diagram.md -->
<!-- ========================================== -->
```
graph TD
    subgraph System_Entry [Entry & Authentication]
        A[Start] --> B{Has Account?};
        B -->|No| B1["Sign Up Page"];
        B -->|Yes| B2["Login Page"];
        B1 --> C["Initiate Onboarding Flow"];
        B2 -->|Authenticated| D[Dashboard];
    end

    subgraph Onboarding_Flow [Onboarding]
        C --> C1["Step 1: Upload Materials"];
        C1 --> C2["Step 2: Voice/Text Narrative Input"];
        C2 --> C3["Trigger AI Profile Synthesis Job"];
        C3 --> C4["UI: Show Processing State"];
        C4 --> C5{AI Synthesis Result};
        C5 -->|OK| C6["Redirect to Settings for Full-Screen Review"];
        C5 -->|Failed| C7["UI: Show Error State w/ Retry"];
        C6 --> H;
    end

    subgraph Main_Hubs [Main Hubs]
        D --> E["Opportunity Hub"];
        D --> G["Applications Page"];
        D --> H["Settings Page"];
    end
    
    subgraph Settings_Management [Settings Page]
        H --> H1["View/Edit Master CV (Full Screen)"];
        H1 --> H2["User Reviews AI Confidence Flags"];
        H2 --> H3{Initial CV Approved?};
        H3 -->|Yes| D;
        H1 --> H4["Edit User Links (LinkedIn/Portfolio)"];
        H1 --> H5{User Tier?};
        H5 -->|Paid| H6["Enable 'Download Master CV'"];
        H5 -->|Free| H7["'Download Master CV' Disabled"];
    end

    subgraph Opportunity_Hub [Opportunity Hub]
        E --> E1{Select Tab};
        E1 -->|Search Tab| E2["Search Interface"];
        E1 -->|Saved Tab| E3["Display Saved Opportunities"];
        
        E2 --> E4{Input Method};
        E4 -->|Keyword Search| E5["Input: Keywords, Region, etc."];
        E4 -->|Auto-Search| E6["Action: Click 'Find Best Matches'"];
        E4 -->|Manual Input| E7["Action: Paste Job Ad Link/Text"];
        
        E5 --> E8["Execute Search"];
        E6 --> E8;
        
        E8 --> E9{User Tier?};
        E9 -->|Free| E10["Check Search Limit"];
        E10 -->|Limit OK| E11;
        E10 -->|Limit Exceeded| Monetization_Upgrade["Show Upgrade Modal"];
        
        E9 -->|Paid| E12["Display Advanced Filters"];
        E12 --> E11["Execute Search w/ Filters"];
        
        E11 --> E13["Display Strategic ListView of Results"];
        E13 --> E14{User Tier?};
        E14 -->|Free| E15["UI: Obfuscate Non-Top Results"];
        E14 -->|Paid| E16["UI: Show All Results"];

        E15 --> E17{User Interaction};
        E16 --> E17;
        E3 --> E17;

        E17 -->|Select via Checkbox| E18["UI: Show Action Bar"];
        E18 --> E19{Select Action};
        E19 -->|Save| E20["Add to Saved List"];
        E20 --> E3;
        E19 -->|Generate| AppGenTrigger["Trigger Application Generation"];
        
        E17 -->|"Click Row Details"| E21["UI: Display Job Synopsis"];
        
        E7 --> E22["Create Temp Opportunity from Input"];
        E22 --> AppGenTrigger;
    end

    subgraph Application_Generation [Application Generation]
        AppGenTrigger --> AG1{Check Credits/Limits};
        AG1 -->|"Limit Reached"| Monetization_Upgrade;
        AG1 -->|OK| AG2["Consume 1 Credit"];
        AG2 --> AG3["Trigger Async Generation Job"];
        AG3 --> AG4["UI: Show 'Processing' Toast"];
        AG4 --> G;
        
        subgraph AsyncJob ["Async: Application Pkg Gen"]
            direction LR
            J1[Started] --> J2["AI Generates Resume, Cover Letter & ATS Score"] --> J3[Complete];
        end
    end

    subgraph Applications_Page [Applications Page]
        G -->|"Populated by Async Job"| G1["Display New App Package in Card View"];
        G1 --> G2["Card Header Shows: Role, Company, Scores"];
        G1 --> G3{User Action on Card};
        G3 -->|Download| G4["Initiate PDF Download"];
        G3 -->|View Post| G5["Open Original Job Link"];
        G3 -->|"Edit/Refine"| W["Enter Application Workshop"];
    end
    
    subgraph Application_Workshop [Application Workshop]
        W --> W1["Display 3-Panel Layout (Nav | Editor | Context)"];
        W_Center["Center Panel: Document Editor"]
        W_Right["Right Panel: Job Info & Template Tools"]
        
        W1 --> W_Center;
        W1 --> W_Right;
        
        W_Center --> W2{User Action};
        W_Right --> W2;
        
        W2 -->|"Saves Edits"| W3["Persist Changes"];
        W2 -->|"Selects New Template"| W4["Apply Template to Document"];
        W2 -->|"Clicks Download"| G4;
    end
```