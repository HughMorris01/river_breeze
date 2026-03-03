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

* **User Authentication:** Secure JWT-based login exclusively for the business owner to access the protected Admin Dashboard.
* **Core Feature A (Dynamic Quote Calculator):** Interactive form capturing property variables (square footage, beds/baths, pets) and cleaning type (Express, Standard, Spring Reset) to instantly output an estimated price and service duration.
* **Core Feature B (Two-Pass Smart Anchor Engine):** A custom scheduling algorithm that calculates exact job footprints (job time + 15-minute travel buffer). It anchors new slots flush against existing jobs or shift boundaries and steps in 120-minute increments to eliminate schedule fragmentation. Includes a "Squeeze Pass" that strips the buffer to mathematically fit appointments into tight schedules.
* **Core Feature C (Conditional Booking Flow):** Returning clients bypass the quoting calculator via identity verification (Address + Phone) for a frictionless 2-click rebook. New clients proceed through a full booking flow with a simulated $20 credit card deposit checkout.
* **Data Management (CRM-Lite Dashboard):** Admin portal featuring dynamic tabs (Pending, Confirmed, Completed, Canceled), automated "New" vs. "Returning" client badges, job finalization with internal property notes, soft-archiving of inactive clients, and availability shift management.
* **Integrations:** Google Maps Places API Autocomplete (bound to specific coordinates around Clayton, NY) for strict address validation and standardized data entry.

**4. Technical Requirements**

| Component | Technology |
| --- | --- |
| **Frontend** | React.js (Vite), Tailwind CSS, Zustand, React Router DOM, React Hot Toast |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB / Mongoose |
| **Authentication**| JWT (JSON Web Tokens) |
| **Integrations** | Google Maps Places API |
| **Version Control**| Git / GitHub |

*(Note: The payment gateway UI is built out for Credit Card, PayPal, and Stripe, but the actual transaction processing is bypassed/simulated for UAT testing.)*

**5. User Flow & UX/UI Design**

* **Design Language:** Premium, modern interface leaning into the "River Breeze" branding. Features Apple-style glassmorphism, dynamic AM/PM time formatting, and high-end native CSS `clip-path` animations (the "Magic Reveal" hover effects).
* **Key Pages:**
    * `/` (Home / Landing Page)
    * `/services` (Service Packages with Hybrid Desktop/Mobile Magic Reveal)
    * `/quote` (Dynamic Calculator)
    * `/booking` (New Client Checkout & Scheduling)
    * `/returning` (Returning Client Identity Verification & Rebooking)
    * `/admin` (Protected CRM Dashboard & Availability Manager)
    * `/confirmation` (Digital Receipt & Booking Summary)
* **Sitemap:** Linear conversion funnel from Landing -> Services -> Quote -> Book, with a separate isolated, accelerated track for Returning Clients.

**6. Non-Functional Requirements**

* **Performance:** Instantaneous state calculations in the dynamic quote engine; rapid frontend rendering with optimized React state management.
* **Security:** Admin routes and API endpoints strictly protected by JWT middleware. Simulated payment processing ensures zero exposure of sensitive financial data during the testing/UAT phase.
* **Scalability:** The backend scheduling logic and MongoDB architecture are specifically designed to handle concurrent booking attempts, utilizing mathematical footprint comparisons to prevent race-condition double-bookings.
* **Responsiveness:** Mobile-first approach utilizing Tailwind CSS, ensuring that complex UI elements like data tables, scheduling calendars, and CSS hover animations adapt perfectly to smartphone touch-interfaces.

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