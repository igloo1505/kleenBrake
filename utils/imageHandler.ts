import { initFirebase } from "db/initFirebase";
import multer from "multer";
import FirebaseStorage from 'multer-firebase-storage'
import { NextRequest, NextResponse } from "next/server";

const firebase = initFirebase()

export const acceptMimeTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webm",
];


export const imageMiddleware = multer({
    storage: FirebaseStorage({
        bucketName: process.env.FIREBASE_STORAGE_BUCKET,
        credentials: {
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        },
        public: true,
    }),
    fileFilter(req, file, callback) {
        return callback(null, acceptMimeTypes.indexOf(file.mimetype) >= 0);
    },
});

export interface multerFileType {
    destination: string;
    encoding: string;
    fieldname: string;
    filename: string;
    mimetype: string;
    originalname: string;
    publicUrl: string;
    path: string;
    size: number;
}

interface RequestWithFiles extends NextRequest {
    files: multerFileType[]
}


export const deleteImage = async (fileName: string) => {
    const bucket = firebase?.bucket()
    const file = bucket?.file(fileName)
    const deleted = await file?.delete({
        ignoreNotFound: true
    })
    return deleted
}


export const getImagesFromRequest = (req: RequestWithFiles): { url: string, path: string }[] => {
    let images = req?.files?.map((f: multerFileType) => {
        return { url: `${f.publicUrl}`, path: `${f.path}` };
    })
    return images
}


export const getImageSignedUrl = async (fileName: string) => {
    const bucket = firebase?.bucket()
    return await bucket?.file(fileName)?.getSignedUrl({
        action: "read",
        expires: Date.now() + 60 * 60
    })
}


export const getImageStream = async (fileName: string) => {
    const bucket = firebase?.bucket()
    const file = bucket?.file(fileName)
    return file?.createReadStream()
}
