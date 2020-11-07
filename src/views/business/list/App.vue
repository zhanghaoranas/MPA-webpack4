<template>
	<van-dropdown-menu :close-on-click-outside="false">
		<van-dropdown-item v-model="value" :options="option" />
		<van-dropdown-item title="筛选">
			<van-cell-group>
				<van-field v-model="search.keyword" label="模糊检索" placeholder="请输入客户名/主联系人/手机号" />
				<van-field v-model="search.time" readonly label="地址类型" placeholder="请输入用户名" />
				<van-field v-model="search.time" readonly label="区域选择" placeholder="请输入用户名" />
				<van-field v-model="search.time" readonly label="接触开始" placeholder="请输入用户名" @click="datetimeShow = true" />
				<van-field v-model="search.time" readonly label="接触结束" placeholder="请输入用户名" />
			</van-cell-group>
			<div class="search_btn">
				<van-button type="danger" size="small" @click="handleClickReset">重置</van-button>
				<van-button type="danger" size="small" @click="onConfirm"> 确认 </van-button>
			</div>
		</van-dropdown-item>
	</van-dropdown-menu>
	<van-popup v-model:show="datetimeShow" position="bottom" :style="{height: '308px'}" @click.stop="handleClick">
		<van-datetime-picker v-model="time" type="datetime" title="选择完整时间" />
	</van-popup>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, computed, readonly} from 'vue';
import {getQueryStringForUrl} from '../../../utils'
import {getBusinessList} from '../../../api'


export default defineComponent({
	name: 'business-list',
	setup(props, context) {
		const queryString = readonly(getQueryStringForUrl());
		const value = ref(0);
		const datetimeShow = ref(false);
		const option = readonly([
			{text: '默认', type: 1, value: 0},
			{text: '购机日期由远及近', type: 1, value: 1},
			{text: '购机日期由近及远', type: 1, value: 2},
			{text: '接触时间由远及近', type: 1, value: 3},
			{text: '接触时间由近及远', type: 1, value: 4},
		]);
		const result = reactive(['a', 'b']);
		const sort = computed(() => {
			return option.find((item) => {
				return item.value == value.value;
			});
		});
		const search = reactive({
			keyword: '',
			time: '',
		});
		const time = reactive(new Date());
		const businessList = reactive({});
		const getList = async () => {
			const businessList = await getBusinessList(search);
		} 
		return {
			search,
			value,
			option,
			sort,
			datetimeShow,
			time,
			result,
			getList,
			businessList
		};
	},
	methods: {
		onConfirm() {
			console.log('test');
		},
		handleClick() {
			console.log('hehe');
		},
		test() {
			console.log('hehe');
		},
		/**
		 * 重置筛选条件
		 */
		handleClickReset() {},
	},
});
</script>

<style lang="sass" scoped>
.search_btn{
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding: 16px;
	>button{
		min-width: 20vw;
	}
}
</style>