import React, { useEffect, useState } from 'react'
import { getUserInfo, saveUserInfo } from '@/request'
import type { UserInfo as UserInfoType } from '@/types/user'
import UserInfo from '@/componets/UserInfo'
import { useUser } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

/**
 *
 */
function Home() {
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfoType>({} as UserInfoType)
  const { user, isSignedIn } = useUser()

  useEffect(() => {
    // 假设已经登录成功， userId
    if (isSignedIn) {
      getUserInfo(user?.id).then(userInfo => {
        if (userInfo.data) {
          setUserInfo(userInfo.data)
        } else {
          saveUserInfo({
            id: user.id,
            avatar: user.imageUrl,
            name: user.fullName ?? '',
            email: user.primaryEmailAddress?.emailAddress ?? '',
            phone: '',
            birthday: null,
            bio: ''
          })
        }
      })
    }
  }, [user])

  useEffect(() => {
    // 假设已经登录成功， userId
    if (isSignedIn) {
      getUserInfo(user?.id).then(userInfo => {
        if (userInfo.data) {
          setUserInfo(userInfo.data)
        } else {
          toast.error('Failed to get user info')
        }
      })
    }
  }, [isEditing])
  return (
    <>
      <div className='relative'>
        <UserInfo userInfo={userInfo} className='mx-auto grid max-w-2xl' isEditing={isEditing} changeIsEditing={setIsEditing} />
      </div>
    </>
  )
}

export default Home
