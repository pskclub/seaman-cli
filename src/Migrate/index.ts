import Command from '@oclif/command/lib/command'
import * as fs from 'fs'

export default class Migrate {
  constructor (private ctx: Command, private options: any) {
    this.run()
  }

  private run (): void {
    fs.writeFile(`./migrations/${+new Date()}_${this.options.flags.name}.go`, 'Hey there!', function (err) {
      if (err) {
        return console.log(err)
      }

      console.log('The file was saved!')
    })
    this.ctx.log(`migrate ${this.options.flags.name}`)
  }
}
