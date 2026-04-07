# Hello Dose — Project Context for AI-Assisted Development

## Project Overview

**Project Name:** Hello Dose  
**Type:** Mobile Application (MVP)  
**Description:** A holistic health coaching app connecting patients with Nurse Practitioners (NPs) for medication-based weight management programs (e.g., Tirzepatide, Semaglutide).  
**Development Approach:** MVP built iteratively, screen by screen, guided by Figma designs provided as screenshots.

---

## Tech Stack & Integrations

### External Services

| Service | Role | Used For |
|---|---|---|
| **Cal.com** | Scheduling & Consultations | Appointments, availability, video consultations |
| **Vagaro** | Patient & Program Data | System of record for patient data and treatment programs |

### Cal.com — Handles
- Appointment scheduling
- Provider availability management
- Video consultation links

### Cal.com — Does NOT Handle
- Patient medical data
- Program logic
- Weight/injection tracking

### Vagaro — Handles
- Patient records
- Treatment program data
- Provider–patient mapping

### Vagaro — Does NOT Handle
- Scheduling (Cal.com owns this)
- Video consultations
- Real-time appointment UI

### Our Backend — Middleware Layer
- Connects mobile app with both Cal.com and Vagaro
- Stores app-specific data (weight logs, injection logs, etc.)
- Maps users across systems (`patient_id`, `provider_id`, `calcom_id`, etc.)
- Manages business logic and workflows

### Architecture Flow
```
Mobile App → Backend → Vagaro (patient + program data)
                     → Cal.com (appointments + video)
```

---

## Design System

### Colors
| Token | Hex | Usage |
|---|---|---|
| Background | `#F2F2F7` | App background |
| Primary | `#0D9488` | Teal — CTA buttons, active states, selections |
| Text / Dark | `#1E1E26` | Primary text, dark buttons |
| Surface Light | `#F0FDFA` | Cards, selected state backgrounds |

### Typography
- **Font Family:** Plus Jakarta Sans  
- **Location:** Downloaded and placed in `/assets/fonts/`
- **Weights used:** Regular, Medium, SemiBold, Bold

### Button States (Reusable Templates)

Based on Figma designs, the following button variants must be built as reusable components:

| Variant | Style Description |
|---|---|
| **Primary / Filled** | Dark (`#1E1E26`) background, white text, pill shape |
| **Secondary / Outlined Dark** | Transparent background, dark border and text |
| **Outlined Light** | Transparent background, light border and text |
| **Teal Outlined** | Transparent background, `#0D9488` teal border and text |
| **Disabled** | Light gray background, muted text, non-interactive |

> Example label used in Figma: `Log Injection`

### Selecting Button States (Reusable)

Used for injection site selection and similar single-choice UIs:

| State | Style |
|---|---|
| **Unselected** | White/light card, gray outline circle indicator, dark label |
| **Selected** | `#F0FDFA` tinted background, `#0D9488` teal border, filled teal circle indicator |

> Example label used in Figma: `R Abdomen`

### Medication Tags (Reusable)

Pill-shaped tags to indicate the patient's current medication:

| Medication | Color |
|---|---|
| **Tirzepatide** | Blue pill |
| **Semaglutide** | Green pill |

### Bottom Navigation Bar (Reusable)

3-tab navigation bar with the following tabs:

| Tab | Icon | Active Behavior |
|---|---|---|
| Chat | Chat bubble icon | Bold label + filled icon |
| Home | House icon | Bold label + filled icon |
| Profile | Person circle icon | Bold label + filled icon |

Active tab: bold label, filled icon variant.  
Inactive tabs: regular weight label, outlined icon variant, muted color.

---

## Sitemap

### Patient Side

```
Welcome
├── User Sign Up
└── User Login
    └── Patient Home
        ├── Patient / My Program
        │   ├── Patient / My Weight
        │   │   └── Patient / My Weight / Update Weight
        │   └── Patient / My NP
        ├── Patient / My Profile
        ├── Patient / Log Injection
        └── Patient / Chat
```

### NP (Nurse Practitioner) Side

```
Welcome
└── NP Login
    └── NP Home
        ├── NP / Patient Profile
        ├── NP / All My Patients
        ├── NP / My Profile
        └── NP / Chat
```

---

## Screen Inventory

### Completed / In Progress Screens

| Screen | Status |
|---|---|
| Welcome Screen | ✅ Designed in Figma |
| Patient Login | Referenced |
| NP Login | Referenced |
| (More screens to be added as screenshots are provided) | 🔄 In progress |

### Welcome Screen — Design Notes
- Full-bleed background image (warm skin tone, organic)
- App name: `hello dose.` — serif or elegant weight, white, top center
- Tagline: `Your Holistic Health Coach` — bold, white, bottom left area
- Two CTA buttons stacked:
  - `Login as a Patient` — white pill button
  - `Login as an NP` — dark (`#1E1E26`) pill button
- Footer text: `New to Hello Dose? Create an account`
- Bottom links: `Privacy Policy • Terms of Service`

---

## Feature List

### Patient Features

- **Account Access** — Secure login to personal dashboard
- **Dashboard Overview** — Active program summary, reminders
- **Program Information** — Medication details, progress indicators
- **Injection Logging** — Record medication injections
- **Weight Tracking** — Log weight, view historical trend charts
- **Provider Information** — View assigned NP details
- **Appointment Scheduling** — View availability and book via Cal.com
- **Consultation Access** — Launch video consultations in-app
- **Appointment Notifications** — Reminders for upcoming appointments
- **Reorder / Check-In Requests** — Request check-in consultation
- **Profile Management** — View and manage account info

### NP / Provider Features

- **Secure Provider Access** — Secure login for providers
- **Availability Management** — Configure availability (Cal.com)
- **Appointment Management** — View and manage upcoming appointments
- **Consultation Access** — Launch consultations in-app
- **Patient List** — View assigned patients
- **Patient Details** — View treatment programs and recent activity
- **Appointment Requests** — Request patient check-in
- **Calendar View** — View scheduled appointments
- **Profile Management** — View and manage profile

---

## Implementation Rules

1. **Keep integrations decoupled** — scheduling logic stays in Cal.com, patient data stays in Vagaro.
2. **Do not mix scheduling logic into Vagaro.**
3. **Do not store data locally** if it's already available from the source system.
4. **Always map users between systems** using: `patient_id`, `provider_id`, `calcom_id`.
5. Build all UI components as **reusable templates** — buttons, tags, nav bar, selection cards.
6. Use **Plus Jakarta Sans** exclusively for all typography.
7. Respect the **4-color palette** strictly; no off-brand colors.
8. When building screens, reference the **sitemap** to ensure correct navigation flow.
9. New screens are introduced **via Figma screenshots** — wait for screenshots before building.

---

## Notes for AI

- This project is built **MVP step by step**. Do not build ahead of what has been shown.
- Each new batch of screenshots represents the **next set of screens** to implement.
- Always match the Figma design as closely as possible in spacing, typography, and color.
- Reusable components (buttons, nav bar, tags, selection cards) should be built **once and referenced everywhere**.
- When in doubt about a component's behavior, refer to the design system section above.
