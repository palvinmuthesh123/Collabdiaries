import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

const privateKey = (
  String(process.env.FIREBASE_PRIVATE_KEY_PART1) +
  String(process.env.FIREBASE_PRIVATE_KEY_PART2) +
  String(process.env.FIREBASE_PRIVATE_KEY_PART3)
).replace(/\\n/g, '\n');

@Injectable()
export class FirebaseService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: String(process.env.FIREBASE_PROJECT_ID),
        clientEmail: String(process.env.FIREBASE_CLIENT_EMAIL),
        privateKey: privateKey,
      }),
    });
  }

  async verifyIdToken(idToken: string) {
    return await admin.auth().verifyIdToken(idToken);
  }
}
