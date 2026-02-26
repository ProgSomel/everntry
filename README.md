# Eventry

A full-stack event management web app built with **Next.js 16** (App Router). Users can browse events, mark interest, confirm attendance via an email-based payment flow, and view event locations on an interactive map.

---

## Features

- Browse events on the home page
- Event detail pages with hero image, details, and map
- User authentication (register & login with hashed passwords)
- Interested toggle (saved to DB, reflected in real time)
- Going flow: payment form → confirmation email → one-click confirm
- Going status is permanent and cannot be reverted
- If going, Interested is auto-checked and both buttons are disabled
- Sonner toast notifications (top-center) for success and error states
- Google Event Schema (JSON-LD) on event cards and detail pages
- Dynamic metadata + Open Graph tags on all pages
- Interactive map via React Leaflet (SSR disabled)
- Auth state persisted via localStorage

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.1.6 (App Router) |
| UI | React 19, Tailwind CSS v4 |
| Database | MongoDB (Mongoose 9) |
| Auth | Custom (bcryptjs) + React Context |
| Email | Resend |
| Maps | React Leaflet + Leaflet |
| Toasts | Sonner |
| Font | Geist (next/font/google) |

---

## Project Structure

```
everntry/
├── app/
│   ├── layout.js                  # Root layout, DB connect, Toaster
│   ├── page.js                    # Home page (event listing)
│   ├── login/page.js
│   ├── register/page.js
│   ├── details/[id]/page.js       # Event detail page
│   ├── payment/page.js
│   ├── payment/[eventId]/page.js  # Payment form for specific event
│   ├── api/confirm-going/route.js # GET route — verifies token, updates going
│   ├── contexts/index.js          # AuthContext
│   ├── hooks/useAuth.js           # useAuth hook
│   └── providers/AuthProvider.js  # Wraps app, persists auth to localStorage
├── actions/
│   ├── auth.js                    # register, login server actions
│   ├── event.js                   # toggleInterested, toggleGoing
│   └── payment.js                 # submitPayment server action
├── components/
│   ├── Navbar.jsx
│   ├── ActionsButtons.jsx         # Interested + Going buttons
│   ├── GlobalToast.jsx            # Handles ?error=invalid-token toast
│   ├── auth/
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   └── SignInOut.jsx
│   ├── details/
│   │   ├── HeroSection.jsx
│   │   ├── EventDetails.jsx
│   │   ├── EventVenue.jsx
│   │   ├── EventMap.jsx           # dynamic import, ssr: false
│   │   └── ConfirmToast.jsx       # Handles ?confirmed=true toast
│   ├── landing/
│   │   ├── Header.jsx
│   │   ├── EventList.jsx
│   │   └── EventCard.jsx
│   ├── metaData/
│   │   └── EventSchemaScript.jsx  # JSON-LD schema.org/Event
│   └── payments/
│       └── paymentForm.jsx
├── db/
│   └── queries.js                 # All DB query functions
├── models/
│   ├── event-model.js
│   ├── user-model.js
│   └── token-model.js             # TTL 24h confirmation tokens
├── services/
│   ├── mongo.js                   # dbConnect singleton
│   └── email.js                   # sendConfirmationEmail via Resend
└── utils/
    └── data-util.js               # BLUR_DATA_URL constant
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/ProgSomel/everntry.git
cd everntry
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root:

```env
MONGO_URI=your_mongodb_connection_string
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string (MongoDB Atlas or local) |
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) |
| `NEXT_PUBLIC_BASE_URL` | Base URL used in confirmation email links and schema |

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Going Flow

1. User clicks **Going** on an event detail page
2. Redirected to `/payment/[eventId]` — fills in name and email
3. Server action validates and sends a confirmation email via Resend
4. Email contains a one-time confirmation link: `/api/confirm-going?token=...`
5. Clicking the link verifies the token, adds user to `going_ids`, and redirects back to the event page
6. A success toast is shown; the Going button is permanently disabled
7. Tokens auto-expire after 24 hours (MongoDB TTL index)

---

## Metadata

All pages have metadata configured. Dynamic pages use `generateMetadata`.

| Page | Title |
|---|---|
| `/` | `Home \| Eventry` |
| `/login` | `Sign In \| Eventry` |
| `/register` | `Register \| Eventry` |
| `/payment` | `Payment \| Eventry` |
| `/payment/[eventId]` | `Payment — Event Name \| Eventry` |
| `/details/[id]` | `Event Name \| Eventry` + OG image |

---

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```
