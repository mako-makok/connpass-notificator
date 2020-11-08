import { findById, insert, updateForConnpassParams } from "../../../repository/user";
import { OriginalParam } from "../../../types/connpass";
import { User } from "../../../types/user";

/**
 * ワードを追加する. ユーザーが存在しない場合は作成する.
 */
export const createOrAddWord = async (id: string, slackId: string, originalParam: OriginalParam) => {
  const user: User | null = await findById(id)

  if (user) {
    const currentParams = user.connpassParams
    user.connpassParams = [...currentParams.filter(c => c.keyword !== originalParam.keyword), originalParam]
    updateForConnpassParams(user).catch(err => {
      throw new Error(`Keyword update failed.\n\n${JSON.stringify(err)}`)
    })
    return
  }

  const newUser: User = {
    id,
    slackId,
    hasConnpass: true,
    connpassParams: [originalParam]
  }
  insert(newUser).catch(err => {
    throw new Error(`User insert failed.\n\n${JSON.stringify(err)}`)
  });
}