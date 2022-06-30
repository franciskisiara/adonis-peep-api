import { validator } from '@ioc:Adonis/Core/Validator'
import { accountGroup } from 'App/Validators/RegisterValidator'
import { maximumScale } from 'App/Validators/KnowlegeScaleValidator'

validator.rule('accountGroup', accountGroup.action, accountGroup.options)
validator.rule('maximumScale', maximumScale.action, maximumScale.options)
