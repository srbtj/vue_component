/**
 *  该js的作用： 生成 Notification实例， 供外部调用
 *  通用的 通知模版
 *  参数：
 *    styles: Object,
 *    prefixCls: string
 * **/
import Notification from './notification.vue';
import Vue from 'vue';
import {camelcaseToHyphen} from '../../../util/assist';

Notification.netInstance = properties => {

  let _props = properties || {}; // 保存参数
  let props = '';

  Object.keys(_props).forEach(prop => {
    props += ' :' + camelcaseToHyphen(prop) + '=' + prop; // =>  :prefix-cls="prefixCls" :styles="styles"
  });

  /** 向页面中添加 通知 Dom **/
  const div = document.createElement('div');
  div.innerHTML = `<notification${props}></notification>`;
  document.body.appendChild(div);

  const notification = new Vue({
    el: div,
    components: { Notification },
    data: _props
  }).$children[0];

  return {
    component: notification,
    notice(notice){
      notification.add(notice);
    },
    remove(name){
      notification.close(name);
    },
    destroy(){
      notification.closeAll();
      setTimeout( () => {
        document.body.removeChild(document.querySelectorAll('.ivu-message')[0].parentElement)
      }, 500);
    }
  }
};

export default Notification;
