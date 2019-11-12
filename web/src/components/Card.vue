<template>
   <div class="card mt-3 bg-white p-3">
      <div class="card-header d-flex ai-center jc-center" :class="{'border-bottom': !plain, 'pb-3': !plain}">
         <i class="iconfont" :class="`icon-${icon}`"></i>
         <span class="flex-grow-1 px-2 fs-xl bold">{{title}}</span>
         <i class="iconfont icon-menu" v-if="!plain"></i>
      </div>
      <div class="card-body">
         <slot></slot>
      </div>
   </div>
</template>

<script>
export default {
  props:{
    title:{type:String,required: true},
    icon:{type:String,required: true},
    plain: {type: Boolean}
  }
};
</script>

<style lang="scss">
</style>