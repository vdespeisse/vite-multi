import * as yaml from 'js-yaml'
import * as fse from 'fs-extra'
import * as path from 'path'

export async function readConfig(filePath: string): Promise<Config> {
  const file = await fse.readFile(filePath).catch((e) => {
    if (e.code === 'ENOENT') { return null }
  })
  if (!file) { return {} }
  return yaml.load(file.toString()) as Config
}

export async function getAppList(projectDir: string, apps: boolean | Array<string>) {
  if (Array.isArray(apps)) return apps
  const appsDir = path.join(projectDir, 'apps')
  const files = await fse.readdir(appsDir)
  const isDir = (file: string) => fse.lstatSync(path.join(appsDir, file))
    .isDirectory()
  return files.filter(isDir)
}
