# Real-Time Expert Session Booking System

Monorepo with:

- `backend`: Node.js + Express + MongoDB APIs
- `frontend`: React (Vite) + Redux Toolkit RTK Query + shadcn-style UI components

## Backend Setup

1. Go to backend:
   - `cd /Users/iterator/Desktop/sbs/backend`
2. Install dependencies:
   - `npm install`
3. Configure env:
   - Copy `.env.example` to `.env`
   - Set `MONGODB_URI`
4. (Optional) Seed experts:
   - `npm run seed`
5. Run server:
   - `npm run dev`

Backend runs at `http://localhost:5500`.

### Troubleshooting MongoDB timeout

If you see `Operation "experts.find()" buffering timed out after 10000ms`:

- Verify `MONGODB_URI` points to a reachable database.
- For MongoDB Atlas, add your current IP in Network Access and ensure the DB user has read/write permissions.
- Prefer a URI with a DB name, for example: `mongodb+srv://<user>:<pass>@cluster.mongodb.net/expert-booking?retryWrites=true&w=majority`.
- Restart backend after updating `.env`.

## Frontend Setup

1. Go to frontend:
   - `cd /Users/iterator/Desktop/sbs/frontend`
2. Install dependencies:
   - `npm install`
3. Configure env:
   - Copy `.env.example` to `.env`
4. Run app:
   - `npm run dev`

Frontend runs at `http://localhost:5173` by default.

## Implemented APIs

- `GET /api/experts?page=&limit=&search=&category=`
- `GET /api/experts/:id`
- `POST /api/bookings`
- `PATCH /api/bookings/:id/status`
- `GET /api/bookings?email=`

## Key Requirements Covered

- Expert listing with search/filter/pagination/loading/error states
- Expert detail with slots grouped by date
- Real-time slot updates using frontend polling (5-second interval)
- Booking form validation and success/error feedback
- My bookings by email with status badges
- Double-booking prevention using a unique MongoDB index on `(expert, date, timeSlot)` plus conflict handling (`409`)
- Folder structure: `routes / controllers / models`
- Env-based configuration and centralized error handling
