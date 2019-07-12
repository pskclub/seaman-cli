import Command from '@oclif/command/lib/command'
import * as fs from 'fs'
import { template } from './template'

export default class Migrate {
  constructor (private ctx: Command, private options: any) {
    this.run()
  }

  private run (): void {
    const time = (+new Date()).toString()
    fs.writeFile(`./migrations/${time}_${this.options.flags.name}.go`,
      template(this.options.flags.name, this.options.flags.index, time),
      function (err) {
        if (err) {
          return console.log(err)
        }

        console.log('The file was saved!')
      })
    this.ctx.log(`migrate ${this.options.flags.name}`)
  }
}
