import { User } from '../types/user'
import { firestore } from '../functions.setting'

type FindByHasConnpass = () => Promise<User[] | null>
export const findByHasConnpass: FindByHasConnpass = async () => {
  const ref = firestore.collection('users')
  const users = await ref.where('hasConnpass', '==', true).get()
  if (!users) return null

  return users.docs.map(user => user.data() as User)
}