## Storm Chaser App

A React Native app for documenting and classifying storm events with photo, weather, location, and notes.  
This project was built as a portfolio/demo app to showcase mobile development skills, including API integration, local storage, and multi-screen navigation.

---

## Features

- 📸 Take and save storm photos with metadata
- 🌦️ Weather API integration (Open-Meteo)
- 📍 Automatic location capture
- 📝 Add notes and classify storm type
- 💾 Local data persistence (AsyncStorage)
- 📋 View and manage saved entries

---

## Tech Stack

- React Native (Expo)
- AsyncStorage
- Expo Location & Camera
- Open-Meteo API

---

## Screenshots

<p align="center">
  <img src="screenshots/weather-info.png" alt="Weather Info" width="140" style="margin-right: 18px;"/>
  <img src="screenshots/capture-storm.png" alt="Capture Storm" width="140" style="margin-right: 18px;"/>
  <img src="screenshots/storm-details.png" alt="Storm Details" width="140" style="margin-right: 18px;"/>
  <img src="screenshots/success-popup.png" alt="Success Popup" width="140" style="margin-right: 18px;"/>
  <img src="screenshots/saved-entries.png" alt="Saved Entries" width="140"/>
</p>

<p align="center">
  <b>Weather Info</b>&nbsp;&nbsp;&nbsp;&nbsp;
  <b>Capture Storm</b>&nbsp;&nbsp;&nbsp;&nbsp;
  <b>Storm Details</b>&nbsp;&nbsp;&nbsp;&nbsp;
  <b>Success Popup</b>&nbsp;&nbsp;&nbsp;&nbsp;
  <b>Saved Entries</b>
</p>

## Try Instantly

Scan the QR code below with [Expo Go](https://expo.dev/client) to try the app on your device:

![QR Code](screenshots/qr.png)

---

## Get Started

1. **Install dependencies**
    ```bash
    npm install
    ```
2. **Start the app**
    ```bash
    npx expo start
    ```

You’ll find options to open the app in:
- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction/).

---

## Get a Fresh Project

When you're ready, run:

```bash
npm run reset-project
