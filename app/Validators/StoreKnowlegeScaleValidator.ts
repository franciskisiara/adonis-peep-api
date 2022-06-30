import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import KnowlegeScale from 'App/Models/KnowlegeScale'

export const maximumScale = {
  action: async (_, [companyId], options) => {
    const MAXIMUM_ACTIVE_SCALES = 6

    const dets = await KnowlegeScale.query()
      .where('company_id', companyId)
      .where('is_active', true)
  
    if (dets.length >= MAXIMUM_ACTIVE_SCALES) {
      options.errorReporter.report(
        options.pointer,
        'maximumScale',
        'maximumScale validation failed',
        options.arrayExpressionPointer,
      )
    }
  },

  options: () => {
    return {
      async: true,
    }
  }
}

export default class StoreKnowlegeScaleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.maximumScale(
        this.ctx.company?.id
      ),
      rules.unique({
        table: 'knowlege_scales',
        column: 'name',
        where: {
          company_id: this.ctx.company?.id
        }
      })
    ]),
    description: schema.string(),
  })
}
