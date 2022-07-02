import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
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
    
    response.abortIf(user.verified_at == null, i18n.formatMessage('errors.account.unverified'), 400)
    response.abortIf(user.accounts.length == 0, i18n.formatMessage('errors.account.unavailable', {
      account_group,
    }), 400)

    try {
      const { token } = await auth.use('api').attempt(email, password)
      return response.ok({
        token,
        user,
      })
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }
}