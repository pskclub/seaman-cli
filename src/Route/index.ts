import Command from '@oclif/command/lib/command'
import { exec } from 'child_process'
import { CONFIG } from '../constants/config'

export default class Route {
  endpoint: string = ''

  constructor (private ctx: Command, private options: any) {
    if ('namespace' in this.options.flags) {
      switch (this.options.flags.namespace) {
        case 'stg':
          this.endpoint = CONFIG.STAGING.E_COM_API_ENDPOINT
          break
        case 'staging':
          this.endpoint = CONFIG.STAGING.E_COM_API_ENDPOINT
          break
        case 'nry':
          this.endpoint = CONFIG.NARAYA.E_COM_API_ENDPOINT
          break
        case 'naraya':
          this.endpoint = CONFIG.NARAYA.E_COM_API_ENDPOINT
          break
      }

      if (!this.endpoint) {
        this.ctx.log('Namespace is invalid')
      }
    } else {
      this.endpoint = CONFIG.STAGING.E_COM_API_ENDPOINT
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
