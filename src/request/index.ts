import type { UserInfo } from '@/types/user'
export const getUserInfo = async (id: string) => {
  return fetch('http://192.168.100.102:3000/api/user?id=' + id + '', {
    method: "GET",
    headers: {
      'Accept': 'application/json',
    },
    mode: 'cors',
  }).then(res => {
    console.log('res', res)
    if (res.ok) {
      return res.json()
    } else {
      return null
    }
  })
}

export const saveUserInfo = async (userInfo: UserInfo) => {
  return fetch('http://192.168.100.102:3000/api/user', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
    },
    mode: 'cors',
    body: new URLSearchParams(userInfo)
  }).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      return null
    }
  })
}
