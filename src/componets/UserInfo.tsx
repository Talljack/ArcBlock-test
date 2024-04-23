import React, { useCallback } from "react";
import { Card, CardHeader, CardBody, CardFooter, Avatar, Input, Button } from "@nextui-org/react";
import type { UserInfo } from "../types/user";
import UserInfoForm from "./Form";
import { useUser } from '@clerk/clerk-react'

interface Props {
  userInfo: UserInfo
  className?: string
  isEditing: boolean
  changeIsEditing: (value: boolean) => void
}

interface UserInfoItemProps {
  label: string
  value: string
}

const UserInfoItem = (props: UserInfoItemProps) => {
  const { label, value } = props
  return (
    <div className="flex gap-4 justify-between">
      <div className="value w-full flex justify-between">
        <label className="text-black/50 w-14">{label}</label>
        <span className="flex flex-1 min-w-56">{value}</span>
      </div>
    </div>
  )
}

export default function UserInfo(props: Props) {
  const { userInfo, className = '', isEditing, changeIsEditing } = props
  const { isSignedIn } = useUser()
  const quitEdit = useCallback(() => {
    changeIsEditing(false)
  }, [changeIsEditing])
  return (
    <div className={`m-16 h-[calc(100vh-10rem)] ${className}`}>
      {
        isSignedIn ? <Card className="py-4 flex items-center flex-col">
          <CardHeader className="flex justify-center">
            <Avatar src={userInfo.avatar} className="w-20 h-20 text-large" />
          </CardHeader>
          <CardBody className="overflow-visible py-4 items-center">
            <div className={`wrapper flex flex-col gap-5 ${isEditing ? 'hidden' : 'flex'}`}>
              <UserInfoItem label="Name" value={userInfo.name} />
              <UserInfoItem label="Phone" value={userInfo.phone} />
              <UserInfoItem label="Email" value={userInfo.email} />
            </div>

            <UserInfoForm userInfo={userInfo} onSuccess={quitEdit} onCancel={quitEdit} className={`${isEditing ? 'flex' : 'hidden'}`} />
          </CardBody>
          <CardFooter className="flex justify-center">
            <Button color='default' onClick={() => changeIsEditing(!isEditing)} className={`${isEditing ? 'hidden' : 'block'}`}>Edit profile</Button>
          </CardFooter>
        </Card>
          : <div className="flex justify-center my-auto text-3xl">Please SignIn</div>
      }
    </div>
  )
}
