# 03-uat-plan.md

**User Acceptance Testing (UAT) & Quality Assurance Plan**

**Project Name:** River Breeze Domestic Detailing Scheduling & Lead Gen Platform
**Developer/Tester:** Greg Farrell
**Date of Testing:** 2026-03-01
**Project Version/Release:** v1.0 - Production Candidate

---

### **1. Testing Environment Checklist**
* **Operating Systems Tested:** Windows 11, Android
* **Browsers Tested:** Google Chrome, Microsoft Edge
* **Device Viewports:** * Desktop PC (1920x1080)
    * Mobile - Samsung Galaxy (412x915)

---

### **2. Testing Protocol & Evidence**
* **Goal:** Verify that all Functional and Technical requirements—specifically the Smart Anchor Engine and secure deposit flow—have been met.
* **Screenshot Protocol:** Every core functionality test **must** be accompanied by a screenshot proving the expected result. Embed screenshots in the "Proof" column using the syntax: `![Description](./path-to-image.png)`.
* **Status Codes:** * **PASS:** Feature works exactly as expected.
    * **FAIL:** Feature is broken or produces an error.

---

### **3. Test Cases**

**Phase 1: Scheduling Logic (Smart Anchor Engine)**

| ID | Feature | Steps to Execute | Expected Result | Pass/Fail | Proof |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **SCH-01** | Travel Buffer | Book a 2-hour job at 9:00 AM. Check availability for a subsequent 2-hour job. | Next slot starts at 11:30 AM (includes mandatory 30-min travel buffer). | [ ] | [Proof] |
| **SCH-02** | Gap Prevention | Define a shift from 9:00 AM - 5:00 PM. Attempt to book a slot that leaves a 30-min gap. | Slot is hidden; engine only allows 0 min gaps or >= 60 min gaps. | [ ] | [Proof] |
| **SCH-03** | Race Condition | Open two browsers. Book the same slot on Browser A, then immediately on Browser B. | Browser B is rejected by the Real-Time Security Check with "Slot was just booked" error. | [ ] | [Proof] |

**Phase 2: Lead Gen & Conditional Checkout**

| ID | Feature | Steps to Execute | Expected Result | Pass/Fail | Proof |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **LGN-01** | Quote Engine | Input property specs (e.g., 2500 sqft, 3 beds, 2 baths) into the calculator. | Price and Est. Time update instantly based on specific algorithms. | [ ] | [Proof] |
| **LGN-02** | Deposit Flow | As a "New Client," complete the booking form and proceed to checkout. | Routing forces a $20 non-refundable credit card deposit before confirmation. | [ ] | [Proof] |
| **LGN-03** | Magic Reveal | Verify identity as a "Returning Client" with address + phone. | App triggers premium CSS clip-path animation and loads past property data. | [ ] | [Proof] |

**Phase 3: Admin Dashboard Operations**

| ID | Feature | Steps to Execute | Expected Result | Pass/Fail | Proof |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **ADM-01** | Shift Security | Attempt to delete an active shift that contains a "Confirmed" appointment. | Deletion blocked; UI displays error requiring cancellation of jobs first. | [ ] | [Proof] |
| **ADM-02** | Job Finalization | Click "Finalize Job" on a past confirmed appointment and add admin notes. | Status updates to "Completed"; notes appear in Client Roster history. | [ ] | [Proof] |
| **ADM-03** | Soft-Archive | Click "Deactivate Client" in the roster view. | Client `isActive` set to false; future jobs are automatically canceled. | [ ] | [Proof] |

**Phase 4: Integrations & Validation**

| ID | Feature | Steps to Execute | Expected Result | Pass/Fail | Proof |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **INT-01** | Google Maps | Type "Main St" without a house number in the address autocomplete. | Autocomplete rejects input; forces selection of an exact house number. | [ ] | [Proof] |
| **INT-02** | Date Validation | Attempt to select a past date in the Availability Manager. | Native HTML `min` attribute grays out all dates before today. | [ ] | [Proof] |

---

### **4. Final Sign-Off**
_By signing below, the developer and client agree that all functional requirements have been tested, proven via screenshot evidence, and are approved for production deployment._

**Developer Signature:** ___________________________ **Date:** ____________

**Client Signature:** ______________________________ **Date:** ____________