# Project Overview

## 1. Project Name:
YourFriend (Inferred from `ng new YourFriend` in README.md and `"name": "your-friend"` in `package.json`)

## 2. Main Goal:
A social application designed to help users connect with friends. Based on the README, it aims to provide features like chat, friend requests, and potentially more social interactions. The presence of SignalR suggests real-time communication capabilities.

## 3. Technology Stack:
*   **Framework:** Angular (CLI version likely 16.2.10 or higher, based on `@angular/core": "^16.2.0"` in `package.json`)
*   **Key Libraries/Dependencies:**
    *   `@angular/material` (for UI components)
    *   `@microsoft/signalr` (for real-time communication, likely chat)
    *   `tailwindcss` (for utility-first CSS styling)
    *   `ngx-toastr` (for notifications)
    *   `rxjs` (Reactive Extensions Library for JavaScript)
*   **UI:** Angular Material, Tailwind CSS

## 4. Core Features:
Based on routing and README.md:
*   User Authentication (Login, Register, Forgot Password, Reset Password)
*   Home Page (Potentially a dashboard or feed)
*   Chat functionality (implied by SignalR and chat components/routes)
*   Friend Management (implied by the project's theme)
*   Profile Management (common in social apps, though not explicitly listed in routes)
*   Newsletter Subscription (mentioned in README.md)
*   Admin section (inferred from `admin` route)

## 5. Basic Architecture:
*   **Routing:**
    *   Navigation is handled by Angular's `RouterModule`.
    *   Public routes include `/login`, `/register`, `/forgot-password`, `/resetpassword`.
    *   Private/Protected routes (likely requiring authentication) include `/home`, `/chat`, `/admin`, and potentially others under `HomeModule`.
    *   The `AuthGuard` is used to protect routes, redirecting unauthenticated users to `/login`.
    *   Lazy loading is implemented for `HomeModule` (path `''`, loads `HomeModule`) and `AdminModule` (path `admin`, loads `AdminModule`).
*   **Session Management:**
    *   `AppComponent` checks for an existing token in local storage upon initialization (`this.token = localStorage.getItem('token')`).
    *   If a token exists, it sets the `isLoggedIn` status in `AuthService` to `true`. This is a basic approach to maintain session state across browser refreshes.
*   **Modularity:**
    *   The application uses feature modules. `HomeModule` is explicitly defined and lazy-loaded, suggesting a modular approach to organizing features related to the main user-facing part of the application after login.
    *   `AdminModule` is also lazy-loaded, indicating separation of administrative functionalities.
    *   Core services like `AuthService` and `ChatService` are likely provided at the root level or within specific modules.
    *   Shared components and pipes are organized under `src/app/shared`.
