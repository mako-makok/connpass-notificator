import { userRepository } from '../../repository/userRepository'
import { ConnpassEventSearchQuery } from '../../types/connpass'
import { User } from '../../types/user'

/**
 * ワードを追加する. ユーザーが存在しない場合は作成する.
 */
export const createOrAddWord = async (
  id: string,
  slackId: string,
  originalParam: ConnpassEventSearchQuery
) => {
  const user: User | null = await userRepository.findById(id)

  if (user) {
    const currentParams = user.connpassParams
    user.connpassParams = [
      ...currentParams.filter((c) => c.keyword !== originalParam.keyword),
      originalParam,
    ]
    userRepository.replaceForConnpassParams(user).catch((err) => {
      throw new Error(`Keyword update failed.\n\n${JSON.stringify(err)}`)
    })
    return
  }

  const newUser: User = {
    id,
    slackId,
    hasConnpass: true,
    connpassParams: [originalParam],
  }
  userRepository.add(newUser).catch((err) => {
    throw new Error(`User insert failed.\n\n${JSON.stringify(err)}`)
  })
}
