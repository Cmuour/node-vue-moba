<template>
   <div>
      <h1>{{ id ? '编辑' : '新建'}}英雄</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
         <el-tabs type="border-card">
            <el-tab-pane label="基础信息">
               <el-form-item label="名称">
                  <el-input v-model="model.name"></el-input>
               </el-form-item>
               <el-form-item label="称号">
                  <el-input v-model="model.title"></el-input>
               </el-form-item>
               <el-form-item label="头像">
                  <el-upload
                     class="avatar-uploader"
                     :action="uploadUrl"
                     :headers="getAuthHeaders()"
                     :show-file-list="false"
                     :on-success="res=> $set(model,'avatar', res.url)"
                  >
                     <img v-if="model.avatar" :src="model.avatar" class="avatar" />
                     <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
               </el-form-item>
               <el-form-item label="背景图">
                  <el-upload
                     class="avatar-uploader"
                     :action="uploadUrl"
                     :headers="getAuthHeaders()"
                     :show-file-list="false"
                     :on-success="res=> $set(model,'banner', res.url)"
                  >
                     <img v-if="model.banner" :src="model.banner" class="avatar" />
                     <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
               </el-form-item>
               <el-form-item label="类型">
                  <el-select v-model="model.categories" multiple>
                     <el-option
                        v-for="item of categories"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id"
                     ></el-option>
                  </el-select>
               </el-form-item>
               <el-form-item label="难度">
                  <el-rate
                     :max="10"
                     show-score
                     v-model="model.scores.difficult"
                     style="marginTop:0.6rem;"
                  ></el-rate>
               </el-form-item>
               <el-form-item label="技能">
                  <el-rate
                     :max="10"
                     show-score
                     v-model="model.scores.skills"
                     style="marginTop:0.6rem;"
                  ></el-rate>
               </el-form-item>
               <el-form-item label="攻击">
                  <el-rate
                     :max="10"
                     show-score
                     v-model="model.scores.attack"
                     style="marginTop:0.6rem;"
                  ></el-rate>
               </el-form-item>
               <el-form-item label="生存">
                  <el-rate
                     :max="10"
                     show-score
                     v-model="model.scores.survive"
                     style="marginTop:0.6rem;"
                  ></el-rate>
               </el-form-item>
               <el-form-item label="顺风出装">
                  <el-select v-model="model.items1" multiple>
                     <el-option
                        v-for="item of items"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id"
                     ></el-option>
                  </el-select>
               </el-form-item>
               <el-form-item label="逆风出装">
                  <el-select v-model="model.items2" multiple>
                     <el-option
                        v-for="item of items2"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id"
                     ></el-option>
                  </el-select>
               </el-form-item>
               <el-form-item label="使用技巧">
                  <el-input type="textarea" v-model="model.usageTips"></el-input>
               </el-form-item>
               <el-form-item label="对抗技巧">
                  <el-input type="textarea" v-model="model.battleTips"></el-input>
               </el-form-item>
               <el-form-item label="团战思路">
                  <el-input type="textarea" v-model="model.teamTips"></el-input>
               </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="技能信息">
               <el-button @click="model.skills.push({})">
                  <i class="el-icon-plus"></i> 添加技能
               </el-button>
               <el-row type="flex" style="flex-wrap:wrap;">
                  <el-col
                     style="margin-top:1rem; "
                     :md="12"
                     v-for="(item, i) in model.skills"
                     :key="i"
                  >
                     <el-form-item label="技能名称">
                        <el-input v-model="item.name"></el-input>
                     </el-form-item>
                     <el-form-item label="技能图标">
                        <el-upload
                           class="avatar-uploader"
                           :action="uploadUrl"
                           :headers="getAuthHeaders()"
                           :show-file-list="false"
                           :on-success="res => $set(item,'icon',res.url)"
                        >
                           <img v-if="item.icon" :src="item.icon" class="avatar" />
                           <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                     </el-form-item>
                     <el-form-item label="技能冷却值">
                        <el-input v-model="item.cooling"></el-input>
                     </el-form-item>
                     <el-form-item label="技能消耗">
                        <el-input v-model="item.consume"></el-input>
                     </el-form-item>
                     <el-form-item label="技能描述">
                        <el-input type="textarea" v-model="item.description"></el-input>
                     </el-form-item>
                     <el-form-item label="小提示">
                        <el-input type="textarea" v-model="item.tips"></el-input>
                     </el-form-item>
                     <el-form-item>
                        <el-button size="small" type="danger" @click="model.skills.splice(i,1)">删除</el-button>
                     </el-form-item>
                  </el-col>
               </el-row>
            </el-tab-pane>
            <el-tab-pane label="英雄关系">
               <el-button @click="model.partners.push({})">
                  <i class="el-icon-plus"></i> 添加英雄关系
               </el-button>
               <el-row type="flex" style="flex-wrap:wrap;">
                  <el-col
                     style="margin-top:1rem; "
                     :md="12"
                     v-for="(item, i) in model.partners"
                     :key="i"
                  >
                     <el-form-item label="英雄">
                        <el-select v-model="item.hero" filterable>
                           <el-option v-for="hero in heroes" :key="hero._id" :value="hero._id" :label="hero.name"></el-option>
                        </el-select>
                     </el-form-item>   
                     
                     <el-form-item label="小提示">
                        <el-input type="textarea" v-model="item.description"></el-input>
                     </el-form-item>
                     <el-form-item>
                        <el-button size="small" type="danger" @click="model.skills.splice(i,1)">删除</el-button>
                     </el-form-item>
                  </el-col>
               </el-row>
            </el-tab-pane>
         </el-tabs>
         <el-form-item style="margin-top:1rem;">
            <el-button type="primary" native-type="submit">保存</el-button>
         </el-form-item>
      </el-form>
   </div>
</template>

<script>
export default {
   data() {
      return {
         categories: [],
         items: [],
         items2: [],
         model: {
            name: "",
            avatar: "",
            scores: {},
            skills: []
         },
         heroes:[]
      };
   },
   props: {
      id: {}
   },
   methods: {
      async save() {
         if (this.id) {
            await this.$http.put(`rest/hero/${this.id}`, this.model);
         } else {
            await this.$http.post("rest/hero", this.model);
         }
         this.$router.push("/heroes/list");
         this.$message({
            type: "success",
            message: "保存成功"
         });
      },
      async fetch() {
         const res = await this.$http.get(`rest/hero/${this.id}`);
         this.model = Object.assign({}, this.model, res.data);
      },
      async fetchCategories() {
         const res = await this.$http.get(`rest/categories?class=2`);
         this.categories = res.data;
      },
      async fetchHeroes() {
         const res = await this.$http.get(`rest/heroes`);
         this.heroes = res.data;
      },
      async fetchItems() {
         const res = await this.$http.get(`rest/items`);
         this.items = res.data;
      },
      async fetchItems2() {
         const res = await this.$http.get(`rest/items`);
         this.items2 = res.data;
      }
   },
   created() {
      this.fetchItems();
      this.fetchItems2();
      this.fetchCategories();
      this.fetchHeroes();
      this.id && this.fetch();
   }
};
</script>
