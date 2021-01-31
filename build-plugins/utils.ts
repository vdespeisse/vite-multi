import * as yaml from 'js-yaml'
import * as fse from 'fs-extra'

export async function readConfig(filePath: string): Promise<Config> {
  const file = await fse.readFile(filePath).catch((e) => {
    if (e.code === 'ENOENT') { return null }
  })
  if (!file) { return {} }
  return yaml.load(file.toString()) as Config
}
