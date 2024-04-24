import { useCallback } from 'react'
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Spinner } from '@nextui-org/react'
import { useUser } from '@clerk/clerk-react'
import type { UserInfoType } from '../types/user'
import UserInfoForm from './UserInfoForm'

interface Props {
  userInfo: UserInfoType
  className?: string
  isEditing: boolean
  changeIsEditing: (value: boolean) => void
  requestLoading: boolean
}

interface UserInfoItemProps {
  label: string
  value: string
}

const UserInfoItem = (props: UserInfoItemProps) => {
  const { label, value } = props
  return (
    <div className="flex justify-between gap-4">
      <div className="flex justify-between w-full value">
        <label className="w-16 text-black/50">{label}</label>
        <span className="flex flex-1 min-w-56">{value}</span>
      </div>
    </div>
  )
}

/**
 *
 * @param props
 */
export default function UserInfo(props: Props) {
  const { userInfo, className = '', isEditing, changeIsEditing, requestLoading } = props
  const { isSignedIn } = useUser()
  const quitEdit = useCallback(() => {
    changeIsEditing(false)
  }, [changeIsEditing])
  return (
    <div className={`m-16 h-[calc(100vh-8rem)] ${className}`}>
      {
        requestLoading
          ? <Spinner />
          : isSignedIn
            ? (
              <Card className="flex flex-col items-center py-4">
                <CardHeader className="flex justify-center">
                  <Avatar src={userInfo.avatar} className="w-20 h-20 text-large" />
                </CardHeader>
                <CardBody className="items-center py-4 overflow-visible">
                  <div className={`wrapper flex flex-col gap-5 ${isEditing ? 'hidden' : 'flex'}`}>
                    {
                    Object.keys(userInfo).filter(key => !['avatar', 'id'].includes(key)).map(key => (
                      <UserInfoItem key={key} label={key} value={userInfo[key as keyof UserInfoType]} />
                    ))
                  }
                  </div>

                  <UserInfoForm userInfo={userInfo} onSuccess={quitEdit} onCancel={quitEdit} className={`${isEditing ? 'flex' : 'hidden'}`} />
                </CardBody>
                <CardFooter className="flex justify-center">
                  <Button color="default" onClick={() => changeIsEditing(!isEditing)} className={`${isEditing ? 'hidden' : 'block'}`}>Edit profile</Button>
                </CardFooter>
              </Card>
              )
            : <div className="flex justify-center my-auto text-3xl">Please SignIn</div>
      }
    </div>
  )
}
