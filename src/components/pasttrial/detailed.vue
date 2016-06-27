<template>
  <div class="test">
    <h3>当前产品id为{{$route.params.productId}}电话号码为{{$route.params.phone}}</h3>
  </div>
</template>

<style lang="less" scoped>
.test{
  h3{
    color: red;
  }
}
</style>
