# ReturnX – Smart Enterprise Lost & Found Management System

ReturnX is a full-stack, microservices-based web application designed to help employees recover lost items (laptops, corporate IDs, access badges, personal belongings) within an enterprise environment. 

It replaces slow, manual processes like mass HR emails and spreadsheets with real-time tracking, automated peer-to-peer chat, and gamified incentives.

---

## 💡 Key Features

- **JWT Authentication:** Secure user signup and login.
- **Lost & Found Reporting:** Easily log missing or found items with images, category, location, and description.
- **Smart Search & Filters:** Search catalog by keywords, category, or date.
- **Auto-Generated Chat Rooms:** Private chat room opens automatically when an item claim is initiated.
- **Real-Time Messaging:** WebSocket integration for live chat and instant message history.
- **Karma Points & Gamification:** Finders earn points for reporting and returning items. Top contributors appear on the public leaderboard.
- **Admin Dashboard:** Passive HR oversight for auditing, dispute resolution, and system tracking.

---

## 🏗️ System Architecture

ReturnX is built on a distributed microservices architecture:

1. **React Frontend (SPA):** Single-page web app integrated client.
2. **API Gateway:** Single entry point handling routing and cross-origin security (CORS).
3. **Eureka Server:** Service discovery for microservices communication.
4. **Spring Cloud Config Server:** Centralized environmental configurations.
5. **Core Microservices:**
   - **Auth Service:** Registration, authentication, and JWT tokens.
   - **User Service:** User profiles and contact details.
   - **Item Service:** Categorization, search, and image handling via Cloudinary.
   - **Claim Service:** Claim workflow and automatic chat room setup.
   - **Reward Service:** Karma point calculations and leaderboard updates.
   - **Notification Service:** Asynchronous notifications and alerts.

---

## 🛠️ Tech Stack

### **Frontend**
- React, TypeScript
- Tailwind CSS, shadcn/ui
- Axios, Socket.IO Client

### **Backend**
- Java 17, Spring Boot 3.x
- Spring Security, JWT
- Spring Cloud (Eureka, Gateway, Config Server)
- OpenFeign

### **Databases & Storage**
- **PostgreSQL (Neon):** Primary relational database for transactional data (Users, Items, Claims, Rewards).
- **MongoDB (Atlas):** NoSQL persistence for unstructured, high-volume chat messages.
- **Cloudinary:** Cloud storage for uploaded item images.

---

## 🔄 System Workflow

1. **Report:** User submits a "Lost Item" or "Found Item" report with photos and location details.
2. **Search:** Claimants browse or search the centralized catalog.
3. **Claim:** Claimant finds their item and clicks "Claim Item."
4. **Chat & Verify:** System automatically creates a private Socket.IO chat room. Both parties talk to verify ownership and schedule a meetup.
5. **Handover:** Finder marks the item status as `RETURNED` after physical handover.
6. **Reward:** Finder receives Karma Points (+50) automatically, and the leaderboard updates.

---

## 🏆 Karma Points System

| Action | Points | Condition |
| :--- | :--- | :--- |
| **Report Found Item** | +10 Points | Successful report logged in the system |
| **Successful Return** | +50 Points | Handover confirmed by both parties |
| **First Return Milestone**| +100 Points | One-time bonus for the first success |

---
