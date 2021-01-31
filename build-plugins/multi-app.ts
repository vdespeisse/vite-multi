import * as fse from 'fs-extra'
import * as chokidar from 'chokidar'
import * as path from 'path'
import { readConfig } from './utils'
// Make it not dependend on folder from where u run "npm run dev"
const rootDir = __dirname

export default function multiApp({ project, app, dev }: { project: string, app?: string, dev: boolean }) {
  return {
    name: 'multi-app', // required, will show up in warnings and errors
    async buildStart() {
      const buildDir = path.join(rootDir, '.build', app || '')
      const projectDir = path.join(rootDir, 'clients', project)
      const config = await _get_config(projectDir, app)
      console.log('project', project, app, projectDir)
      console.log('test', config)
      // TODO: Optional does not work in plugin even with target: es2019 :(
      let extendDirs = [path.join(rootDir, 'src')].concat(
        (config.extends || []).map(d => path.join(rootDir, d)) || []
      )
      if (app) {
        const appPath = app ? `${project}/apps/${app}` : `${project}/main`
        const appDir = path.join(rootDir, `./clients/${appPath}`)
        extendDirs = extendDirs.concat(appDir)
      }
      console.log(extendDirs)
      await fse.emptyDir(path.join(rootDir, '.build'))
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
      console.log('MODE', dev)
      if (dev) {
        extendDirs.map((baseDir) => {
          return chokidar.watch(baseDir).on('all', async (event, filePath) => {
            // Chokidar fires a 'add' event on init but we don't want to copy on init
            if (!init) { return }
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
      init = true
    },
  }
}

// Merge project config and app config file
async function _get_config(projectDir: string, app: string | undefined): Promise<Config> {
  // Default to empty object if file does not exist
  const baseConfig = await readConfig(path.join(projectDir, 'config.yml'))
  if (!app) return baseConfig
  const appConfig = await readConfig(path.join(projectDir, 'apps', app, 'config.yml'))
  return { ...baseConfig, ...appConfig }
}

async function _save_apps_content(projectDir: string, buildDir: string, config: Config) {
  const appsContent = await _create_apps_content(projectDir, config)
  // const json = JSON.stringify({
  //   body: appsContent
  // })
  await fse.mkdirp(path.join(buildDir, 'public'))
  return await fse.writeFile(path.join(buildDir, 'public', '_apps.json'), JSON.stringify(appsContent), 'utf8')
}
async function _create_apps_content(projectDir: string, { apps }: Config) {
  const appList = await _get_app_list(projectDir, apps!)
  return await Promise.all(appList.map(app => {
    // const appConfig = await readConfig(path.join(projectDir, 'apps', app, 'config.yml'))
    return { name: app }
  }))
}

async function _get_app_list(projectDir: string, apps: boolean | Array<string>) {
  if (Array.isArray(apps)) return apps
  const appsDir = path.join(projectDir, 'apps')
  const files = await fse.readdir(appsDir)
  const isDir = (file: string) => fse.lstatSync(path.join(appsDir, file))
    .isDirectory()
  return files.filter(isDir)
}