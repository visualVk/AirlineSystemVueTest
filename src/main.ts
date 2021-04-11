/*
 * @Author: your name
 * @Date: 2021-02-06 11:31:06
 * @LastEditTime: 2021-04-11 11:59:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\src\main.ts
 */
import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
// import MessageBox from 'element-plus/lib/el-message-box'
// import Message from 'element-plus/lib/el-message'
import installElementPlus from '../src/plugins/element'
import '@/static/airline-theme.css'
// import ElementPlus from 'element-plus';
// import 'element-plus/lib/theme-chalk/index.css';
const app = createApp(App)
installElementPlus(app)
// app.config.globalProperties.$msgbox = MessageBox
// app.config.globalProperties.$alert = MessageBox.alert
// app.config.globalProperties.$confirm = MessageBox.confirm;
// app.config.globalProperties.$prompt = MessageBox.prompt;
app.use(router).mount('#app')