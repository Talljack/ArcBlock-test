import type { UserInfoType } from '@/types/user'

export const getUserInfo = async (id: string) => {
  return fetch('/api/user?id=' + id + '', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    mode: 'cors',
  }).then((res) => {
    console.log('res', res)
    if (res.ok)
      return res.json()
    else
      return null
  })
}

export const saveUserInfo = async (userInfo: UserInfoType) => {
  return fetch('/api/user', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    mode: 'cors',
    body: new URLSearchParams(userInfo as unknown as Record<string, string>),
  }).then((res) => {
    if (res.ok)
      return res.json()
    else
      return null
  })
}
