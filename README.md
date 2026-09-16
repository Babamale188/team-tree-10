# Remix of Team Directory & Org Chart Template

# AI Agent Prompt

Create this application called **OrgChart — Company Org Chart & Directory**, a clean, internal org chart tool that visualizes company hierarchy and gives every employee a rich, customizable profile. It is designed for small-to-mid-sized companies, startups, and internal teams who want a simple, self-hosted org chart without paying for enterprise HR software. The primary users are admins (HR or ops leads) who manage the chart, and employees who browse it to understand the organization and find teammates. The main user action is to visually explore the company org chart and click into any employee to view their full profile.

This application should accomplish the following technically: provide an interactive, hierarchical visualization of the company org chart that gracefully handles 4–5 levels of hierarchy on desktop and falls back to a collapsible list on mobile; store employee records (name, title, photo, bio, skills, reporting relationships) in a secure, internal database; implement a password-protected admin panel for managing employees and hierarchy; and deliver a fast, responsive user experience with a modern, professional design inspired by Linear and Notion.

**Backend Architecture Recommendation:** Use **Supabase** as the foundational backend solution. Supabase provides PostgreSQL for relational data storage (perfect for hierarchical employee relationships), built-in Row-Level Security (RLS) for admin-only edit access, Supabase Auth for simple password-based admin login, and Supabase Storage for profile photo uploads. This eliminates the need for third-party services and keeps the entire application self-contained and portable for cloning. The relational structure of Supabase makes it ideal for managing manager-to-employee relationships and querying the hierarchy efficiently.

**MVP Strategy:** Focus on the three core features—Interactive Org Chart Tree, Employee Profiles, and Admin People Manager—to deliver a functional, usable product within the first release. The MVP should prioritize visual clarity, intuitive navigation, and a smooth admin onboarding flow with guided empty states. Defer department grouping, search-on-chart, self-service profile updates, and export functionality to V2, allowing the team to validate the core value proposition and gather user feedback before expanding features.

**Future Roadmap (V2+):** Enhance the product with department/team color-coding, advanced search and filtering on the org chart itself, employee self-service profile updates, PNG/PDF export, multiple view modes (tree vs. flat cards), org chart version history, and optional Slack integration. These features will increase engagement and provide additional value without compromising the simplicity of the MVP.

---

## Project Overview

**Product Name:** OrgChart — Company Org Chart & Directory

**Purpose:** OrgChart is an internal, self-hosted org chart and employee directory tool that enables companies to visualize their organizational structure and maintain rich employee profiles in a single, easy-to-use application. It replaces expensive, bloated HR software with a lightweight, cloneable template that companies can own and customize.

**Target Users:**

- **Primary:** HR and operations leads (admins) who manage the org chart and employee data

- **Secondary:** All employees who browse the chart to understand company structure and find teammates

**Core Value Proposition:**

- No subscriptions, no SaaS lock-in—companies own their data

- Visual hierarchy tree + rich employee profiles in one tool

- Clean, modern design inspired by Linear and Notion

- Simple admin interface for managing employees and reporting relationships

- Fast, responsive experience on desktop and mobile

**Market Opportunity:** Small-to-mid-sized companies (50–500 employees) and startups that need an internal org chart but cannot justify the cost of enterprise HR platforms. This is a free Lovable template designed for internal use, not a monetized SaaS product.

