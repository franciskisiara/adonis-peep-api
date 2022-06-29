import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export const accountGroup = {
  action: async (value, _, options) => {
    const user = await User.query()
      .where('email', value)
      .withCount('accountGroups', (builder) => {
        builder.where('account_groups.name', 'company')
      })
      .first()
  
    if (user && user.$extras.accountGroups_count > 0) {
      options.errorReporter.report(
        options.pointer,
        'accountGroup',
        'accountGroup validation failed',
        options.arrayExpressionPointer,
      )
    }
  },

  options: () => {
    return {
      async: true,
      compiledOptions: {},
    }
  }
}

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    company_name: schema.string({}, [
      rules.unique({
        table: 'companies',
        column: 'name',
      })
    ]),

    name: schema.string(),

    email: schema.string({}, [
      rules.trim(),
      rules.email(),
      rules.accountGroup(),
    ]),

    password: schema.string({}, [
      rules.confirmed()
    ])
  })
}
