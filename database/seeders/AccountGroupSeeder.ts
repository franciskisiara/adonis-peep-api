import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import AccountGroup from 'App/Models/AccountGroup'

export default class extends BaseSeeder {
  public async run () {
    const accounts = [
      { name: 'superuser' },
      { name: 'company' },
      { name: 'candidate' },
    ]

    for (let i=0; i<accounts.length; i++) {
      const account = accounts[i]
      await AccountGroup.firstOrCreate({
        name: account.name
      }, account)
    }
  }
}
