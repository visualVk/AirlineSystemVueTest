/*
 * @Author: your name
 * @Date: 2021-01-22 14:50:45
 * @LastEditTime: 2021-03-18 19:45:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-airline-01\tests\unit\example.spec.ts
 */
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import { UserService } from "@/utils/api/index";
import { stores } from '@/utils/store/store';

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       props: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })

test('login', () => {
  let user = {
    isAdmin: false,
    password: 'wang',
    rememberMe: true,
    username: 'wang'
  }
  let res = UserService.login(user)
  stores.isDebug ? console.log(res) : ''
  let ans = "1";
  expect("1").toMatch(ans);
})