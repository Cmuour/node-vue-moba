<template>
   <m-card :title="title" :icon="icon">
      <div class="nav jc-between mt-3">
         <div class="nav-item" :class="{active: active === i}" v-for="(item,i) in categories" :key="i" @click="$refs.list.swiper.slideTo(i)">
            <div v-if="item.name">{{item.name}}</div>
         </div>
      </div>
      <swiper :options="{ autoHeight: true }" ref="list" @slide-change="changIndex" autoHeight="true">
         <swiper-slide class="pt-2" v-for="(category,i) in categories" :key="i">
            <slot name="items" :category="category"></slot>
         </swiper-slide>
      </swiper>
   </m-card>
</template>

<script>
export default {
   props: {
      title: { type: String, required: true },
      icon: { type: String, required: true },
      categories: { type: Array },
      returnIndex:{ type: Boolean }
   },
   data(){
     return{
       active: 0
     }
   },
   methods: {
    changIndex(){
       this.active = this.$refs.list.swiper.realIndex
       if(this.returnIndex){
        this.$emit('getIndex',this.active)
       }
    }
   }
};
</script>

<style lang="scss">
</style>