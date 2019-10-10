import Command from '@oclif/command/lib/command'
import { getBaseAPI } from '../constants/config'
import { Process } from '../utils/process'

export default class Route {
  endpoint: string = ''

  constructor (private ctx: Command, private options: any) {
    if ('namespace' in this.options.flags) {
      this.endpoint = getBaseAPI(this.options.flags.namespace)
    } else {
      this.endpoint = getBaseAPI('stg')
    }

    if (this.options.args.context === 'describe') {
      this.runById()
    } else {
      this.run()
    }
  }

  private run (): void {
    const types = ((this.options.flags.type || '').trim()).split(',')
    let type = ''
    types.forEach((item: string) => {
      item = item || ''
      if (type) {
        type = item.trim()
      } else {
        type = type + '.*' + item.trim()
      }
    })

    Process.run(`curl  "${this.endpoint}/api/describe" | grep -E  "${type}"`).then((apiRes) => {
      Process.run(`curl "${this.endpoint}/api/backend/describe" | grep -E  "${type}"`).
      then((backendRes) => {
        if (apiRes) {
          this.ctx.log('-------------------------- USER API --------------------------')
          this.ctx.log(apiRes)
        }

        if (backendRes) {
          this.ctx.log('-------------------------- ADMIN API --------------------------')
          this.ctx.log(backendRes)
        }
      })
    })
  }

  private runById (): void {
    Process.run(`curl -X GET "${this.endpoint}/api/describe?id=${this.options.args.options}"`).then((output) => {
      if (output) {
        this.ctx.log(output)
      } else {
        Process.run(`curl -X GET "${this.endpoint}/api/backend/describe?id=${this.options.args.options}"`).
        then((output) => {
          if (output) this.ctx.log(output)
        })
      }
    })
  }
}
