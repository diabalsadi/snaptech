import admin from 'firebase-admin'

import serviceAccount from 'src/service-account.json'

const authMiddleware = handler => async (req, res) => {
  const { authorization = '' } = req.headers
  try {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          ...serviceAccount,
          privateKey: serviceAccount.private_key.replace(/\\n/gm, '\n')
        })
      })
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(authorization.acessToke)
      req.user = decodedToken
      return handler(req, res)
    } catch (error) {
      res.status(401).json({ Unauthorized: error })
    }
  } catch (error) {
    res.status(500).json({ '500 Internal Server Error': error })
  }
}

export default authMiddleware
