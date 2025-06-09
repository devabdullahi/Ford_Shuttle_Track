# 🚌 Ford Shuttle Track app


This repository contains the **Ford Shuttle Application** built using **React Native**.  
The app is designed to support features such as shuttle tracking, scheduling, and real-time updates.  
.

## 🎨 Figma Design

You can view the UI design on Figma:  
🔗 [Figma Design Link](https://www.figma.com/community/file/1265695782433908622)

## 🎨 Figma Design

You can view the UI design on Figma:  
🔗 [Figma Design Link](https://www.figma.com/community/file/1265695782433908622)

## 🚀 Getting Started

# ⚙️ React Native Installation Guide

This project uses **React Native**. Follow the platform-specific setup instructions below to get started.

---

## 🪟 Windows Setup (for Android Development)

1. **Install Node.js**
   - Download and install from: [https://nodejs.org/](https://nodejs.org/)

2. **Install Java Development Kit (JDK)**
   - Download JDK 17 or higher: [https://www.oracle.com/java/technologies/javase-downloads.html](https://www.oracle.com/java/technologies/javase-downloads.html)

3. **Install Android Studio**
   - Download and install from: [https://developer.android.com/studio](https://developer.android.com/studio)
   - During setup, ensure the following are selected:
     - Android SDK
     - Android SDK Platform
     - Android Virtual Device (AVD)

4. **Set up Environment Variables**
   Add the following to your environment variables (usually in `System Properties > Environment Variables`):

   ```bash
   ANDROID_HOME = C:\Users\<YourUsername>\AppData\Local\Android\Sdk

5. ** Run this command after installing everything**
   ```
   npm install -g react-native-cli

To run the project locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run web || npm run (whatever phone platform you perfer)
```










# 🍎 React Native Setup Guide (macOS)

This project uses **React Native**, and this guide is tailored specifically for macOS users who want to build for both **iOS** and **Android** platforms.

---

## 📦 Prerequisites

Before starting, make sure you have:

- A Mac running macOS 12 or later
- Homebrew (macOS package manager)
- An Apple ID (required for Xcode)

---

## 🛠 Step-by-Step Setup

### 1. Install Homebrew

If you don’t already have it installed:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
```
2. Install Node.js (JavaScript runtime)
```bash
brew install node
```


3. Install Watchman (used by React Native to watch file changes)
```bash
brew install watchman
```
4. Install Xcode (for iOS Development)
Download and install Xcode from the Mac App Store

Open it once to finish setup

Then run:
```bash
sudo xcode-select --switch /Applications/Xcode.app
sudo xcodebuild -runFirstLaunch
```

5. Install Android Studio (for Android Development)
Download from: [https://developer.android.com/studio]

During installation, ensure these are selected:

Android SDK

Android SDK Platform

Android Virtual Device (AVD)


6. Optional: Add environment variables to your .zshrc or .bash_profile
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```
Then apply changes:
```bash
source ~/.zshrc   # or source ~/.bash_profile
```
6. Install React Native CLI
```bash
npm install -g react-native-cli
```

