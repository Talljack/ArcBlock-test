import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import { getUserInfo, saveUserInfo } from '@/request'
import type { UserInfoType } from '@/types/user'
import UserInfo from '@/componets/UserInfo'

/**
 *
 */
function Home() {
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfoType>({} as UserInfoType)
  const { user, isSignedIn } = useUser()
  const [requestLoading, setRequestLoading] = useState(false)

  useEffect(() => {
    // 假设已经登录成功， userId
    setRequestLoading(true)
    if (isSignedIn) {
      getUserInfo(user?.id).then((userInfo) => {
        if (userInfo.data) {
          setUserInfo(userInfo.data)
        }
        else {
          const userInfo: UserInfoType = {
            id: user.id,
            avatar: user.imageUrl,
            name: user.fullName ?? '',
            email: user.primaryEmailAddress?.emailAddress ?? '',
            phone: '',
            bio: '',
          }
          // 首次保存
          saveUserInfo(userInfo).then(() => {
            setUserInfo(userInfo)
          })
        }
        setRequestLoading(false)
      })
    }
    setTimeout(() => {
      setRequestLoading(false)
    }, 5000)
  }, [user, isSignedIn])

  useEffect(() => {
    // 假设已经登录成功， userId
    if (isSignedIn) {
      getUserInfo(user?.id).then((userInfo) => {
        if (userInfo.data)
          setUserInfo(userInfo.data)
        else
          toast.error('Failed to get user info')
      })
    }
  }, [isEditing])
  return (
    <>
      <div className="relative">
        <UserInfo userInfo={userInfo} className="grid max-w-2xl mx-auto" isEditing={isEditing} changeIsEditing={setIsEditing} requestLoading={requestLoading} />
      </div>
    </>
  )
}

export default Home
