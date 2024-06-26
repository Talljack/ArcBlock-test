import middleware from '@blocklet/sdk/lib/middlewares'
import { type Request, type Response, Router } from 'express'
import { getUserInfo, updateUserInfo } from '../controller/user'
import type { UserInfo } from '../type'

const router = Router()
router.get('/user', middleware.user(), async (req: Request, res: Response) => {
  const { id } = req.query as { id: string }
  if (!id) {
    return res.json({
      success: false,
      message: 'id is required',
    })
  }
  const userData = await getUserInfo(id)
  return res.json({
    success: true,
    data: userData,
  })
})

router.post('/user', middleware.user(), async (req: Request, res: Response) => {
  const userInfo = req.body as UserInfo
  const { id, name, phone, email, avatar, bio } = userInfo
  if (!id) {
    return res.json({
      success: false,
      message: 'id is required',
    })
  }
  await updateUserInfo({ id, name, phone, email, avatar, bio })
  return res.json({
    success: true,
  })
})

export default router
