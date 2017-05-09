<template>
  <div>
    <Row type="flex">
      <iCol :push="1" :pull="1" :xs="9" :sm="6" :lg="3" :md="5">1111</iCol>
      <iCol :span="5" :offset="1">2222</iCol>
    </Row>

  </div>
</template>

<script>

 import {Row, Col} from './grid';
  export default {
    name: 'hello',
    components: {
      Row,
      iCol: Col
    }
  }
</script>

<style></style>
