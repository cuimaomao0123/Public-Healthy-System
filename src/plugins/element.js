import Vue from 'vue'

import { Button,
  Form,
  FormItem,
  Input,
  Checkbox,
  Message
} from 'element-ui'

Vue.prototype.$message = Message
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Checkbox)