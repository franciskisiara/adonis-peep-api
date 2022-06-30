import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Technology from 'App/Models/Technology'
import Profile from './Profile'

export default class ProfilePoint extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public profile_id: number

  @column()
  public technology_id: number

  @column()
  public backend_points: number

  @column()
  public frontend_points: number

  @column()
  public mobile_points: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Profile, {
    foreignKey: 'profile_id'
  })
  public profile: BelongsTo<typeof Profile>

  @belongsTo(() => Technology, {
    foreignKey: 'technology_id'
  })
  public technology: BelongsTo<typeof Technology>
}
