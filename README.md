# Jobarman LLC Website

Jobarman is a state-of-the-art job search and recruitment platform built on Next.js 16 (App Router), React 19, and Tailwind CSS. The system divides workflows seamlessly between job seekers and recruiters with customized tools for resume building, scoring, application history, job posting, and interview scheduling.

## 🚀 Key Features

### For Job Seekers (Employees)
* **Interactive Resume Builder**: Create, store, and export professional resumes in PDF.
* **Resume Analyzer**: Verify resume relevance and score compatibility.
* **Auto-Apply Engine**: Automatically process matches and apply to target vacancies.
* **Application History**: Track application pipelines and recruiter actions in real-time.

### For Recruiters (Employers)
* **Job Posting & Pricing Plans**: Flexible subscription packages for job ads.
* **Recruitment Funnel**: Manage candidates dynamically, rejecting or progressing them.
* **Interview Scheduler**: Integrate direct interview setup with time slot selection.
* **Resume Explorer**: Browse and search candidate resumes with high-quality PDF viewers.

### Universal Capabilities
* **Real-time Chatting**: Implements direct peer-to-peer messaging via WebRTC (`simple-peer`) and Socket.io.
* **Notification Hub**: Instant global notifications for job status, invites, and chats.

---

## 🛠️ Technology Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Core Framework** | Next.js 16 (App Router) | React framework with Server Actions and SSR capabilities. |
| **Frontend UI** | React 19, Radix UI, Tailwind CSS | Sleek styling with custom modular dialogs, dropdowns, and form primitives. |
| **State & Cookies** | `cookies-next`, Next Headers | Secure HTTP-Only cookie management for authentication tokens. |
| **Graphics & Charts** | Recharts, Swiper | Dynamic dashboards, recruiter analytics, and landing sliders. |
| **PDF Operations** | `html2canvas`, `jspdf`, `react-pdf`, `pdfjs-dist` | Generating, rendering, and parsing client-side PDFs. |
| **Real-time & WebRTC** | `socket.io-client`, `simple-peer` | Real-time chat messaging and audio/video calling. |
| **Icons** | React Icons, Lucide React | Curated SVG icons. |

---

## 📁 Directory Structure

```
jobarman-website/
├── public/                 # Static assets (logos, illustrations)
├── src/
│   ├── app/                # Next.js App Router route groups
│   │   ├── (auth)/         # Login, registration, role selection
│   │   ├── (guest)/        # Landing page, jobs feed, pricing, policy, career-spotlight
│   │   ├── (jobSeeker)/    # Seeker resume creation, scoring, history, settings
│   │   ├── (recruiter)/    # Job manager, post-job form, funnel status, applicant resume checks
│   │   ├── (allUser)/      # Shared features (Chat, Notifications)
│   │   ├── layout.jsx      # Root HTML layout
│   │   └── globals.css     # Global styles and tailwind imports
│   ├── components/         # Component architecture
│   │   ├── guest/          # Guest-facing components (FilterModal, AutoApply, etc.)
│   │   ├── recruiter/      # Recruiter modals (InterviewSheduleModal, CancelInterview, etc.)
│   │   ├── jobSeeker/      # Seeker components (FavoriteList, JobDetails)
│   │   ├── shared/         # Shared layouts (Navbar, Footer, AppDownloadLinks)
│   │   └── ui/             # Radix UI wrapper primitives (Dialog, Button, Calendar, Select)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility integrations (e.g. cn tailwind-merge helper)
│   ├── constants/          # Static constants (pricing tiers, drop lists)
│   └── enum/               # Enums for user roles and statuses
└── utils/                  # Server & Client helper methods (myFetch wrapper, authCookies, role matchers)
```

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory:

```env
# Backend API Base URLs
BASE_URL=https://api.jobarman.com/api/v1
NEXT_PUBLIC_BASE_URL=https://api.jobarman.com/api/v1

# Asset/Image Hosting Root URL
NEXT_PUBLIC_IMAGE_URL=https://api.jobarman.com/
```

---

## 🏃 Getting Started

### 1. Install Dependencies
Make sure you have Node.js installed. Then run:
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the port shown in terminal) with your browser.

### 3. Production Build
To validate, optimize, and build the production bundle:
```bash
npm run build
npm run start
```

---

## 🔒 Authentication & API Fetching

The project features a unified server-side authentication fetcher, `myFetch.js`, which wraps around the standard `fetch` API:
* **Authorization**: Reads JWT access tokens securely from server cookies and attaches them automatically as `Authorization: Bearer <token>`.
* **Content Negotiation**: Auto-resolves headers dynamically (Multipart Form-Data for uploads vs JSON bodies for standard REST payloads).
* **Token Management**: Handled via secure server cookie managers (`setAuthCookies`, `deleteAuthCookies` inside `utils/authCookies.js`).
