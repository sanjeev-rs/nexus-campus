\# NEXUS Frontend Development Rules



\## PROJECT SCOPE



This workspace contains the NEXUS Campus OS frontend.



ABSOLUTE RULE:



Only modify files inside:



D:\\NEXUS\\frontend



The backend is outside the allowed scope.



DO NOT:

\- modify backend files

\- create backend files

\- delete backend files

\- rewrite backend APIs

\- modify FastAPI code

\- modify database code

\- modify SQLAlchemy models

\- modify Alembic migrations

\- modify PostgreSQL/Supabase configuration

\- modify Docker backend configuration

\- modify backend environment variables

\- modify backend authentication implementation

\- change backend API contracts unless explicitly instructed by the user



The frontend must consume the existing backend APIs rather than changing the backend to accommodate frontend changes.



\---



\# PROJECT



Product:

NEXUS — AI-Powered Campus Intelligence System / Campus OS



Frontend:

React + Vite



The frontend is already connected to the backend.



Treat the existing backend API as an existing dependency.



\---



\# FRONTEND-ONLY WORK



You may modify:



\- React components

\- JSX

\- JavaScript

\- TypeScript if present

\- CSS

\- frontend assets

\- frontend routing

\- frontend state management

\- frontend API clients

\- frontend hooks

\- frontend UI

\- frontend authentication UI

\- frontend pages

\- frontend components

\- frontend configuration when necessary for the frontend



Only modify frontend configuration when it is clearly required for frontend operation.



\---



\# BACKEND PROTECTION



Before making changes:



1\. Identify the frontend root.

2\. Confirm that the current task can be completed using frontend files.

3\. Do not search for or modify backend implementation unless the user explicitly asks for backend work.



If a frontend task appears to require backend changes:



STOP.



Explain:

\- what frontend requirement cannot currently be fulfilled

\- which existing backend API capability appears to be missing

\- what API contract would be required



Do NOT implement backend changes automatically.



\---



\# NEXUS DESIGN SYSTEM



Maintain the existing NEXUS visual identity.



Design direction:



\- premium institutional technology platform

\- sophisticated

\- luxurious but restrained

\- clean

\- spacious

\- intelligent

\- modern

\- professional



Primary visual language:



\- light interface

\- deep navy typography

\- blue accent color

\- subtle borders

\- soft shadows

\- generous whitespace

\- strong hierarchy

\- elegant typography



Typography:



\- serif typography for major display headings where already established

\- clean sans-serif typography for interface and body content

\- maintain consistency across pages



Avoid:



\- generic SaaS dashboard appearance

\- excessive gradients

\- excessive glassmorphism

\- excessive rounded cards

\- excessive shadows

\- visual clutter

\- random colors

\- inconsistent typography

\- unnecessary animations

\- unnecessary redesigns



\---



\# ARCHITECTURE



Preserve the existing architecture.



Reuse existing:



\- CampusLayout

\- Sidebar

\- Topbar

\- ProtectedRoute

\- shared components

\- existing API utilities

\- existing authentication flow

\- existing routing structure



Do not rebuild the application from scratch.



Do not replace working architecture unnecessarily.



Prefer reusable components over duplicated UI.



\---



\# BACKEND INTEGRATION



The backend already exists.



When displaying backend data:



\- use the existing API endpoints

\- use the existing API client

\- preserve existing authentication

\- preserve JWT/session behavior

\- preserve request/response contracts



Do not invent new backend endpoints.



Do not change API contracts without explicit approval.



If an endpoint does not provide required data, report the limitation instead of modifying the backend.



\---



\# ROUTING



Before modifying routes:



\- inspect the existing App.jsx

\- inspect existing route structure

\- check for duplicate routes

\- check dynamic route conflicts

\- check imported component names

\- verify every route points to an existing component



After routing changes:



\- test every affected route

\- verify navigation

\- verify browser refresh behavior

\- verify protected routes



\---



\# UI CHANGES



Before changing an existing page:



1\. Understand the current design.

2\. Preserve useful existing functionality.

3\. Improve hierarchy and usability.

4\. Avoid unnecessary rewrites.



When adding a new page:



\- follow the existing NEXUS design language

\- reuse existing layout components

\- maintain responsive behavior

\- maintain typography consistency



\---



\# RESPONSIVENESS



Every modified page should work on:



\- desktop

\- laptop

\- tablet

\- mobile



Do not optimize only for one screen size.



\---



\# CODE QUALITY



Use:



\- clear component structure

\- meaningful names

\- reusable components

\- maintainable CSS

\- minimal duplication

\- appropriate error states

\- loading states where necessary

\- empty states where necessary



Avoid:



\- giant monolithic components

\- duplicated constants

\- hardcoded backend data when real API data exists

\- unnecessary dependencies

\- dead code



\---



\# SAFETY BEFORE CHANGES



Before modifying files:



Inspect the relevant existing implementation.



Do not blindly overwrite files.



After modifications:



1\. run the frontend

2\. check browser console

3\. check affected routes

4\. check API requests

5\. check responsive layout

6\. verify no existing functionality was broken



\---



\# GIT SAFETY



Do not:



\- force push

\- reset the repository

\- delete branches

\- rewrite Git history

\- remove existing commits



Do not commit or push changes unless explicitly instructed.



Before completing a task, report:



\- files modified

\- files created

\- files deleted

\- tests performed

\- any remaining issues

