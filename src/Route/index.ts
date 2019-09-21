import Command from '@oclif/command/lib/command'
import { exec } from 'child_process'
import { getBaseAPI } from '../constants/config'

export default class Route {
  endpoint: string = ''

  constructor (private ctx: Command, private options: any) {
    if ('namespace' in this.options.flags) {
      this.endpoint = getBaseAPI(this.options.flags.namespace)
    } else {
      this.endpoint = getBaseAPI('stg')
    }

    if (this.options.args.options) {
      this.runById()
    } else {
      this.run()
    }
  }

  private run (): void {
    exec(`curl -X GET "${this.endpoint}/describe"`, (e, output, c) => {
      this.ctx.log(output)
    })
  }

  private runById (): void {
    exec(`curl -X GET "${this.endpoint}/describe?id=${this.options.args.options}"`,
      (e, output, c) => {
        this.ctx.log(output)
      })
  }
}
