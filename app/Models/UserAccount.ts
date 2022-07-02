import { DateTime } from 'luxon'

import { 
  column, 
  BaseModel,
  belongsTo,
  BelongsTo,
} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class UserAccount extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public account_group: string

  @column()
  public user_id: number

  @column()
  public account_unit_uid: string

  @column({ serialize: (i) => Boolean(i) })
  public is_active: boolean

  @column.dateTime({ autoCreate: true, serializeAs: null, })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null, })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>
}
