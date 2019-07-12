import { Command, flags } from '@oclif/command'
import Migrate from './Migrate'

class Seaman extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: 'f' })
  }

  static args = [{ name: 'migrate' }]

  async run () {
    const { args, flags } = this.parse(Seaman)
    if (args.migrate) {
      const migrate = new Migrate(this, this.parse(Seaman))
    }
  }
}

export = Seaman
