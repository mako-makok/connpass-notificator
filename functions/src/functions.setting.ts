import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const REGION = 'asia-northeast1'
export const config = functions.config()

admin.initializeApp()
export const firestore = admin.firestore()
firestore.settings({
  timestampsInSnapshots: true
})