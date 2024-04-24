import '@blocklet/sdk/lib/error-handler'

import Client from '@ocap/client'
import dotenv from 'dotenv-flow'

import { wallet } from '../libs/auth'
import env from '../libs/env'
import logger from '../libs/logger'
import { name } from '../../../package.json'

dotenv.config()

const ensureAccountDeclared = async () => {
  if (env.isComponent) return
  if (!env.chainHost) return

  const client = new Client(env.chainHost)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment, ts/ban-ts-comment
  // @ts-expect-error
  const { state } = await client.getAccountState({ address: wallet.toAddress() }, { ignoreFields: ['context'] })
  if (!state) {
    const hash = await client.declare({ moniker: name, wallet })
    logger.log(`app account declared on chain ${env.chainHost}`, hash)
  }
  else {
    logger.log(`app account already declared on chain ${env.chainHost}`)
  }
};

(async () => {
  try {
    await ensureAccountDeclared()
    process.exit(0)
  }
  catch (err) {
    logger.error(`${name} pre-start error`, err.message)
    process.exit(1)
  }
})()
