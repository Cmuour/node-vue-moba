<template>
   <div>
      <h1>{{ id ? '编辑' : '新建'}}分类</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
         <el-form-item label="上级分类">
            <el-select v-model="model.parent">
               <el-option
                  v-for="item in parents"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
               ></el-option>
            </el-select>
         </el-form-item>
         <el-form-item label="第几级">
           <el-radio-group v-model="model.class">
            <el-radio :label="1">一级</el-radio>
            <el-radio :label="2">二级</el-radio>
         </el-radio-group>
         </el-form-item>
         <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" native-type="submit">保存</el-button>
         </el-form-item>
      </el-form>
   </div>
</template>

<script>
export default {
   data() {
      return {
         model: {
          class: 1
         },
         parents: [],
      };
   },
   props: {
      id: {}
   },
   methods: {
      async save() {
         if (this.id) {
            await this.$http.put(`rest/categories/${this.id}`, this.model);
         } else {
            await this.$http.post("rest/categories", this.model);
         }
         this.$router.push("/categories/list");
         this.$message({
            type: "success",
            message: "保存成功"
         });
      },
      async fetch() {
         const res = await this.$http.get(`rest/categories/${this.id}`);
         this.model = res.data;
      },
      async fetchParent() {
         const res = await this.$http.get(`rest/categories?class=1&type=category`);
         this.parents = res.data;
      }
   },
   created() {
      this.fetchParent();
      this.id && this.fetch();
   }
};
</script>