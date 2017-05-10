<template>
  <div>
    <Row type="flex">
      <iCol :push="1" :pull="1" :xs="9" :sm="6" :lg="3" :md="5">1111</iCol>
      <iCol :span="5" :offset="1">2222</iCol>
    </Row>


    <iButton type="primary" disabled>按钮</iButton>
  </div>
</template>

<script>

 import {Row, Col} from './grid';
 import {Button} from './button';
  export default {
    name: 'hello',
    components: {
      Row,
      iCol: Col,
      iButton: Button
    }
  }
</script>

<style></style>
