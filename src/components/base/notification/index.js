import Notification from './notification.vue';
import Vue from 'vue';
import {camelcaseToHyphen} from '../../../util/assist';

Notification.newInstance = properties => {
  let _props = properties;
  let props = '';

  Object.keys(_props).forEach( prop => {
    props += ' :' + camelcaseToHyphen(prop) + '=' + prop;
  });

  let div = document.createElement('div');
  div.innerHTML = `<notification${props}></notification>`;
  document.body.appendChild(div);

  const notification = new Vue({
    el: div,
    data: _props,
    components: { Notification }
  }).$children[0];

  return {
    component: notification,
    notice(noticeOpts){
      console.log(noticeOpts)
      notification.add(noticeOpts);
    },
    remove(name){
      notification.close(name);
    },
    destroy(){
      notification.closeAll();

      setTimeout(function () {
        document.body.removeChild( document.querySelectorAll('ivu-message')[0].parentElement);
      }, 500)
    }
  };
};

export default Notification;
