import { User } from '../types/user'
import { firestore } from '../functions.setting'

export const userRepository = {
  findByHasConnpass: async (): Promise<User[] | null> => {
    const ref = firestore.collection('users')
    const users = await ref.where('hasConnpass', '==', true).get()
    if (!users) return null

    return users.docs.map((user) => user.data() as User)
  },

  findById: async (id: string): Promise<User | null> => {
    const doc = await firestore.collection('users').doc(id).get()

    const user = doc.exists ? (doc.data() as User) : null
    if (user) user.id = id

    return user
  },

  add: async (user: User): Promise<void> => {
    const docRef = firestore.collection('users').doc(user.id)
    docRef.set(user)
  },

  replaceForConnpassParams: async (user: User): Promise<boolean> => {
    const docRef = firestore.collection('users').doc(user.id)
    const doc = await docRef.get()

    if (doc.exists) {
      await docRef.update({ connpassParams: user.connpassParams })
      return true
    }

    return false
  },
}
