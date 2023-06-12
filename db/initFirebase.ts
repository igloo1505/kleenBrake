import * as admin from "firebase-admin";

export const rootStoragePath = process.env.FIREBASE_STORAGE_BUCKET;

export const initFirebase = () => {
    let app = admin.apps?.length >= 1 ? admin.apps[0] : undefined;
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            }),
            storageBucket: rootStoragePath,
        });
    }
    /// @ts-ignore
    let _storage =
        /// @ts-ignore
        admin.apps?.length >= 1 ? admin.storage(admin?.apps[0]) : undefined;
    return _storage;
};
