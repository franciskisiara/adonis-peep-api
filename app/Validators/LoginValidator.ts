import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Config from '@ioc:Adonis/Core/Config'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  private getAccountGroups () : [] {
    return Config.get('peep.settings.account_groups')
  }

  public schema = schema.create({
    email: schema.string({}, [
      rules.trim(),
      rules.email(),
      rules.exists({
        table: 'users',
        column: 'email',
      }),
    ]),
    password: schema.string(),
    account_group: schema.enum(this.getAccountGroups())
  })
}
