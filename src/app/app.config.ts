import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(
      {"projectId":"studyquest-4cbe3",
        "appId":"1:795943998202:web:182866437d005d6fc2ef43",
        "storageBucket":"studyquest-4cbe3.appspot.com",
        "apiKey":"AIzaSyCwBICqOBn1FteKtTosg7NtHP6kOV1FtBs",
        "authDomain":"studyquest-4cbe3.firebaseapp.com",
        "messagingSenderId":"795943998202"})),
    provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
