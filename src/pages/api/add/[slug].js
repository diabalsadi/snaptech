import authMiddleware from '../authMiddleware'
import admin from 'firebase-admin'
import serviceAccount from 'src/service-account.json'

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

const add = async (req, res) => {
  if (req.method === 'POST' && req.body) {
    const { body, query: { slug } } = req

    if (['category', 'product'].includes(slug)) {
      const db = admin.firestore()
      const collectionRef = db.collection(slug)

      const documentData = body

      if (documentData.id) {
        const docRef = collectionRef.doc(documentData.id)
        docRef
          .get()
          .then(doc => {
            if (doc.exists) {
              // Document with the provided ID exists, update it
              docRef
                .update(documentData)
                .then(() => {
                  res
                    .status(200)
                    .json({ result: 'Document Updated successfully' })
                })
                .catch(error => {
                  res.status(500).json({ error })
                })
            } else {
              // Document with the provided ID doesn't exist
              res
                .status(404)
                .json({ error: 'Document with the given ID not found' })
            }
          })
          .catch(error => {
            res
              .status(500)
              .json({ error: 'Error checking document: ' + error })
          })
      } else {
        // No ID provided, create a new document with a generated ID
        collectionRef
          .add(documentData)
          .then(() => {
            res.status(200).json({ result: 'Document created' })
          })
          .catch(error => {
            res.status(500).json({ error })
          })
      }
    } else {
      res.status(400).json({ error: 'Not a valid add' })
    }
  } else {
    res
      .status(400)
      .json({ error: 'Cannot handle this request: wrong request' })
  }
}

export default add

// export default authMiddleware(add)
