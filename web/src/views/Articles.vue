<template>
	<div class="article-page" v-if="model">
		<div class="arti-header d-flex py-3 px-2 border-bottom">
			<i class="iconfont icon-back text-blue fs-xl"></i>
			<strong class="flex-grow-1 text-wrap pr-2 text-blue fs-lg">{{model.title}}</strong>
			<span>{{new Date | date}}</span>
		</div>
		<div v-html="model.content" class="px-3 fs-xl body"></div>
		<div class="px-3 border-top py-3">
			<div class="d-flex ai-center">
				<i class="iconfont icon-Tag"></i>
				<strong class="text-blue ml-1">相关资讯</strong>
			</div>
			<div class="mt-2">
				<router-link class="mb-1 text-wrap pr-5" tag="div" :to="`/articles/${item._id}`" v-for="item in articles" :key="item._id">
					{{item.title}}
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>

import dayjs from 'dayjs'

export default{
	filters:{
      date(val){
         return dayjs(val).format('MM/DD')
      }
   },
	props:{
		id:{}
	},
	watch:{
		id: 'fetch'
	},
	data(){
		return{
			model: null,
			articles:[]
		}
	},
	methods: {
		async fetch(){
			const res = await this.$http.get(`/articles/${this.id}`)
			this.model = res.data.data
			this.articles = res.data.correlation
		},
	},
	created(){
		this.fetch()
	}
}
</script>

<style lang="scss">
.article-page{
	.icon-back{
		font-size: 1.7rem;
	}
	.body{
		img{
			width: 100%;
			height: auto;
		}
		iframe{
			width: 100%;
			height: auto;
		}
	}
}
</style>