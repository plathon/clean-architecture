import '@shared/env'
import { Client } from 'pg'
import { migrate } from 'postgres-migrations'
import { resolve } from 'path'
;(async function () {
  const client = new Client()
  await client.connect()
  try {
    await migrate({ client }, resolve(__dirname, '../migrations'))
  } finally {
    await client.end()
  }
})()
