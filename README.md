Below is a brief overview of the Flashcard App I built to demonstrate my full-stack skills with modern Angular 20+ and .NET Web API. You’re welcome to review it before our discussion.

🌟 Features
📌 Core Functionality
Create Flashcard Sets:
  Add sets with a title.

Manage Cards:
  Add, delete cards (front/back).
  Each set holds multiple flashcards.

Study Mode:
  Flip cards front/back interactively.
  Navigation between cards.
  Completion message after reviewing all.

🎨 UI/UX (Angular Material)
  Material components for toolbar, forms, cards, buttons.
  Responsive layout.
  Centralized content, sticky header with Home/Settings.
  Clean, minimal look designed for interviews.


🌐 Routing
  /flashcards: Home page listing sets.
  /flashcards/set/new: Create a set.
  /flashcards/set/:id: Manage cards in a set.
  /flashcards/set/:id/study: Interactive study view.


💾 Storage Options
LocalStorageFlashcardService:
  Default implementation using browser storage.

HttpFlashcardService:
  Swappable service using Angular’s HttpClient to connect with the backend.

⚙️ Tech Stack
🔧 Frontend
Angular 20.1 & Angular Material

🧪 Backend
    ASP.NET Core Web API
    In-memory DB for demo
    REST API for sets/cards
    Endpoints:
      GET /api/flashcards -> get all cards in all sets
      GET /api/flashcards/{id} -> get all cards in a specific set
      POST /api/flashcards -> add set
      PUT /api/flashcards/{id} -> update(add/remove cards) set
      DELETE /api/flashcards/{id} -> delete set
