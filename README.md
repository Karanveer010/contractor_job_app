# Contractor Job App (Offline-First React Native Application)

## Overview

This mobile application is built using **React Native (Expo)** and follows an **offline-first architecture**.  
Users can create, edit, and view contractor jobs even when the device has no internet connection.

All data is stored locally using **SQLite**, and synchronization and redux and secure storage expo with the backend API happens automatically when the device reconnects to the internet.

---

# 1. App Architecture

The application follows a **layered architecture**:

**Screens**

Authentication Screens

These screens are responsible for user authentication before accessing the main application.

1.Welcome Screen

The first screen displayed when the app launches.

Provides an introduction to the application and allows the user to continue to authentication.

2.Create Account Screen

Allows new users to create an account by entering their details.

3.Login Screen

Existing users can log in using their credentials.

After successful authentication, users are redirected to the main application.

Main Application Screens

These screens are available after the user is authenticated.

1.Job List Screen

Displays all jobs created by the user.

Supports searching jobs.

Shows job status such as synced or pending.

Allows navigation to job details or job creation.

2.Job Detail Screen

Displays detailed information about a specific job.

Contains two tabs:

2(1).Job Overview Tab – Shows job information such as title, description, city, and budget.

2(2).Job Notes Tab – Allows users to add and manage notes related to the job.

3.Create Job Screen

Allows the user to create a new job by entering job details such as title, description, city, and budget.

Jobs can be created offline and will be synchronized automatically when the device reconnects to the internet.

4.Edit Job Screen

The same screen used for creating jobs is reused for editing existing jobs.

Existing job details are pre-filled in the form and can be updated by the user.

**Components**
Reusable UI components such as:

-Commonbutton use every where and change design accordingly
-commonInput use every where its a textinput
-commonView use every where inthis scroll, image ,backimage ,all features added
-Custom header mainly reasualble component in this app for most of screen
-date picker for pick and select date its a reuse every where
-mainly my jobcard component for show job cards
-network status is used for network in on of ui update and user update
-toast i make a custom toast message for api message ,validation message ,including color ,i make a apputils file in side all validation logic created and every where use
-overview is a jobdetail overview screen used use overcome the code
-noteTab is a jobdetail overview screen used use overcome the code

##Services Layer##

The Services layer contains the core business logic of the application. It is responsible for handling API communication, synchronization, and network-aware operations.

1. Auth Service

The Auth Service manages all authentication-related operations and secure communication with the backend.

Responsibilities include:

User login and logout

Token management

Secure API requests

Authentication-related API calls

Fetching authenticated user data

This service interacts with SecureStore to store and retrieve authentication tokens securely.

2. Job Update Service

The Job Update Service handles job updates and ensures that changes are properly stored in the local database and synced with the server.

Responsibilities include:

Updating job details

Saving updates to the local SQLite database

Managing job update states

Preparing job data for synchronization

This ensures that job updates are not lost even when the device is offline.

3. Network Service

The Network Service monitors the internet connection status using the NetInfo library.

Responsibilities include:

Detecting online and offline states

Triggering sync operations when the network becomes available

Managing API calls based on network status

Switching between offline database storage and online API responses

This allows the application to operate smoothly even when the network connection is unstable.

4. Sync Service

The Sync Service is responsible for synchronizing locally stored data with the backend server.

Responsibilities include:

Detecting pending jobs or notes stored during offline mode

Syncing pending records when the internet becomes available

Updating sync status after successful API calls

Ensuring data consistency between the local database and server

Sync Flow

If the internet is offline, job updates are stored in the local database with a pending status.

When the internet connection is restored, the Sync Service:

Fetches pending jobs

Sends them to the server

Updates the local sync status to synced.

This ensures a reliable offline-first data synchronization strategy.

**Local Database**
SQLite is used for storing jobs and notes locally.

make a database file in side create a table querys and alter tables new coloum addeds

