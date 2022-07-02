import { DateTime } from 'luxon'

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Company from 'App/Models/Company'
import UserAccount from 'App/Models/UserAccount'

export default class extends BaseSeeder {
  private registerUser () {
    return User.firstOrCreate({
      email: 'franciskisiara@gmail.com'
    }, {
      name: 'Frank', 
      password: 'sudo', 
      verified_at: DateTime.now(),
    })
  }

  private async getAccounts (user) {
    const company = await Company.firstOrCreate({
      name: 'PEEP Recruitment Agency'
    })

    return [{
      account_group: 'architect',
    }, {
      account_group: 'business',
      account_unit_uid: company.id,
    }, {
      account_group: 'candidate',
    }].map(account => {
      return {
        user_id: user.id,
        is_active: true,
        ...account,
        ...(!account.account_unit_uid && {
          account_unit_uid: user.id
        })
      }
    })
  }

  public async run () {
    const user = await this.registerUser()
    const accounts = await this.getAccounts(user)

    for (let index = 0; index < accounts.length; index++) {
      const account = accounts[index]
      await UserAccount.updateOrCreate(account, account)
    }
  }
}
