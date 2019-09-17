import { Command, flags } from '@oclif/command'
import Route from './Route'
import Migrate from './Migrate'

class Seaman extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    namespace: flags.string({ char: 'n', description: 'namespace of env' })
    // index: flags.string({ char: 'i' }),
    // flag with no value (-f, --force)
    // force: flags.boolean({ char: 'f' })
  }

  static args = [
    {
      name: 'context',
      required: true,
      options: ['get', 'migrate']
    },
    {
      name: 'get',
      required: false,
      description: 'resource',
      options: ['routes']
    },
    {
      name: 'options',
      required: false,
      description: 'options'
    }]

  async run () {
    const { args, flags } = this.parse(Seaman)

    // console.log(args)
    // console.log(flags)
    if (args.context === 'get' && args.get === 'routes') {
      const route = new Route(this, this.parse(Seaman))
    }

    if (args.context === 'migrate') {
      const migrate = new Migrate(this, this.parse(Seaman))
    }
  }
}

export = Seaman
