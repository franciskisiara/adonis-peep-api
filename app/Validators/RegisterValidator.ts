import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    company_name: schema.string({}, [
      rules.unique({
        table: 'companies',
        column: 'name',
      })
    ]),

    email: schema.string({}, [
      rules.trim(),
      rules.email(),
      rules.unique({
        table: 'users',
        column: 'email', 
      })
    ]),

    password: schema.string({}, [
      rules.confirmed()
    ])
  })
}
