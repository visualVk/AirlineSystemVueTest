import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import MessageBox from 'element-plus/lib/el-message-box'
// import Message from 'element-plus/lib/el-message'
import installElementPlus from '../src/plugins/element'
import '@/static/airline-theme.css'

const app = createApp(App)
installElementPlus(app)
// app.config.globalProperties.$msgbox = MessageBox
// app.config.globalProperties.$alert = MessageBox.alert
// app.config.globalProperties.$confirm = MessageBox.confirm;
// app.config.globalProperties.$prompt = MessageBox.prompt;
app.use(router).mount('#app')