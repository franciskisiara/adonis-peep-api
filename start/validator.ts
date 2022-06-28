import { validator } from '@ioc:Adonis/Core/Validator'
import { accountGroup } from 'App/Validators/RegisterValidator'

validator.rule('accountGroup', accountGroup.action, accountGroup.options)
