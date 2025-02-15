# 📦 co-push

## 🚀 React Native Over-the-Air (OTA) Update Package

`co-push` is a lightweight React Native package for checking and downloading updates from a remote server without requiring an app store release. It downloads the latest JavaScript bundle and reloads the app seamlessly.

## 📌 Installation

```sh
npm install co-push
```
or
```sh
yarn add co-push
```

### Peer Dependencies

Make sure you have the following dependencies installed in your React Native project:

([`npm install react-native-fs`](https://github.com/itinance/react-native-fs))

## 🛠️ Setup

### **1️⃣ Import and Initialize**

```javascript
import CoPush from 'co-push';

CoPush.checkForUpdate('API_KEY','CURRENT_VERSION');
```

Replace `'API_KEY'` and `'CURRENT_VERSION'` with your update server URL.

---

## 🌐 Get Your API Key

To use `co-push`, you need an API key. You can obtain your `API_KEY` from [co-push.com](https://co-push.com/).

Visit **[co-push.com](https://co-push.com/)** to create an account and get your API key.

---

## ⚙️ Platform-Specific Configuration

### **2️⃣ Android Configuration**

#### **Modify `MainApplication.kt`**

In `android/app/src/main/kotlin/com/yourapp/MainApplication.kt`, update the `getJSBundleFile` method:

```kotlin
import java.io.File

 override fun getJSBundleFile(): String? {
    val bundlePath = "${applicationContext.filesDir.absolutePath}/index.bundle"
    return if (File(bundlePath).exists()) bundlePath else null
 }
```

This ensures that the app loads the new bundle file if available.

---

### **3️⃣ iOS Configuration**
### **React Native Version `>= 0.77`**

#### **Modify `AppDelegate.swift`**

In `ios/YourApp/AppDelegate.swift`, update the bundle loading logic:

```swift
#if DEBUG
    return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    let documentDirectory = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first
    let bundlePath = documentDirectory?.appendingPathComponent("index.bundle").path
    if let path = bundlePath, FileManager.default.fileExists(atPath: path) {
        return URL(fileURLWithPath: path)
    }
    return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
```

### **React Native Version `< 0.77`**

#### **Modify `AppDelegate.mm`**

In `ios/YourApp/AppDelegate.mm`, update the bundle loading logic:

```swift
#if DEBUG
   return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
   NSURL *documentDirectory = [[[NSFileManager defaultManager] URLsForDirectory:NSDocumentDirectory inDomains:NSUserDomainMask] firstObject];
  NSString *bundlePath = [[documentDirectory URLByAppendingPathComponent:@"index.bundle"] path];

  if ([[NSFileManager defaultManager] fileExistsAtPath:bundlePath]) {
      return [NSURL fileURLWithPath:bundlePath];
  }

  // If no updated bundle is found, use the main.jsbundle in assets
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
```

This ensures the app loads the downloaded bundle instead of the built-in one.

---

## 🎯 How It Works

1. 'checkForUpdate()' checks the update server for a new bundle.
2. If an update is available, the user will download it on app launch.
3. The downloaded bundle is stored in the app's document directory.
4. The app restarts to apply the update.



---

## 📝 Example Usage

```javascript
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import CoPush from 'co-push';

const App = () => {
    useEffect(() => {
      CoPush.checkForUpdate('API_KEY','CURRENT_VERSION');
    }, []);
    
    return (
        <View>
            <Text>Welcome to My App!</Text>
        </View>
    );
};

export default App;
```

---

## 📌 Notes

- **Ensure that your update server provides a valid bundle file.**
- **Make sure to sign your bundles correctly to prevent security issues.**
- **This package does not replace native updates (i.e., changes to native code still require an app store update).**

---

## 🌜 License

MIT License. Feel free to use and contribute!

---

## 🤝 Contributing

We welcome contributions! Please open an issue or submit a pull request on GitHub.

---

### 🚀 Enjoy seamless updates with `co-push`! 🚀

## Contributors ✨

<table>
  <tr>
    <td align="center"><a href="https://github.com/korayaggul"><img src="https://github.com/korayaggul.png" width="100px;" alt="Koray A."/><br /><sub><b>Koray A.</b></sub></a></td>
  <td align="center">
  <a href="https://github.com/akinnco">
    <img src="https://github.com/akinnco.png" width="100px;" alt="Akin A."/>
    <br />
    <sub><b>Akin A.</b></sub>
  </a>
</td>
  </tr>
</table>
