<template>
   <div>
      <h1>{{ id ? '编辑' : '新建'}}文章</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
         <el-form-item label="所属分类">
            <el-select v-model="model.categories" multiple>
               <el-option
                  v-for="item in categories"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
               ></el-option>
            </el-select>
         </el-form-item>
         <el-form-item label="名称">
            <el-input v-model="model.title"></el-input>
         </el-form-item>
         <el-form-item label="介绍">
            <el-input type="textarea" v-model="model.description"></el-input>
         </el-form-item>
         <el-form-item label="封面">
            <el-upload
               class="avatar-uploader"
               :action="uploadUrl"
               :headers="getAuthHeaders()"
               :show-file-list="false"
               :on-success="res=> $set(model,'bg_img', res.url)"
            >
               <img v-if="model.bg_img" :src="model.bg_img" class="avatar" />
               <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
         </el-form-item>
         <el-form-item label="内容">
            <vue-editor
               v-model="model.content"
               useCustomImageHandler
               @image-added="handleImageAdded"
            ></vue-editor>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" native-type="submit">保存</el-button>
         </el-form-item>
      </el-form>
   </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
   components: {
      VueEditor
   },
   data() {
      return {
         model: {},
         categories: []
      };
   },
   props: {
      id: {}
   },
   methods: {
      async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
         var formData = new FormData();
         formData.append("file", file);
         let res = await this.$http.post("upload", formData);
         Editor.insertEmbed(cursorLocation, "image", res.data.url);
         resetUploader();
      },
      async save() {
         if (this.id) {
            await this.$http.put(`rest/article/${this.id}`, this.model);
         } else {
            await this.$http.post("rest/article", this.model);
         }
         this.$router.push("/articles/list");
         this.$message({
            type: "success",
            message: "保存成功"
         });
      },
      async fetch() {
         const res = await this.$http.get(`rest/article/${this.id}`);
         this.model = res.data;
      },
      async fetchCategories() {
         const res = await this.$http.get(`rest/categories?class=2&type=article`);
         this.categories = res.data;
      }
   },
   created() {
      this.fetchCategories();
      this.id && this.fetch();
   }
};
</script>