import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class KnowlegeScaleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    description: schema.string(),
    company_id: schema.number([
      rules.exists({
        table: 'companies',
        column: 'id',
      })
    ]),
  })
}
