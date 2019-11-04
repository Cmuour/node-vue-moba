<template>
  <div>
    <h1>{{ id ? '编辑' : '新建'}}用户</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="text" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data(){
    return{
      model:{},
    }
  },
  props:{
    id: {}
  },
  methods: {
    async save(){
      if(this.id){
        await this.$http.put(`rest/adminUser/${this.id}`,this.model);
      }else{
        await this.$http.post('rest/adminUser',this.model);
      }
      this.$router.push('/admin_user/list');
      this.$message({
        type: 'success',
        message: '保存成功'
      });
    },
    async fetch(){
      const res = await this.$http.get(`rest/adminUser/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.id && this.fetch()
  },
}
</script>
