<template>

<el-container id="yxi">
  <el-aside width="200px">
    <el-row>
      <el-button icon="el-icon-search" circle></el-button>
    </el-row>
    <el-row>
      <el-button type="primary" icon="el-icon-edit" circle></el-button>
    </el-row>
  </el-aside>
  <el-main>Main</el-main>
</el-container>

</template>

<script>
export default {
  name: 'yxi'
}
</script>
<!-- styling for the component -->
<script>

</script>
<style>

  .el-aside {
    background-color:#409EFF;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }


</style>
