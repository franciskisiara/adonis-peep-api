import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Technology from 'App/Models/Technology'
import Listing from 'App/Models/Listing'

export default class ProfilePoint extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public listing_id: number

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

  @belongsTo(() => Listing, {
    foreignKey: 'listing_id'
  })
  public listing: BelongsTo<typeof Listing>

  @belongsTo(() => Technology, {
    foreignKey: 'technology_id'
  })
  public technology: BelongsTo<typeof Technology>
}
