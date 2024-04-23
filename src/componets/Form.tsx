import React from "react"
import { useForm } from "react-hook-form"
import { Button, Input, DateInput } from '@nextui-org/react'
import { UserInfo } from "@/types/user"
import { saveUserInfo } from '@/request'
import toast from 'react-hot-toast'

interface Props {
  userInfo: UserInfo
  className?: string
  onSuccess?: () => void
  onCancel?: () => void
}


export default function UserInfoForm(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserInfo>({
    values: props.userInfo
  })
  const onSubmit = handleSubmit(async (data) => {
    if (isValid) {
      console.log('data', data)
      await saveUserInfo(data)
      props.onSuccess?.()
      toast.success('Update profile successfully')
    } else {
      toast.error('Update profile failed')
    }
  })


  React.useEffect(() => {
    register("name", {
      validate: (value) => value?.length > 0 || "Name is required.",
    })
    register("phone", {
      validate: (value) => {
        if (value) {
          const phoneNumberRe = /^1[3-9]\d{9}$/
          const valid = phoneNumberRe.test(value)
          return valid || "Invalid phone number"
        } else {
          return 'Phone number is required'
        }
      },
    })
    register('email', {
      validate: (value) => {
        if (value) {
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(String(value).toLowerCase()) || "Invalid email"
        } else {
          return 'Email is required'
        }
      },
    })
    register('birthday', {
      onChange: (value) => {
        console.log('value', value)
      }
    })
  }, [register])


  return (
    <form onSubmit={onSubmit} className={`flex flex-col gap-5 h-full ${props.className}`}>

      <div className="flex flex-1 flex-col gap-5">
        <Input
          classNames={{
            label: 'text-black/50 w-14',
            inputWrapper: 'min-w-56',
          }}
          label="Name"
          placeholder="Please input name"
          {...register("name", { required: true })}
          type='text'
          variant="bordered"
          labelPlacement="outside-left"
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
        />


        <Input
          classNames={{
            label: 'text-black/50 w-14',
            inputWrapper: 'min-w-56',
          }}
          label="Phone"
          placeholder="Please input phone"
          {...register("phone", { required: true })}
          isInvalid={!!errors.phone}
          errorMessage={errors.phone?.message}
          type='text'
          variant="bordered"
          labelPlacement="outside-left"
        />


        <Input
          classNames={{
            label: 'text-black/50 w-14',
            inputWrapper: 'min-w-56',
          }}
          label="Email"
          placeholder="Please input email"
          {...register("email", { required: true })}
          type='email'
          variant="bordered"
          labelPlacement="outside-left"
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
        />

        <DateInput
          classNames={{
            label: 'text-black/50 w-14',
            inputWrapper: 'min-w-56',
          }}
          // @ts-ignore
          value={props.userInfo.birthday}
          onChange={(value) => {
            console.log('value', value)
          }}
          variant="bordered"
          label="Birthday"
          labelPlacement="outside-left"
          isInvalid={!!errors.birthday}
          errorMessage={errors.birthday?.message}
        />
        <Input
          classNames={{
            label: 'text-black/50 w-14',
            inputWrapper: 'min-w-56',
          }}
          label="Bio"
          placeholder="Please input bio"
          {...register("bio")}
          type='text'
          variant="bordered"
          labelPlacement="outside-left"
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
        />
      </div>

      <div className="footer flex justify-between gap-4">
        <Button className="flex-1" onClick={props.onCancel}>Cancel</Button>
        <Button type="submit" color='success' className="flex-1">Save</Button>
      </div>
    </form>
  )
}
