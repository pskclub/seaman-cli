import { exec } from 'child_process'

export class Process {
  static run = (cmd: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      exec(cmd, (_, stdout, stderr) => {
        console.log(stdout)
        resolve(stdout)
      })
    })
  }
}
