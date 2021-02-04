import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import installElementPlus from '../src/plugins/element'
import '@/static/airline-theme.css'
import MessageBox from 'element-plus/lib/el-message-box'
import Message from 'element-plus/lib/el-message'
// fade/zoom 等
import 'element-plus/lib/theme-chalk/base.css';
// collapse 展开折叠
import { ElCollapseTransition } from 'element-plus';

const app = createApp(App)
installElementPlus(app)
app.config.globalProperties.$msgbox = MessageBox
app.config.globalProperties.$alert = MessageBox.alert
app.config.globalProperties.$confirm = MessageBox.confirm;
app.config.globalProperties.$prompt = MessageBox.prompt;
app.component(ElCollapseTransition.name, ElCollapseTransition)
app.use(router).mount('#app')