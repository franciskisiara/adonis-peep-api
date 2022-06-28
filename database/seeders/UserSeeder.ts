import { DateTime } from 'luxon'

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import AccountGroup from 'App/Models/AccountGroup'

export default class extends BaseSeeder {
  public async run () {
    const account = await AccountGroup.findByOrFail('name', 'superuser')

    const users = [
      { 
        name: 'Frank', 
        email: 'franciskisiara@gmail.com', 
        password: 'sudo', 
        verified_at: DateTime.now(),
      },
    ]

    for (let i=0; i<users.length; i++) {
      const userSeed = users[i]
      const user = await User.firstOrCreate({
        email: userSeed.email
      }, userSeed)
      
      user.related('accountGroups').sync({
        [account.id]: {
          account_group_unit_uid: user.id
        }
      }, false)
    }
  }
}