**Design Philosophy:** Clean, modern, and professional. Deep navy (#0F1F3D) paired with bright teal/electric blue (#3B82F6) for interactive elements. White cards, subtle shadows, generous whitespace. Typography: Inter or similar geometric sans-serif. Inspired by Linear, Notion, and Loom's internal tools—sharp, minimal, no clutter. Tagline: "Know your team. Navigate your company."

---

## Core Functionality

**1. Interactive Org Chart Tree**

- Visual, hierarchical representation of the company structure

- Expand/collapse functionality for departments and reporting lines

- Each node displays employee photo, name, and title

- Nodes styled as polished profile cards, not generic boxes

- Clickable nodes navigate to full employee profiles

- Gracefully handles 4–5 levels of hierarchy on desktop

- Mobile fallback: collapsible list/directory view instead of tree rendering

**2. Employee Profiles**

- Dedicated profile page for each employee

- Displays: photo, full name, job title, bio (text), skills (tag list)

- Shows manager and direct reports with clickable links

- Navigation between related profiles (manager, direct reports)

- Profile card view option for quick previews

**3. People Directory**

- Searchable, filterable flat list of all employees

- Filter by title, skills, or manager

- Quick access to any employee profile

- Serves as a fallback view on mobile devices

**4. Admin People Manager**

- Password-protected admin dashboard

- Add new employees with guided form

- Edit existing employee records (photo, name, title, bio, skills, manager)

- Delete employees (with confirmation)

- Manage reporting relationships (assign/change manager)

- Bulk actions for efficiency (future V2 feature)

- Empty state guidance for first-time setup

**5. Admin Authentication**

- Simple password-based login for admin users

- Session management to keep admins logged in

- Logout functionality

- Only admins can edit; all employees can browse

---

## User Journey

**For Employees (Browsing):**

1. Land on the Org Chart home page and see the full visual hierarchy tree

2. Browse the chart—expand or collapse branches by department or level

3. Click on any employee node to open their profile card or full profile page

4. View the employee's photo, title, bio, and skills

5. See who they report to and who reports to them, with clickable links to those profiles

6. Use the People Directory to search for a specific colleague by name or skill

7. Return to the org chart or navigate between profiles seamlessly

**For Admins (Managing):**

1. Log in with admin password to access the Admin Dashboard

2. See an empty state on first login with guidance to add the first employee (CEO/top-level leader)

3. Add the CEO/top-level leader with photo, name, title, and bio

4. Add subsequent employees by selecting their manager from the existing list

5. Build the hierarchy downward, assigning reporting relationships as employees are added

6. Edit any employee's information (photo, title, bio, skills) at any time

7. Delete employees if needed (with confirmation to prevent accidental removal)

8. View the updated org chart in real-time as changes are made

9. Logout when finished

**Post-Signup Flow (First-Time Setup):**

1. Admin logs in for the first time with a default password or initial setup code

2. Redirected to the Admin Dashboard with a friendly empty state

3. Guided prompt: "Let's build your org chart. Start with your CEO or top-level leader."

4. Admin fills out the CEO form (photo, name, title, bio)

5. Next prompt: "Add your next employee and assign their manager"

6. Admin adds employees one by one, selecting their manager from the dropdown

7. As employees are added, the org chart populates and becomes visible

8. Admin can switch between the org chart view and the admin panel to see progress

9. Once the hierarchy is established, the org chart is live for all employees to browse

---

## Technical Requirements

**Frontend Stack:**

- React or Vue.js for component-based UI

- TypeScript for type safety

- Tailwind CSS for styling (or CSS-in-JS)

- React Query or SWR for data fetching and caching

- React Router for navigation

- Recharts or D3.js for org chart tree visualization (or custom SVG rendering)

- Zustand or Context API for state management

**Backend Stack:**

- Supabase (PostgreSQL, Auth, Storage, RLS)

- Node.js/Express or Supabase Edge Functions for API logic (if needed)

- REST API for client-server communication

**Database Schema (Supabase PostgreSQL):**

```

employees table:

- id (UUID, primary key)

- name (text, required)

- title (text, required)

- bio (text, optional)

- photo_url (text, optional, points to Supabase Storage)

- manager_id (UUID, foreign key to employees.id, nullable for top-level)

- skills (text array or JSON, optional)

- created_at (timestamp)

- updated_at (timestamp)

admin_users table:

- id (UUID, primary key)

- password_hash (text, hashed with bcrypt)

- created_at (timestamp)

- last_login (timestamp)

```

**Authentication & Security:**

- Supabase Auth for admin login (email/password or custom auth)

- Row-Level Security (RLS) policies to restrict edit access to admins only

- Password hashing with bcrypt

- Session tokens for admin persistence

- HTTPS for all communications

- No public API endpoints for data modification

**Performance Requirements:**

- Org chart renders in under 2 seconds for up to 500 employees

- Profile pages load in under 1 second

- Directory search returns results in under 500ms

- Mobile view optimized for devices with 320px+ width

- Lazy loading for images and off-screen content

**Browser Support:**

- Chrome, Firefox, Safari, Edge (latest 2 versions)

- Mobile browsers: iOS Safari, Chrome Mobile, Firefox Mobile

**Hosting & Deployment:**

- Vercel, Netlify, or self-hosted (Docker)

- Supabase Cloud or self-hosted Supabase instance

- CDN for static assets and images

---

## API Integrations

**MVP (No External Integrations Required):**

- Supabase REST API for all data operations (employees, auth, storage)

- No third-party HR system integrations needed

- No Slack, Google Workspace, or Azure AD integration in MVP

**Optional Nice-to-Have (Not MVP):**

- **Supabase Storage** for profile photo uploads (built-in, no external service needed)

- **Cloudinary** (alternative to Supabase Storage for image hosting, if preferred)

**Future V2 Integrations (Post-MVP):**

- **Slack API** to link employee profiles from Slack or embed org chart in Slack

- **Google Workspace Directory API** for optional SSO and user sync

- **Azure AD** for enterprise customers

- **Zapier/Make** for workflow automation (e.g., notify Slack when org chart changes)

**API Endpoints (Supabase REST):**

```

GET /rest/v1/employees - Fetch all employees

GET /rest/v1/employees/{id} - Fetch single employee

POST /rest/v1/employees - Create employee (admin only)

PATCH /rest/v1/employees/{id} - Update employee (admin only)

DELETE /rest/v1/employees/{id} - Delete employee (admin only)

POST /auth/v1/token - Admin login

POST /auth/v1/logout - Admin logout

POST /storage/v1/b/profile-photos/upload - Upload profile photo

```

---

## Real-Time Features

**MVP Approach:** No real-time features required for MVP. The org chart is static data with on-demand updates by the admin.

**Data Update Flow:**

- Admin makes changes in the People Manager (add, edit, delete employee)

- Changes are saved to Supabase immediately

- Admin sees updated org chart on the same page (page refresh or client-side state update)

- Employees browsing the org chart see the latest data on page load or manual refresh

- No push notifications or live sync needed

**Future V2 Enhancements (Optional):**

- WebSocket integration for live org chart updates when admins make changes (employees see updates without refreshing)

- Slack notifications when org chart changes (e.g., "New team member added")

- Email notifications for employees when their profile is updated

- Activity log showing who changed what and when (org chart version history)

---

## Implementation Details

**Phase 1: Setup & Database**

1. Create Supabase project and configure PostgreSQL

2. Design and create `employees` and `admin_users` tables with RLS policies

3. Set up Supabase Auth for admin login

4. Configure Supabase Storage for profile photos

5. Create seed data or migration scripts for testing

**Phase 2: Frontend - Core Pages**

1. Build the Org Chart View (home page) with tree visualization

2. Build the Employee Profile page with all details

3. Build the People Directory with search/filter

4. Implement responsive design (desktop tree, mobile list fallback)

**Phase 3: Admin Interface**

1. Build the Login page with password authentication

2. Build the Admin Dashboard with empty state guidance

3. Build the Add/Edit Employee form with photo upload

4. Build the People Manager (list of employees with edit/delete actions)

5. Implement manager assignment dropdown (hierarchical selection)

**Phase 4: Integration & Polish**

1. Connect all pages to Supabase API

2. Implement error handling and loading states

3. Add empty state messaging and guided flows

4. Test org chart rendering with various hierarchy depths

5. Optimize mobile experience

6. Implement image optimization and lazy loading

**Phase 5: Testing & Deployment**

1. Unit tests for core functions (hierarchy queries, auth)

2. Integration tests for API endpoints

3. E2E tests for user journeys (admin setup, employee browsing)

4. Performance testing (load time, render speed)

5. Deploy to Vercel/Netlify with Supabase backend

**Code Organization:**

```

/src

  /components

    - OrgChart.tsx (tree visualization)

    - EmployeeProfile.tsx

    - PeopleDirectory.tsx

    - AdminDashboard.tsx

    - LoginPage.tsx

    - EmployeeForm.tsx

  /pages

    - index.tsx (home/org chart)

    - /employee/[id].tsx (profile page)

    - /directory.tsx (people directory)

    - /admin/login.tsx

    - /admin/dashboard.tsx

  /lib

    - supabase.ts (Supabase client)

    - auth.ts (authentication logic)

    - api.ts (API calls)

    - types.ts (TypeScript interfaces)

  /styles

    - globals.css

    - tailwind.config.js

  /public

    - images, icons, etc.

```

---

## MVP Features

**1. Interactive Org Chart Tree**

- Hierarchical visualization of company structure

- Expand/collapse nodes by department/level

- Clickable nodes navigate to employee profiles

- Displays photo, name, and title on each node

- Desktop tree view with 4–5 levels of hierarchy

- Mobile fallback to collapsible list view

- Smooth animations and transitions

**2. Employee Profiles**

- Dedicated profile page for each employee

- Displays: photo, name, title, bio, skills (tag list)

- Shows manager and direct reports with links

- Navigation between related profiles

- Clean, card-based layout matching design system

**3. People Directory**

- Searchable, filterable list of all employees

- Filter by name, title, or skills

- Quick access to any employee profile

- Serves as mobile alternative to tree view

**4. Admin People Manager**

- Password-protected admin dashboard

- Add new employees with guided form

- Edit employee information (photo, name, title, bio, skills, manager)

- Delete employees with confirmation

- Manage reporting relationships (assign manager)

- Friendly empty state with setup guidance

- Real-time org chart preview as changes are made

**5. Admin Authentication**

- Simple password-based login

- Session management

- Logout functionality

- Secure access to admin panel only

**6. Photo Upload**

- Upload profile photos via Supabase Storage

- Image optimization and compression

- Fallback avatar for employees without photos

**7. Responsive Design**

- Desktop: full tree visualization

- Tablet: optimized tree or list view

- Mobile: collapsible list/directory view

- Touch-friendly interactions

---

## Future Features

**V2 Enhancements:**

**1. Department & Team Grouping**

- Color-coded branches for different departments

- Department-level filtering and navigation

- Team-specific org charts (sub-hierarchies)

**2. Advanced Search & Filtering**

- Search and filter directly on the org chart (not just directory)

- Filter by department, title, skills, manager

- Highlight search results on the tree

**3. Employee Self-Service**

- Allow employees to update their own bio and skills

- Photo upload by employees

- Profile customization (pronouns, social links, etc.)

**4. Export Functionality**

- Export org chart as PNG or PDF

- Export employee directory as CSV

- Scheduled email reports

**5. Multiple View Modes**

- Hierarchical tree view (current)

- Flat directory card view

- Department-focused view

- Manager-focused view (show team members)

**6. Org Chart Version History**

- Track changes to the org chart over time

- View historical snapshots of the organization

- See how the company has grown

- Rollback capability (admin only)

**7. Slack Integration**

- Link employee profiles from Slack

- Embed org chart in Slack channels

- Slack notifications for org chart changes

- Slack slash commands to search employees

**8. Bulk Actions**

- Bulk import employees from CSV

- Bulk update manager assignments

- Bulk delete employees

**9. Advanced Reporting**

- Span of control analysis (how many direct reports per manager)

- Organizational metrics and insights

- Headcount by department/level

- Turnover tracking

**10. Customization & Branding**

- Custom company logo and branding

- Customizable color schemes

- Custom fields for employee profiles

- Workflow customization

---

## User Experience Guidelines

**Design System:**

- **Color Palette:**

  - Primary: Deep Navy (#0F1F3D)

  - Accent: Bright Teal/Electric Blue (#3B82F6)

  - Neutral: White, light gray (#F9FAFB), dark gray (#374151)

  - Status: Green (success), Red (error), Yellow (warning)

- **Typography:**

  - Font Family: Inter or similar geometric sans-serif

  - Headings: Bold, 24px–32px

  - Body: Regular, 14px–16px

  - Labels: Medium, 12px–14px

- **Spacing:** 8px grid system (8px, 16px, 24px, 32px, 48px)

- **Shadows:** Subtle, minimal shadows for depth (0 1px 3px rgba(0,0,0,0.1))

- **Whitespace:** Generous margins and padding for clarity

**Org Chart Nodes:**

- Styled as polished profile cards, not generic boxes

- Display: photo (small circle), name, title

- Hover state: slight elevation, highlight manager/direct reports

- Click: navigate to full profile

- Expand/collapse arrow for branches

- Color-coded by department (future feature)

**Employee Profile Page:**

- Hero section: large photo, name, title

- Two-column layout: details on left, related profiles on right

- Sections: Bio, Skills, Manager, Direct Reports

- Links to manager and direct reports profiles

- Back button to org chart

- Edit button for admins

**Admin Interface:**

- Separate visual treatment from public pages (darker header, admin badge)

- Sidebar navigation: Dashboard, People Manager, Settings

- Form validation with clear error messages

- Confirmation dialogs for destructive actions

- Loading states and progress indicators

- Success/error toast notifications

**Empty States:**

- Friendly, encouraging messaging

- Clear call-to-action buttons

- Illustrations or icons for visual interest

- Step-by-step guidance for first-time setup

**Mobile Experience:**

- Collapsible list view instead of tree

- Full-width cards and buttons

- Simplified navigation (hamburger menu if needed)

- Touch-friendly spacing (minimum 44px tap targets)

- Optimized forms for mobile input

**Accessibility:**

- WCAG 2.1 AA compliance

- Semantic HTML and ARIA labels

- Keyboard navigation support

- Color contrast ratios ≥4.5:1

- Alt text for all images

- Focus indicators for interactive elements

**Performance:**

- Fast page loads (< 2 seconds for org chart)

- Smooth animations (60fps)

- Lazy loading for images and off-screen content

- Optimized bundle size (< 200KB gzipped)

- Caching strategy for static assets

**Error Handling:**

- Clear, actionable error messages

- Graceful degradation if images fail to load

- Retry logic for failed API calls

- Offline fallback (cached data)

---

## Code Quality Standards

**Language & Framework:**

- TypeScript for all code (strict mode enabled)

- React 18+ with functional components and hooks

- ESLint and Prettier for code formatting

- Husky for pre-commit hooks

**Code Style:**

- Consistent naming conventions (camelCase for variables, PascalCase for components)

- Single quotes for strings, semicolons at end of statements

- Max line length: 100 characters

- Comments for complex logic, not obvious code

- JSDoc comments for exported functions

**Testing:**

- Unit tests for utility functions and API calls (Jest + React Testing Library)

- Integration tests for API endpoints (Supabase)

- E2E tests for critical user journeys (Cypress or Playwright)

- Minimum 70% code coverage for MVP

- Test naming: `describe('ComponentName', () => { it('should...') })`

**Performance:**

- Lighthouse score ≥ 90 for all pages

- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1

- Bundle size monitoring (< 200KB gzipped)

- Image optimization (WebP, lazy loading, responsive sizes)

- Code splitting for routes and large components

**Security:**

- No hardcoded secrets (use environment variables)

- SQL injection prevention (use parameterized queries via Supabase)

- XSS protection (sanitize user input, use React's built-in escaping)

- CSRF tokens for state-changing requests

- Rate limiting on admin endpoints

- HTTPS only for all communications

**Database:**

- Normalized schema design

- Proper indexing for query performance

- Foreign key constraints for data integrity

- RLS policies for access control

- Regular backups and disaster recovery plan

**Git & Version Control:**

- Semantic versioning (v1.0.0, v1.1.0, v2.0.0)

- Descriptive commit messages: `feat: add org chart tree view`

- Feature branches: `feature/org-chart-tree`, `fix/profile-photo-upload`

- Pull request reviews before merging to main

- Squash commits for clean history

**Documentation:**

- README with setup instructions

- API documentation (Swagger/OpenAPI)

- Component storybook for UI components

- Deployment guide

- Troubleshooting guide for common issues

**Monitoring & Logging:**

- Error tracking (Sentry or similar)

- Performance monitoring (Web Vitals, API response times)

- User analytics (Plausible or similar, privacy-focused)

- Structured logging for debugging

- Alert thresholds for critical errors

---

## Deliverable Format

**MVP Release Deliverables:**

**1. Frontend Application**

- React/TypeScript application deployed to Vercel or Netlify

- All pages and components fully functional

- Responsive design tested on desktop, tablet, and mobile

- Performance optimized (Lighthouse ≥ 90)

**2. Backend & Database**

- Supabase project with PostgreSQL database

- All tables, indexes, and RLS policies configured

- API endpoints tested and documented

- Authentication system working (admin login/logout)

**3. Documentation**

- README.md with project overview and setup instructions

- Installation guide for cloning and deploying

- Admin guide for managing the org chart

- User guide for browsing the org chart and profiles

- API documentation (endpoints, request/response formats)

- Deployment instructions (Vercel, Netlify, or self-hosted)

**4. Code Repository**

- GitHub repository with clean commit history

- .env.example file for environment variables

- package.json with all dependencies

- TypeScript configuration (tsconfig.json)

- ESLint and Prettier configuration

- GitHub Actions for CI/CD (optional)

**5. Testing**

- Unit tests for core functions (≥70% coverage)

- Integration tests for API endpoints

- E2E tests for critical user journeys

- Test results and coverage reports

**6. Design Assets**

- Figma file or design system documentation

- Color palette and typography specifications

- Component library (buttons, cards, forms, etc.)

- Responsive breakpoints and layout guidelines

**7. Deployment Package**

- Docker configuration (optional, for self-hosting)

- Environment configuration (.env.example)

- Database migration scripts

- Seed data for testing

- Deployment checklist

**8. Demo & Video**

- Live demo link (deployed application)

- 5–10 minute walkthrough video showing:

  - Admin setup flow (adding first employee)

  - Org chart browsing experience

  - Employee profile viewing

  - Admin editing and management

  - Mobile responsiveness

**9. Analytics & Metrics**

- Performance metrics (page load times, bundle size)

- Accessibility audit results (WCAG compliance)

- SEO audit (if applicable)

- Security audit (OWASP top 10)

**10. Future Roadmap Document**

- V2 feature list with priorities

- Estimated effort for each feature

- Potential integrations (Slack, Google Workspace, etc.)

- Scaling considerations for larger organizations

**Deliverable Checklist:**

- [ ] Frontend application deployed and accessible

- [ ] All MVP features implemented and tested

- [ ] Supabase backend configured and secured

- [ ] Admin authentication working

- [ ] Photo upload and storage functional

- [ ] Responsive design verified on all devices

- [ ] Performance optimized (Lighthouse ≥ 90)

- [ ] Documentation complete and clear

- [ ] Code repository clean and well-organized

- [ ] Tests passing (unit, integration, E2E)

- [ ] Demo video recorded and published

- [ ] Deployment guide tested and verified

- [ ] Security audit completed

- [ ] Accessibility audit completed (WCAG AA)

- [ ] Future roadmap documented

We need an Admin role and Member Role - have the correct RLS

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://team-tree-10.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/60d93767-4724-4733-b268-d6642e27e07b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
