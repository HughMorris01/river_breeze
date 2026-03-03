**Project Name: River Breeze Domestic Detailing Scheduling & Lead Gen Platform**

**Version:** 1.0

**Status:** Active Development

**Stakeholders:** Katherine (Client), Greg Farrell (Lead Developer)

**1. Executive Summary**

* **The Problem:** The client needs to modernize her local detailing business by digitizing the manual booking process and gaining strict control over her scheduling availability to eliminate unprofitable calendar gaps. 
* **The Solution:** A full-stack MERN application featuring a high-conversion lead generation funnel, a dynamic quote calculator, and a custom scheduling engine.
* **Value Proposition:** Automates quoting, securely captures $20 deposits for new leads, retains returning clients with a frictionless rebooking flow, and mathematically protects the business's daily schedule from fragmentation. Differentiates from generic competitors by capturing the seasonal market with specialized packages.

**2. Target Audience & User Personas**

* **Primary User (Seasonal Resident):** Homeowners needing specialized "Opening" and "Closing" packages for their Wellesley Island properties.
* **Primary User (Standard Client):** Homeowners/renters wanting a frictionless way to find out how much a standard or deep cleaning costs and book it immediately.
* **Admin User (Business Owner):** Katherine. Needs a centralized dashboard to dictate exactly when she is available, review upcoming appointments, and manage incoming leads and deposits.
* **User Goals:** Obtain an instant, accurate price estimate based on property specs and book a guaranteed time slot without manual texting/calling.

**3. Functional Requirements**

* **User Authentication:** Secure JWT-based login exclusively for the business owner to access the Admin Dashboard.
* **Core Feature A (Dynamic Quote Calculator):** Interactive form capturing square footage, beds/baths, pets, and cleaning type (Express, Standard, Spring Breeze Reset) to output an estimated price and time duration.
* **Core Feature B (Intelligent Booking & Deposit Flow):** A calendar interface displaying available slots governed by a custom algorithm. Includes a conditional checkout: Returning clients bypass deposits (Pay in Person), while New clients must pay a $20 non-refundable credit card deposit.
* **Data Management:** Admin dashboard with a CRM-lite view identifying "New" vs. "Returning" clients, availability shift management, and appointment Kanban/List views (Pending, Confirmed, Completed, Canceled).
* **Integrations:** Google Maps Autocomplete (bound to a 30-mile radius around Clayton, NY), Stripe API for deposit capture, and automated email confirmations/reminders.

**4. Technical Requirements**

| Component | Technology |
| --- | --- |
| **Frontend** | React.js (Vite), Tailwind CSS, Zustand |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB / Mongoose |
| **Authentication**| JWT (JSON Web Tokens) |
| **Integrations** | Google Places API, Stripe API, SendGrid/Nodemailer |
| **Version Control**| Git / GitHub |

**5. User Flow & UX/UI Design**

* **Design Language:** Premium, modern interface leaning into "Breeze" and "Detailing" branding. Features Apple-style glassmorphism, interactive "Before & After" image sliders, and custom CSS clip-path animations (Magic Reveal).
* **Key Pages:**
    * `/` (Home / Landing Page)
    * `/quote` (Dynamic Calculator)
    * `/book` (New Client Checkout & Scheduling)
    * `/returning` (Identity Verification)
    * `/returning/confirm` (Returning Client 2-Click Rebook)
    * `/admin` (Protected Dashboard)
* **Sitemap:** Linear conversion funnel from Landing -> Quote -> Book, with a separate isolated track for Returning Clients.

**6. Non-Functional Requirements**

* **Performance:** Instantaneous state updates in the dynamic calculator; fast optimistic UI updates in the admin dashboard.
* **Security:** Stripe handles all PCI-compliant payment data (no sensitive financial data stored). Admin routes strictly protected by JWT middleware.
* **Scalability:** Custom scheduling algorithm built to handle concurrent booking attempts without double-booking (Real-Time Security Check).
* **Responsiveness:** Mobile-first approach, recognizing that most local service bookings happen on smartphones.

**7. Success Metrics (KPIs)**

* **Technical:** Zero double-bookings or unprofitable 30-minute gaps on the calendar.
* **Business:** Increased conversion rate of seasonal leads and 100% automated collection of $20 deposits for new clients.
* **User:** High retention/rebook rate utilizing the frictionless Returning Client portal.

**8. Timeline & Milestones**

* **Phase 1:** Core UI/UX and dynamic quote calculator logic.
* **Phase 2:** Custom scheduling algorithm (Smart Anchor Engine) and shift management.
* **Phase 3:** Returning client verification flow, database integration, and Stripe testing.
* **Phase 4:** Admin dashboard completion, operational features (client notes, finalize jobs), and deployment.

**9. Risks & Assumptions**

* **Assumption:** The application is built for a solo cleaner (multi-employee management is out of scope for MVP).
* **Assumption:** Returning clients will pay via cash/in-person, so full prepayments are excluded to keep the flow simple.
* **Risk:** Edge cases in the Google Maps API returning unformatted addresses.
* **Mitigation:** Strict frontend validation rejecting inputs without valid house numbers before saving to the database.