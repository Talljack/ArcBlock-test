import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input } from '@nextui-org/react'
import toast from 'react-hot-toast'
import type { UserInfoType } from '../types/user'
import { saveUserInfo } from '../request'

interface Props {
  userInfo: UserInfoType
  className?: string
  onSuccess?: () => void
  onCancel?: () => void
}

/**
 *
 * @param props
 */
export default function UserInfoForm(props: Props) {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserInfoType>({
    values: props.userInfo,
  })
  const onSubmit = handleSubmit(async (data) => {
    if (isValid) {
      setLoading(true)
      await saveUserInfo(data)
      props.onSuccess?.()
      setLoading(false)
      toast.success('Update profile successfully')
    }
    else {
      toast.error('Update profile failed')
    }
  })

  React.useEffect(() => {
    register('name', {
      validate: value => value?.length > 0 || 'Name is required.',
    })
    register('phone', {
      validate: (value) => {
        if (value) {
          const phoneNumberRe = /^1[3-9]\d{9}$/
          const valid = phoneNumberRe.test(value)
          return valid || 'Invalid phone number'
        }
        else {
          return 'Phone number is required'
        }
      },
    })
    register('email', {
      validate: (value) => {
        if (value) {
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return re.test(String(value).toLowerCase()) || 'Invalid email'
        }
        else {
          return 'Email is required'
        }
      },
    })
  }, [register])

  return (
    <form onSubmit={onSubmit} className={`flex flex-col gap-5 h-full ${props.className}`}>

      <div className="flex flex-col flex-1 gap-5">
        <Input
          classNames={{
            label: 'text-black/50 w-14',
            inputWrapper: 'min-w-56',
          }}
          label="Name"
          placeholder="Please input name"
          {...register('name', { required: true })}
          type="text"
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
          {...register('phone', { required: true })}
          isInvalid={!!errors.phone}
          errorMessage={errors.phone?.message}
          type="text"
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
          {...register('email', { required: true })}
          type="email"
          variant="bordered"
          labelPlacement="outside-left"
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
        />
        <Input
          classNames={{
            label: 'text-black/50 w-14',
            inputWrapper: 'min-w-56',
          }}
          label="Bio"
          placeholder="Please input bio"
          {...register('bio')}
          type="text"
          variant="bordered"
          labelPlacement="outside-left"
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
        />
      </div>

      <div className="flex justify-between gap-4 footer">
        <Button className="flex-1" onClick={props.onCancel}>Cancel</Button>
        <Button type="submit" color="success" className="flex-1" isLoading={loading}>Save</Button>
      </div>
    </form>
  )
}
