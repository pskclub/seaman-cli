import Command from '@oclif/command/lib/command'
import { exec } from 'child_process'
import { CONFIG } from '../constants/config'

export default class Route {
  constructor (private ctx: Command, private options: any) {
    if (this.options.args.options) {
      this.runById()
    } else {
      this.run()
    }
  }

  private run (): void {
    exec(`curl -X GET "${CONFIG.STAGING.E_COM_API_ENDPOINT}/describe"`, (e, output, c) => {
      this.ctx.log(output)
    })
  }

  private runById (): void {
    exec(`curl -X GET "${CONFIG.STAGING.E_COM_API_ENDPOINT}/describe?id=${this.options.args.options}"`, (e, output, c) => {
      this.ctx.log(output)
    })
  }
}
