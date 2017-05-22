<template>
  <transition name="">
    <div :class="messageClasses">

    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {oneOf} from '../../util/assist';
  import {Icon} from '../icon';
export default{
  name: 'Message',
  components: {
    Icon
  },
  props: {}
}
</script>

<style>

</style>
