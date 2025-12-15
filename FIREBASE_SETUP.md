# Configurare Firebase pentru Lucrarea 7

## Pasul 1: Creează proiect Firebase

1. Mergi la [Firebase Console](https://console.firebase.google.com/)
2. Click pe **"Add project"** sau **"Creează un proiect"**
3. Introdu numele proiectului (ex: `fashion-shop`)
4. Urmează pașii de configurare

## Pasul 2: Activează Firestore Database

1. În Firebase Console, mergi la **Firestore Database**
2. Click pe **"Create database"**
3. Alege **"Start in test mode"** (pentru development)
4. Selectează regiunea (recomandat: `europe-west`)
5. Click **"Enable"**

## Pasul 3: Obține configurația Firebase

1. În Firebase Console, mergi la **Project Settings** (⚙️)
2. Scroll jos la **"Your apps"**
3. Click pe iconul **Web** (`</>`)
4. Introdu un nickname pentru app (ex: `fashion-shop-web`)
5. Nu bifa "Also set up Firebase Hosting"
6. Click **"Register app"**
7. Copiază configurația Firebase

## Pasul 4: Configurează aplicația Angular

1. Deschide `src/environments/environment.ts`
2. Înlocuiește valorile placeholder cu datele tale Firebase:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIza...',  // ← API Key din Firebase
    authDomain: 'your-project.firebaseapp.com',  // ← Auth Domain
    projectId: 'your-project-id',  // ← Project ID
    storageBucket: 'your-project.appspot.com',  // ← Storage Bucket
    messagingSenderId: '123456789',  // ← Messaging Sender ID
    appId: '1:123456789:web:abc123'  // ← App ID
  }
};
```

## Pasul 5: Inițializează datele în Firestore

1. Pornește aplicația Angular: `npm start`
2. Mergi la `http://localhost:4200/setup`
3. Click pe **"Inițializează Baza de Date"**
4. Așteaptă confirmarea

Alternativ, poți rula scriptul din consola browser-ului:
```javascript
// În consola browser-ului (F12)
import { initializeFirestoreData } from './firebase-init';
await initializeFirestoreData();
```

## Structura Bazei de Date

### Colecția `categories`

```
categories/{categoryId}
  - name: string (ex: "Bărbați")
  - description: string
  - createdAt: timestamp
  - updatedAt: timestamp
```

### Colecția `items`

```
items/{itemId}
  - title: string
  - categoryId: string (reference la categories/{id})
  - price: number
  - image: string (URL)
  - description: string
  - availableSizes: array[string]
  - stock: number
  - createdAt: timestamp
  - updatedAt: timestamp
```

## Reguli de Securitate Firestore (pentru producție)

În Firebase Console → Firestore → Rules, actualizează:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /categories/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /items/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

**Notă:** Pentru development, poți lăsa `allow read, write: if true;` dar **NU** pentru producție!

## Testare

După configurare, verifică:

1. ✅ Aplicația se conectează la Firebase
2. ✅ Datele se încarcă din Firestore (consolă: "✅ Date încărcate din Firestore")
3. ✅ Lista de produse se afișează
4. ✅ Poți adăuga/editare/șterge produse

## Troubleshooting

**Eroare: "Firebase: Error (auth/configuration-not-found)"**
- Verifică că ai completat corect `environment.ts`

**Eroare: "Missing or insufficient permissions"**
- Verifică regulile Firestore (Rules)
- Pentru development, poți seta `allow read, write: if true;`

**Nu se încarcă datele:**
- Verifică că Firestore este activat în Firebase Console
- Verifică că ai rulat setup-ul pentru a adăuga datele inițiale
- Verifică consola browser-ului pentru erori

