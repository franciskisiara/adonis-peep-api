import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StoreProfileValidator from 'App/Validators/StoreProfileValidator'
import Profile from 'App/Models/Profile'
import UpdateProfileValidator from 'App/Validators/UpdateProfileValidator'
import { DateTime } from 'luxon'

export default class ProfilesController {
  public async index({ params, request, response }: HttpContextContract) {
    const {
      page,
    } = request.qs()

    const profiles = await Profile.query()
      .where('company_id', params.companyId)
      .orderBy('id', 'desc')
      .paginate(page || 1, 25)

    return response.send(profiles)
  }

  public async store({ i18n, params, request, response }: HttpContextContract) {
    const payload = await request.validate(StoreProfileValidator)
    const profile = await Profile.create({
      ...payload,
      company_id: params.companyId,
    })

    return response.created({
      data: profile,
      message: i18n.formatMessage('resources.persisted', {
        resource: 'Profile'
      })
    })
  }

  public async update({ i18n, params, request, response }: HttpContextContract) {
    const payload = await request.validate(UpdateProfileValidator)

    const profile = await Profile.query()
      .where('company_id', params.companyId)
      .andWhere('id', params.id)
      .first()

    response.abortIf(!profile, i18n.formatMessage('errors.unavailable', {
      resource: 'profile'
    }))

    response.abortIf(profile?.deactivated_at, i18n.formatMessage('errors.unactionable', {
      action: 'edit',
      state: 'a deactivated',
      resource: 'profile',
    }))

    await profile?.merge(payload).save()

    return response.ok({
      data: profile,
      message: i18n.formatMessage('resources.persisted', {
        resource: 'Profile'
      })
    })
  }

  public async destroy({ i18n, params, response }: HttpContextContract) {
    const profile = await Profile.query()
      .where('company_id', params.companyId)
      .andWhere('id', params.id)
      .first()

    response.abortIf(!profile, i18n.formatMessage('errors.unavailable', {
      resource: 'profile'
    }))

    response.abortIf(profile?.deactivated_at, i18n.formatMessage('errors.unactionable', {
      action: 'deactivate',
      state: 'a deactivated',
      resource: 'profile',
    }))

    await profile?.merge({ deactivated_at: DateTime.now() }).save()

    return response.ok({
      message: i18n.formatMessage('resources.deactivated', {
        resource: 'Profile'
      })
    })
  }
}
