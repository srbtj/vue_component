import Notification from './notification.vue';
import Vue from 'vue';
import {camelcaseToHyphen} from '../../../util/assist';
Notification.newInstance = properties => {

  /** 保存传入的参数 */
  let _props = properties || {};
  let props = '';

  Object.keys(_props).forEach( prop => {
    props += ' :' + camelcaseToHyphen(prop) + '=' + prop;
  });

  const div = document.createElement('div');
  div.innerHTML = `<notification${props}></notification>`;
  document.body.appendChild(div);

  const notification = new Vue({
    el: div,
    data: _props,
    components: { Notification }
  }).$children[0];


  return {
    component: notification,
    /** 添加消息 **/
    notice(noticeProps){
      notification.add(noticeProps);
    },
    /** 删除消息 **/
    remove(name){
      notification.close(name);
    },
    destroy(){
      document.body.remove(div);
    },
  }
};
export default Notification;
