<template>
  <div v-if="model" class="hero">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
      <img src="../assets/logo.png" height="30px">
      <div class="px-2 flex-grow-1">
        <span class="mr-3">王者荣耀</span>
        <span class="mt-1">攻略站</span>
      </div>
      <router-link to="/" tag="div">更过英雄 &gt; </router-link>
    </div>
    <div class="hero-header" :style="{'background-image': `url(${model.banner})`}" v-if="model.scores">
		<div class="info text-white d-flex flex-column jc-end h-100 p-3">
			<div>{{model.title}}</div>
			<h2 class="my-2">{{model.name}}</h2>
			<div class="">{{model.categories.map(v => v.name).join('/')}}</div>
			<div class="d-flex flex-wrap ai-center text-center jc-between">
				<div class="scores  mt-1 d-flex flex-wrap">
					<div class="mr-2">难度<span class="inline-block ml-1 fs-sm bg-yellow">{{model.scores.difficult}}</span> </div>
					<div class="mr-2">技能<span class="inline-block ml-1 fs-sm bg-blue-1">{{model.scores.skills}}</span> </div>
					<div class="mr-2">攻击<span class="inline-block ml-1 fs-sm bg-danger">{{model.scores.attack}}</span> </div>
					<div class="mr-2">生存<span class="inline-block ml-1 fs-sm bg-dark-1">{{model.scores.survive}}</span> </div>
				</div>
				<router-link to="/" tag="div" class="text-grey pt-1">皮肤 : 3 &gt;</router-link>
			</div>
		</div>
    </div>
    <!-- header of end -->

	<div>
		<div class="bg-white px-3 pt-3">
			<div class="nav d-flex jc-around border-bottom pb-2">
				<div class="nav-item active">
					<div class="nav-link">英雄初始</div>
				</div>
				<div class="nav-item">
					<div class="nav-link">进阶攻略</div>
				</div>
			</div>
		</div>
		<swiper>
			<swiper-slide>
				<div class="p-3 bg-white">
					<div class="d-flex">
						<router-link to="/" tag="div" class="btn btn-lg flex-grow-1">
							<i class="iconfont icon-Menu"></i>
							<span>英雄介绍视频</span>
						</router-link>
						<router-link to="/" tag="div" class="btn btn-lg ml-2 flex-grow-1">
							<i class="iconfont icon-Menu"></i>
							一图识英雄
						</router-link>
					</div>
					<div class="skills mt-3">
						<div class="d-flex jc-around">
							<img class="icon" :class="{active : currentSkillsIndex === i}" v-for="(item,i) in model.skills" :src="item.icon" :key="item.name" @click="currentSkillsIndex = i" >
						</div>
						<div v-if="currentSkills">
							<div class="d-flex py-3">
								<h3 class="m-0">{{currentSkills.name}}</h3>
								<span class="ml-4 text-grey">
									(冷却值: {{currentSkills.cooling}} 消耗: {{currentSkills.consume}})
								</span>
							</div>
							<p class="fs-sm mt-1 pb-2 border-bottom">{{currentSkills.description}}</p>
							<p class="fs-sm text-grey">小提示：{{currentSkills.tips}}</p>
						</div>
					</div>
					<div class=""></div>
				</div>
				<m-card plain icon="Menu" title="顺风出装">
					<div class="d-flex jc-around mt-3 text-center border-bottom pb-3">
						<div class="equip" v-for="item in model.items1" :key="item.name">
							<img :src="item.icon" class="icon" alt="">
							<span class="inline-block fs-xs">{{item.name}}</span>
						</div>
					</div>
					<h3><i class="iconfont icon-Menu pr-2"></i>逆风出装</h3>
					<div class="d-flex jc-around mt-3 text-center">
						<div class="equip" v-for="item in model.items2" :key="item.name">
							<img :src="item.icon" class="icon" alt="">
							<span class="inline-block fs-xs">{{item.name}}</span>
						</div>
					</div>
				</m-card>
				<m-card plain icon="Menu" title="使用技巧">
					<p>{{model.usageTips}}</p>
				</m-card>
				<m-card plain icon="Menu" title="对抗技巧">
					<p>{{model.battleTips}}</p>
				</m-card>
				<m-card plain icon="Menu" title="团战思路">
					<p>{{model.teamTips}}</p>
				</m-card>
				<m-card plain icon="Menu" title="英雄关系">
					<div>
						<h3>最佳搭档</h3>
						<div class="d-flex pb-2" v-for="item in model.partners" :key="item._id">
							<img :src="item.hero.avatar" width="50" height="50" alt="">
							<div class="p-2">{{item.description}}</div>
						</div>
					</div>
					
				</m-card>
			</swiper-slide>
			<swiper-slide></swiper-slide>
		</swiper>
	</div>
  </div>
</template>

<script>
export default{
	props:{
		id: {}
	},
	data(){
		return{
			model:null,
			currentSkillsIndex: 0
		}
	},
	computed:{
		currentSkills(){
			return this.model.skills[this.currentSkillsIndex]
		}
	},
	methods:{
		async fetch(){
			const res = await this.$http.get(`/heroes/${this.id}`)
			this.model = res.data
		}
	},
	created(){
		this.fetch()
	}
}
</script>

<style lang=scss>

@import '../assets/scss/_variables.scss';

.hero{
	.hero-header{
		height: 50vw;
		background-size: auto 100%;
		background-position: top center;
		background-repeat: no-repeat;
		.info{
			background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
			.scores{
				span{
					width: 1.1rem;
					height: 1.1rem;
					border-radius: 50%;
					line-height: 1.2rem;
				}
			}
		}
		
	}
}
.skills{
	.icon{
		width: 64px;
		height: 64px;
		border: 3px solid transparent;
		&.active{
			border: 3px solid map-get($colors,'primary');
			border-radius: 50%;
		}
	}
}
.equip{
	width: 54px;
	.icon{
		width: 90%;
		border-radius: 50%;
	}
}
</style>