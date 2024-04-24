import type { UserInfoType } from '../types/user'

export const getUserInfo = async (id: string) => {
  return fetch('/api/user?id=' + id + '', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    mode: 'cors',
  }).then((res) => {
    if (res.ok)
      return res.json()
    else
      return null
  })
}

export const updateUserInfo = async (userInfo: UserInfoType) => {
  return fetch('/api/user', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json"
    },
    mode: 'cors',
    body: JSON.stringify(userInfo || {}),
  }).then((res) => {
    if (res.ok)
      return res.json()
    else
      return null
  })
}
