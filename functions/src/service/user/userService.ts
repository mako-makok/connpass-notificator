import { userRepository } from '../../repository/userRepository'
import { User } from '../../types/user'

/**
 * Connpassへのリクエストに必要なparameterを所有しているユーザーを取得する.
 */
type GetUserByHasConnpass = () => Promise<User[] | null>
export const getUserByHasConnpass: GetUserByHasConnpass = () => {
  return userRepository.findByHasConnpass()
}
