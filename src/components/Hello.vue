<template>
  <div>
    <Row type="flex">
      <iCol :push="1" :pull="1" :xs="9" :sm="6" :lg="3" :md="5">1111</iCol>
      <iCol :span="5" :offset="1">2222</iCol>
    </Row>

    <span><Icon type="refresh" color="red" size="14px" distance="5px"></Icon>refresh<Icon type="search" color="green"
                                                                                          size="14px"
                                                                                          distance="5px"></Icon></span>

    <!--<ButtonGroup>-->
    <!--<iButton type="primary" disabled>primary</iButton>-->
    <iButton type="info" disabled>info</iButton>
    <iButton type="info" size="large">info large</iButton>
    <iButton type="success" size="small">success small</iButton>
    <iButton type="warning" size="large">warning large</iButton>
    <iButton type="error" size="small">error small</iButton>
    <iButton type="success" long>success long</iButton>

    <iButton>primary</iButton>
    <iButton type="ghost">ghost</iButton>
    <iButton type="dashed">dashed</iButton>
    <iButton type="text">text</iButton>

    <br>
    <iButton shape="circle">circle</iButton>
    <iButton shape="circle" size="large">circle large</iButton>
    <iButton shape="circle" size="small">circle small</iButton>

    <iButton shape="circle" icon="refresh"></iButton>
    <iButton shape="circle" icon="star" size="large"></iButton>
    <iButton shape="circle" icon="search" size="small">搜索</iButton>

    <iButton shape="circle">搜索 <Icon type="search"></Icon></iButton>
    <!--</ButtonGroup>-->

  </div>
</template>

<script>

  import {Row, Col} from './grid';
  import {ButtonGroup, Button} from './button';
  import {Icon} from './icon';
  export default {
    name: 'hello',
    components: {
      Row,
      iCol: Col,
//      ButtonGroup,
      iButton: Button,
      Icon
    }
  }
</script>

<style></style>
