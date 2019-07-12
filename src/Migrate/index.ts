import Command from '@oclif/command/lib/command'

export default class Migrate {
  constructor (private ctx: Command) {
    this.run()
  }

  private run (): void {
    this.ctx.log(`migrate`)
  }

}
