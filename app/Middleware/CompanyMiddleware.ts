import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Company from 'App/Models/Company'

export default class CompanyMiddleware {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const { auth, i18n, params, response } = ctx

    ctx.company = await Company.find(params.companyId)
    response.abortIf(!ctx.company, i18n.formatMessage('errors.unavailable', {
      resource: "company"
    }), 404)

    // const unitAssociation = await Database.from('account_group_users')
    //   .where('account_group_unit_uid', ctx.company.id)
    //   .andWhere('user_id', ctx.auth.user!.id)
    //   .first()

    // ctx.response.abortIf(unitAssociation == null, )

    // console.log(unitAssociation)

    await next()
  }
}
