import { User } from '../types/user'
import { firestore } from '../functions.setting'

type FindByHasConnpass = () => Promise<User[] | null>
export const findByHasConnpass: FindByHasConnpass = async () => {
  const ref = firestore.collection('users')
  const users = await ref.where('hasConnpass', '==', true).get()
  if (!users) return null

  return users.docs.map(user => user.data() as User)
}

type FindById = (id: string) => Promise<User | null>
export const findById: FindById = async (id) => {
  const doc = await firestore.collection('users').doc(id).get()

  const user = doc.exists ? doc.data() as User : null
  if (user) user.id = id

  return user
}

export const insert = async (user: User) => {
  const docRef = firestore.collection('users').doc(user.id)
  docRef.set(user)
}

export const updateForConnpassParams = async (user: User) => {
  const docRef = firestore.collection('users').doc(user.id)
  const doc = await docRef.get()

  if (doc.exists) {
    await docRef.update({ connpassParams: user.connpassParams })
    return true
  }

  return false
}