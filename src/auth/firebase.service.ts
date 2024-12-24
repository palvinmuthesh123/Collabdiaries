import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: (
          process.env.FIREBASE_PRIVATE_KEY_PART1 +
          process.env.FIREBASE_PRIVATE_KEY_PART2 +
          process.env.FIREBASE_PRIVATE_KEY_PART3
        ).replace(/\\n/g, '\n'),
      }),
    });
  }

  async verifyIdToken(idToken: string) {
    return await admin.auth().verifyIdToken(idToken);
  }
}
