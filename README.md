# Event Management SPA

A modern, responsive Single Page Application (SPA) for event management with authentication, session persistence, CRUD operations, and English-only UI. Built with vanilla JavaScript and json-server for backend simulation.

## Features

- **Authentication:**
  - Admin and Visitor roles
  - Login and registration forms
  - Session persistence using Local Storage
- **Event Management:**
  - Admins can create, edit, and delete events
  - Visitors can view, register, and cancel event registrations
  - Event capacity is updated in real time
- **CRUD Operations:**
  - All data (users, events, registrations) managed via REST API (json-server)
- **SPA Navigation:**
  - Route protection and role-based access
  - Dynamic navigation without page reloads
- **Alerts:**
  - SweetAlert2 integrated for all actions (login, register, event CRUD, registration/cancellation)
  - All alerts and UI texts in English
- **Responsive UI:**
  - Neon/futuristic theme
  - Mobile-friendly forms and event cards

## Folder Structure

```
ultima/
├── db.json                # Mock database for json-server
├── index.html             # Main HTML file
├── package.json           # Project metadata and scripts
├── public/                # Static assets
│   └── vite.svg
├── src/                   # Source code
│   ├── api.js             # API functions (CRUD)
│   ├── auth.js            # Authentication/session logic
│   ├── Router.js          # SPA router
│   ├── style.css          # Neon theme styles
│   ├── swal.js            # SweetAlert2 wrapper
│   ├── main.js            # App entry point
│   └── views/             # SPA views
│       ├── Login.js
│       ├── Register.js
│       ├── Dashboard.js
│       ├── EventsCreate.js
│       ├── EventsEdit.js
│       ├── EventDetail.js
│       └── NotFound.js
```

## How to Run

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start json-server:**
   ```bash
   npx json-server --watch db.json --port 3000
   ```
3. **Start the SPA (e.g. with Vite or Live Server):**
   ```bash
   npm run dev
   # or use your preferred static server
   ```
4. **Open your browser:**
   - Go to `http://localhost:5173` (or the port shown by your dev server)

## Usage

- **Admin:**
  - Login with username `admin` and password `admin123`
  - Create, edit, and delete events
- **Visitor:**
  - Register a new account or use demo users
  - View events, register/cancel participation

## Customization

- All UI and alerts are in English
- To add new features, edit the corresponding files in `src/views/`
- To change theme, modify `src/style.css`

## Tech Stack

- Vanilla JavaScript
- json-server (REST API simulation)
- SweetAlert2 (alerts)
- CSS (neon theme)

## License
https://github.com/miguelcoderR/PRUEBAdesempe-oJS
MIT
