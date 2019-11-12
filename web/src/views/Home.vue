<template>
   <div>
      <swiper :options="swiperOption">
         <swiper-slide>
            <img class="w-100" src="../assets/images/8f3dc9afda3109063a49f07365d17867.jpeg" />
         </swiper-slide>
         <swiper-slide>
            <img class="w-100" src="../assets/images/9dac5ac96d27c55b6b322a02eacf1813.jpeg" />
         </swiper-slide>
         <swiper-slide>
            <img class="w-100" src="../assets/images/25bef405982eda3414029e8859d7ffc8.jpeg" />
         </swiper-slide>
         <div class="swiper-pagination pagination-home text-right px-3 py-2" slot="pagination"></div>
      </swiper>
      <!-- end of swiper -->

      <div class="nav-icons bg-white mt-3 pt-3 text-center text-dark-1">
         <div class="d-flex flex-wrap">
            <div class="nav-item mb-3 p-2" v-for="n in 10" :key="n">
               <i class="sprite sprite-news"></i>
               <div class="mt-1">爆料站</div>
            </div>
         </div>
         <div class="bg-light py-2 fs-sm d-flex ai-center jc-center">
            <i class="sprite sprite-arrow mr-1 fs-md"></i>
            <span>收起</span>
         </div>
      </div>
      <!-- end of nav -->

      <m-card-list title="新闻资讯" icon="Menu" :categories="categories">
         <template #items="{category}">
            <div
               class="py-2 d-flex" 
               v-for="(item,i) in category.newsList" 
               :key="i"
            >
               <router-link :to="`/articles/${item._id}`" class="flex-grow-1 text-wrap text-black pr-3">
                  <span class="text-info">[{{item.categoryName}}]</span>
                  <span class="px-2">|</span>
                  <span class="">{{item.title}}</span>
               </router-link >
               <span class="text-grey-1">{{curdate | date}}</span>
            </div>
         </template>
      </m-card-list>

      <m-card-list title="英雄列表" icon="card-hero" :categories="heroes">
         <template #items="{category}">
            <div class="d-flex flex-wrap hero-wrap">
               <router-link
                  tag="div"
                  :to="`/heroes/${hero._id}`"
                  class="py-2 herolist text-center p-2" 
                  v-for="(hero,i) in category.heroList" 
                  :key="i"
               >
                  <img :src="hero.avatar" class="w-100">
                  <span>{{hero.name}}</span>
               </router-link>
            </div>
         </template>
      </m-card-list>
      
      <p>153156</p>  
         <p>153156</p>
      <p>153156</p>
      <p>153156</p>
         <p>153156</p>
      <p>153156</p>
            <p>153156</p>
      <p>153156</p>
      <p>153156</p>
      <p>153156</p>
   </div>
</template>

<script>

import dayjs from 'dayjs'

export default {
   filters:{
      date(val){
         return dayjs(val).format('MM/DD')
      }
   },
   data() {
      return {
         swiperOption: {
            pagination: {
               el: ".pagination-home"
            },
            autoplay:{
               delay: 3000
            },
            loop: true
         },
         categories: [],
         heroes:[],
         curdate: new Date()
      };
   },
   methods:{
      async fetch(){
         const res = await this.$http.get('/news/list')
         this.categories = res.data
      },
      async fetchHeroList(){
         const res = await this.$http.get('/heroes/list')
         this.heroes = res.data

      }
   },
   created(){
      this.fetchHeroList()
      this.fetch()
   }
};
</script>

<style lang="scss">
@import "../assets/scss/variables";

.pagination-home {
   .swiper-pagination-bullet {
      background: map-get($colors, "white");
      border-radius: 0.1538rem;
      opacity: 1;
      &.swiper-pagination-bullet-active {
         background: map-get($colors, "info");
      }
   }
}

.nav-icons {
   border-top: 1px solid $border-color;
   border-bottom: 1px solid $border-color;
   .nav-item {
      width: 25%;
      border-right: 1px solid $border-color;
      &:nth-child(4n) {
         border-right: none;
      }
   }
}

.hero-wrap{
   margin-left: -0.5rem;
   margin-right: -0.5rem;
   .herolist{
      width: 20%;
   }
}

</style>