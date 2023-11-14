import { shuffled } from '@/utils/arrayManipulation'
import * as admin from 'firebase-admin'
import serviceAccount from 'src/service-account.json'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

const db = admin.firestore()

const get = async (req, res) => {
  const { slug, category, limit, id } = req.query

  try {
    const collectionRef = db.collection(slug)
    const snapshot = await collectionRef.get()

    const result = []

    if (snapshot.empty) {
      console.log('No documents found.')
      return res.json({ result: [] })
    }

    snapshot.forEach(doc => {
      if (doc.id === id) {
        res.status(200).json({ result: { id, ...doc.data() } })
      }
      if (category && slug === 'product') {
        if (doc.data().category === category) {
          result.push({ id: doc.id, ...doc.data() })
        }
      } else {
        result.push({ id: doc.id, ...doc.data() })
      }
    })

    if (limit) {
      return res.status(200).json({ result: shuffled(result).slice(0, limit) })
    }

    return res.status(200).json({ result })
  } catch (error) {
    console.error('Error getting documents', error)
    return res.status(500).json({ error: 'Error getting documents' })
  }
}

export default get
