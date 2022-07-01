import { DateTime } from 'luxon'

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import AccountGroup from 'App/Models/AccountGroup'
import Company from 'App/Models/Company'

export default class extends BaseSeeder {
  public async run () {
    const accounts = await AccountGroup
      .query()
      .whereIn('name', [
        'superuser',
        'company',
      ])

    const user = await User.firstOrCreate({
      email: 'franciskisiara@gmail.com'
    }, {
      name: 'Frank', 
      password: 'sudo', 
      verified_at: DateTime.now(),
    })

    const company = await Company.firstOrCreate({
      name: 'PEEP'
    })

    const su = accounts.find(({ name }) => name == 'superuser')
    const co = accounts.find(({ name }) => name == 'company')

    user.related('accountGroups').sync({
      [su!.id]: {
        account_group_unit_uid: user.id
      },
      [co!.id]: {
        account_group_unit_uid: company.id
      },
    }, false)
  }
}
