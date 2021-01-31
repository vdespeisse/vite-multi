// @ts-nocheck
// import { readConfig, getAppList } from './utils'
const path = require('path')
const yaml = require('js-yaml')
const fse = require('fs-extra')

const { exec } = require('child_process')

async function readConfig(filePath) {
  const file = await fse.readFile(filePath).catch((e) => {
    if (e.code === 'ENOENT') { return null }
  })
  if (!file) { return {} }
  return yaml.load(file.toString())
}

async function getAppList(projectDir, apps) {
  if (Array.isArray(apps)) return apps
  const appsDir = path.join(projectDir, 'apps')
  const files = await fse.readdir(appsDir)
  const isDir = (file) => fse.lstatSync(path.join(appsDir, file))
    .isDirectory()
  return files.filter(isDir)
}
// TODO: why doesnt it behave like multi-app.ts ?
const rootDir = path.join(__dirname, '..')

const project = process.env.PROJECT

async function build() {
  console.log('ok')
  const projectDir = path.join(rootDir, 'clients', project)
  console.log(projectDir)
  const config = await readConfig(path.join(projectDir, 'config.yml'))
  const apps = await getAppList(projectDir, config.apps || true)
  const cmd = [`vuedx-typecheck . && PROJECT=${project} vite build`].concat(
    apps.map(app => {
      return `PROJECT=${project} APP=${app} vite build`
    })
  ).join(' && ')
  console.log(cmd)
  exec(cmd)
}

build()