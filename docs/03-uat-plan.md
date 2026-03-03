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
* **Goal:** Verify that all Functional and Technical requirements—specifically the Scheduling Engine has been met.
* **Screenshot Protocol:** Every core functionality test **must** be accompanied by a screenshot proving the expected result. Embed screenshots in the "Proof" column using the syntax: `![Description](./path-to-image.png)`.
* **Status Codes:** * **PASS:** Feature works exactly as expected.
    * **FAIL:** Feature is broken or produces an error.

---

### **3. Test Cases**

**Phase 1: Scheduling Logic (Smart Anchor Engine v2.0)**

| ID | Feature | Steps to Execute | Expected Result | Pass/Fail | Proof |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **SCH-01** | 120-Minute Stepping | Create an empty 9:00 AM - 5:00 PM shift. Search for a 2.75 hr footprint (2.5h job + 15m buffer). | Engine displays slots exactly 2 hours apart starting from the shift start (9:00 AM, 11:00 AM, 1:00 PM). | PASS | ![Create Shift](./media/image-1.png) ![Shift Added](./media/image-2.png) ![Appointment Windows](./media/image-3.png) |
| **SCH-02** | Flush Anchoring | With an existing 11:00 AM - 1:45 PM booking, search for a 1.75 hr footprint in the same shift. | Engine anchors exactly to the existing job, displaying 9:15 AM (backward flush) and 1:45 PM (forward flush). | PASS | ![Book 11am](./media/image-4.png) ![Appointment Windows](./media/image-5.png) |
| **SCH-03** | The Squeeze Pass | Search for a 2.5 hr job on a day with exactly 2.5 hrs of contiguous free time remaining. | Engine strips the standard 15-min travel buffer (Pass 2) to successfully "cram" the job into the exact remaining space. | PASS | ![Create Shift](./media/image-10.png) ![2.5hr Shift Added](./media/image-11.png) ![Appointment Window](./media/image-12.png) |
| **SCH-03** | Race Condition | Open two browsers. Book the same slot on Browser A, then immediately on Browser B. | Browser B is rejected by the Real-Time Security Check with "Slot was just booked" error. | [ ] |![User John Books](./media/image-6.png) ![User Katherine Denied](./media/image-7.png)|


**Phase 2: Lead Gen & Conditional Checkout**

| ID | Feature | Steps to Execute | Expected Result | Pass/Fail | Proof |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **LGN-01** | Quote Engine | Input property specs (e.g., 2500 sqft, 3 beds, 2 baths) into the calculator. | Price and Est. Time update instantly based on specific algorithms. | PASS | ![Default Setting](./media/image-8.png) ![Updated Quote](./media/image-9.png) |
| **LGN-02** | Deposit Flow | As a "New Client," complete the booking form and proceed to checkout. | Routing forces a $20 non-refundable credit card deposit before confirmation. | PASS | ![Credit Card Warning Toast](./media/image-13.png) |
| **LGN-03** | Magic Reveal | Verify identity as a "Returning Client" with address + phone. | App triggers premium CSS clip-path animation and loads past property data. | PASS | ![Magic Reveal](./media/image-14.png)|

**Phase 3: Admin Dashboard Operations**

| ID | Feature | Steps to Execute | Expected Result | Pass/Fail | Proof |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **ADM-01** | Shift Security | Attempt to delete an active shift that contains a "Pending" appointment. | Deletion blocked; UI requires the appointment to be canceled and then the admin can delete the shift. | PASS | ![Shift Locked](./media/image-15.png) ![Shift Unlocked](./media/image-16.png) ![Confirm Delete](./media/image-18.png) ![Shift Deleted](./media/image-17.png)|
| **ADM-02** | Soft-Archive | Click "Deactivate Client" in the roster view. | Client `isActive` set to false; future jobs are automatically canceled. | PASS| ![David Jones](./media/image-19.png) ![Deactivate Client](./media/image-20.png) ![Confirm Delete](./media/image-21.png) ![isActive: false](./media/image-23.png) ![Appointment Canceled](./media/image-22.png)|

**Phase 4: Integrations & Validation**

| ID | Feature | Steps to Execute | Expected Result | Pass/Fail | Proof |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **INT-01** | Google Maps | Type "Main St" without a house number in the address autocomplete. | Autocomplete rejects input; forces selection of an exact house number. | PASS | ![Main Street](./media/image-24.png) ![Error Toast](./media/image-25.png)|
| **INT-02** | Date Validation | Attempt to select a past date in the Availability Manager. | Native HTML `min` attribute grays out all dates before today. | PASS| ![March 1st Gray](./media/image-26.png) |

---

### **4. Final Sign-Off**
_By signing below, the developer and client agree that all functional requirements have been tested, proven via screenshot evidence, and are approved for production deployment._

**Developer Signature:** __Greg Farrell__ **Date:** _3/2/2026_

**Client Signature:** ______________________________ **Date:** ____________