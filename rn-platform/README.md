# Ariyoo RN Platform

This folder contains a full-stack mobile implementation of Ariyoo:
- Backend: Node.js (Express + Socket.IO) with TypeScript, Prisma ORM, Postgres
- Mobile: React Native (Expo, TypeScript) targeting Android and iOS

## Prerequisites
- Node.js 18+
- Docker + Docker Compose
- (Mobile) Expo CLI: `npm i -g expo`
- (iOS) Xcode + CocoaPods; (Android) Android Studio SDK

## Quick start

1) Start database:
```
cd server
cp .env.example .env
cd ..
docker compose up -d
```

2) Install dependencies and run backend migrations + seed:
```
cd server
npm ci
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```
Backend will run on http://localhost:3333

3) Mobile app:
```
cd ../mobile
npm ci
# create .env if needed; API base defaults to http://localhost:3333
npm run start
```
- Press `a` for Android emulator, `i` for iOS simulator, or use Expo Go on device.

## Structure
- server: Express REST API, Socket.IO for real-time chat, Prisma/Postgres
- mobile: Expo React Native app with React Navigation, react-native-paper UI

## Features
- Auth: register/login (JWT)
- Ask question with hashtag/tag parsing and matching to solvers
- Real-time chat sessions, image upload
- Profile with tags/places
- Public posts feed + detail

## Environment
- server/.env
```
PORT=3333
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ariyoo?schema=public
JWT_SECRET=dev_secret_change_me
UPLOAD_DIR=./uploads
```

- mobile/.env (optional)
```
API_BASE=http://localhost:3333
```

## Production
- Build backend Docker image and deploy with managed Postgres
- Use EAS for Android/iOS builds
- Configure .env for production API base

## Scripts
- server: `npm run dev`, `npm run build`, `npm run start`
- mobile: `npm run start`, `npm run android`, `npm run ios`