import * as fse from 'fs-extra'
import * as chokidar from 'chokidar'
import * as path from 'path'
import { readConfig, getAppList, saveJson } from './utils'
// TODO: Make it not dependend on folder from where u run "npm run dev"
const rootDir = __dirname


export default function multiApp({ project, mode }: { project: string, mode: string }) {
  return {
    name: 'multi-app', // required, will show up in warnings and errors
    async buildStart() {
      // For app in apps buildApp
      if (!project) throw new Error('Required: project, use --project=<PROJECTNAME>')
      const projectDir = path.join(rootDir, 'clients', project)
      const config = await getConfig(projectDir)
      await buildApp({ project, mode })
      if (!config.apps) return
      const appList = await getAppList(projectDir, config.apps)
      await Promise.all(appList.map(app => buildApp({ project, app, mode })))
    },
  }
}

async function buildApp({ project, app, mode }: { project: string, app?: string, mode: string }) {
  console.log('building', project, app)
  const buildDir = path.join(rootDir, '.build', app || '')
  const projectDir = path.join(rootDir, 'clients', project)
  const config = await getConfig(projectDir, app)
  // TODO: Optional does not work in plugin even with target: es2019 :(
  let extendDirs = [path.join(rootDir, 'src')].concat(
    (config.extends || []).map(d => path.join(rootDir, d)) || []
  )
  if (app) {
    const appPath = app ? `${project}/apps/${app}` : `${project}/main`
    const appDir = path.join(rootDir, `./clients/${appPath}`)
    extendDirs = extendDirs.concat(appDir)
  }
  await fse.emptyDir(buildDir)
  await fse.mkdirp(buildDir)

  const copyFiles = async () => {
    // Do it sequentially else error
    for (const dir of extendDirs) {
      await fse.copy(dir, buildDir)
    }
  }
  const toTargetPath = (filePath: string, baseDir: string) => {
    return filePath
      .replace(baseDir, buildDir)
  }
  let init = false
  if (mode === 'development') {
    extendDirs.map((baseDir) => {
      console.log('watching ', baseDir)
      return chokidar.watch(baseDir).on('all', async (event, filePath) => {
        // Chokidar fires a 'add' event on init but we don't want to copy on init
        if (!init) { return }
        // console.log('event', filePath)
        if (event === 'add' || event === 'change') {
          await fse.copy(filePath, toTargetPath(filePath, baseDir))
        }
        if (event === 'unlink') {
          await fse.remove(toTargetPath(filePath, baseDir))
        }
      })
    })
  }
  await copyFiles()
  // TODO: do it automatically if /apps folder ?
  if (config.apps) {
    await _save_apps_content(projectDir, buildDir, config)
  }
  const cfg = { ...config, app }
  await saveJson(path.join(buildDir, 'config.json'), cfg)
  init = true
}

// Merge project config and app config file
async function getConfig(projectDir: string, app?: string): Promise<Config> {
  // Default to empty object if file does not exist
  if (app) return readConfig(path.join(projectDir, 'apps', app, 'config.yml'))
  return readConfig(path.join(projectDir, 'config.yml'))
}

async function _save_apps_content(projectDir: string, buildDir: string, config: Config) {
  const appsContent = await _create_apps_content(projectDir, config)
  // const json = JSON.stringify({
  //   body: appsContent
  // })
  return saveJson(path.join(buildDir, '_apps.json'), appsContent)
}
async function _create_apps_content(projectDir: string, { apps }: Config) {
  const appList = await getAppList(projectDir, apps!)
  return await Promise.all(appList.map(app => {
    // const appConfig = await readConfig(path.join(projectDir, 'apps', app, 'config.yml'))
    return { name: app }
  }))
}

