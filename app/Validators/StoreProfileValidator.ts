import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreProfileValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.unique({
        table: 'profiles',
        column: 'name',
        where: {
          company_id: this.ctx.company?.id,
          deactivated_at: null,
        }
      })
    ])
  })
}
