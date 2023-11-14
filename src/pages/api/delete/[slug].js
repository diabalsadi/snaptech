import authMiddleware from '../authMiddleware'

import admin from 'firebase-admin'

import serviceAccount from 'src/service-account.json'

const deleteData = async (req, res) => {
  // Initialize Firebase Admin SDK
  const { id, slug } = req.query

  if (['category', 'product'].includes(slug)) {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      })
    }

    const db = admin.firestore()
    const collectionRef = db.collection(slug)

    const docRef = collectionRef.doc(id)

    docRef
      .delete()
      .then(() => {
        res.status(200).json({ message: 'Document successfully deleted' })
      })
      .catch(error => {
        res.status(500).json({ error })
      })
  }
}

// export default authMiddleware(deleteData)
export default deleteData