**Local Database**
SQLite is used for storing jobs and notes locally.

# 2. Local Storage Strategy

The application uses **SQLite** for persistent local storage.

**API Layer**
Axios is used to communicate with the backend REST API.

# 4. Offline Handling

The application supports full offline functionality.

1. show my created jobs and joblist if internet is not on
2. edit my job
3. detail my job

i handel offline functionality of only job crud operation bcz api response still not valid keys bcz im not designing

Network detected
↓
syncService triggered
↓
Pending data synchronized

in offline whenever data im created its a sync status provided by me pending, failed , syncd ,
when internet is not sync service is run on a joblist screen ,if you are create job screen its automaticaly trigger and when app restart then also triger in this handling offline edit job after net on then trigger sync job update service.

in notes i will make only online behaviour
like api call note add and note update its not make to offline
sorry to say my system problem occur its i3 2005 model

in this i add

search feature for use search the job
logout feature logot the app

in this i make a diff flow bcz
when am crete a account its not revice in res a token so thats why im solve this problem to redirect the login screen to save and get token and use all apis

i make a apiclient use axois api calling
in side make interscpector for all api recive token
in side make 401 handeling if token expire to redirect the login screen and remove tye persist data

Note : in this db i use the userid so overcome the mostly other user job getting problem bcz you are new user go to the joblist screeen but they are already getting job but you can not create so im handel this all senario

for run this app
you need to install this packges

first expo verison use 54
and node is 20.19.0

npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install react-native-screens
npm install react-native-safe-area-context
npm install react-native-gesture-handler
npm install react-native-reanimated

Redux Toolkit is used for managing global application state.
npm install @reduxjs/toolkit
npm install react-redux

Networking
Axios is used for handling API requests.
npm install axios

Offline & Local Storage
SQLite is used for storing data locally for offline functionality.
npx expo install expo-sqlite

Network Detection

Used to detect online and offline status.
npm install @react-native-community/netinfo

Secure Storage
Used to securely store authentication tokens.
npx expo install expo-secure-store

UUID Generation
Used to generate unique IDs for offline job creation.
npm install react-native-uuid

Used for displaying icons in the UI.
npx expo install @expo/vector-icons

Project Structure
src
│
├── api
│   └── axiosClient.ts              # Axios configuration and API interceptors
│
├── assets
│   └── images
│       ├── Button.png
│       ├── cjm.png
│       ├── hide.png
│       └── show.png
│
├── components
│   ├── CommonButton.tsx
│   ├── CommonInput.tsx
│   ├── CommonView.tsx
│   ├── CustomHeader.tsx
│   ├── DatePicker.tsx
│   ├── JobCard.tsx
│   ├── NetworkStatus.tsx
│   ├── NoteTab.tsx
│   ├── OverviewTab.tsx
│   ├── SolidText.tsx
│   └── Toast.tsx
│
├── database
│   └── database.ts
│
├── redux
│   ├── store.ts                    # Redux store configuration
│   ├── userSlice.ts                # User authentication state
│   └── jobSlice.ts                 # Jobs state management
│
├── navigation
│   ├── AuthStack.tsx               # Authentication navigation stack
│   ├── MainStack.tsx               # Main app navigation stack
│   └── NavigationService.ts        # Navigation outside components
│
├── screens
│   │
│   ├── authScreen
│   │   ├── CreateAccount.tsx
│   │   ├── Login.tsx
│   │   └── Welcome.tsx
│   │
│   ├── JobsListScreen.tsx
│   ├── CreateJobScreen.tsx
│   ├── EditJobScreen.tsx
│   └── JobDetailScreen.tsx
│
├── services
│   ├── authServices.ts
│   ├── jobSync.tsx
│   ├── jobUpdate.ts
│   ├── networkService.ts
│   └── syncService.ts
│
├── utils
│   └── appUtils.tsx
│
└── App.tsx                         # Root component
