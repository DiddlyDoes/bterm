import * as path from 'path';
import * as builder from 'electron-builder';
import * as fs from 'fs-extra';
import * as chalk from 'chalk';

let platform = builder.Platform;

export function makePackages(): Promise<null> {
  let start: Date = new Date();
  let pkgJson: any = fs.readJsonSync(path.resolve(__dirname, '../package.json'));
  return builder.build({
    targets: platform.MAC.createTarget(),
    config: {
      appId: pkgJson.name,
      directories: {
        buildResources: path.resolve(__dirname, '../dist'),
        app: path.resolve(__dirname, '../dist'),
        output: path.resolve(__dirname, '../build'),
      },
      compression: 'store',
      extraResources: Object.keys(pkgJson.dependencies).map(key => `node_modules/${key}`)
    }
  }).then(() => {
    let time = new Date().getTime() - start.getTime();
    console.log(`${chalk.green('✔')} Packaging successful in ${time}ms`);
  }).catch(err => console.error(err));
}
