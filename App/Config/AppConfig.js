// Simple React Native specific changes

import '../I18n/I18n'
import { environments } from '../Lib/AppConstants'

export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  env: environments.PROD
}
