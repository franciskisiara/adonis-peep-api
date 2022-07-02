import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Company from 'App/Models/Company'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/LoginValidator'
export default class LoginController {
  public async login ({ auth, i18n, request, response }: HttpContextContract) {
    const { email, password, account_group } = await request.validate(LoginValidator)

    const user = await User.query()
      .where('email', email)
      .preload('accounts', (builder) => {
        builder
          .where('user_accounts.is_active', true)
          .where('user_accounts.account_group', account_group)
      })
      .firstOrFail()

    response.abortIf(!user.verified_at, i18n.formatMessage('errors.account.unverified'), 400)
    response.abortIf(!user.accounts.length, i18n.formatMessage('errors.account.unavailable', {
      account_group,
    }), 400)

    try {
      const { token } = await auth.use('api').attempt(email, password)
      const serializedUser = user.serialize()

      delete serializedUser.accounts
      return response.ok({
        data: {
          token,
          user: serializedUser,
          ...(account_group == 'business' && {
            company: await Company.find(
              user.accounts[0].account_unit_uid
            )
          })
        },
        message: i18n.formatMessage('core.authenticated')
      })
    } catch {
      return response.badRequest({
        message: i18n.formatMessage('errors.account.credentials')
      })
    }
  }
}