import { readConfig, getAppList } from './utils'
import * as path from 'path'
import { exec } from 'child_process'

const rootDir = __dirname

const project = process.env.PROJECT!

async function build() {
  const projectDir = path.join(rootDir, 'clients', project)
  const config = await readConfig(path.join(projectDir, 'config.yml'))
  const apps = await getAppList(projectDir, config.apps || true)
  const cmd = [`vuedx-typecheck . && PROJECT=${project} vite build`].concat(
    apps.map(app => {
      return `PROJECT=${} APP=${app} vite build`
    })
  ).join(' && ')
  console.log(cmd)
  exec(cmd)
}

build()