<template>
	<van-dropdown-menu :close-on-click-outside="false">
		<van-dropdown-item v-model="value" :options="option" />
		<van-dropdown-item title="筛选" ref="item">
			<van-cell-group>
				<van-field v-model="search.keyword" label="模糊检索" placeholder="请输入用户名" />
				<van-field v-model="search.time" readonly label="模糊检索" placeholder="请输入用户名" />
				<van-field v-model="search.time" readonly label="模糊检索" placeholder="请输入用户名" />
				<van-field
					v-model="search.time"
					readonly
					label="模糊检索"
					placeholder="请输入用户名"
					@click="datetimeShow = true"
				/>
				<van-field v-model="search.time" readonly label="模糊检索" placeholder="请输入用户名" />
				<van-checkbox-group v-model="result">
					<van-checkbox name="a">复选框 a</van-checkbox>
					<van-checkbox name="b">复选框 b</van-checkbox>
				</van-checkbox-group>
				<van-checkbox-group v-model="result">
					<van-checkbox name="a">复选框 a</van-checkbox>
					<van-checkbox name="b">复选框 b</van-checkbox>
				</van-checkbox-group>
			</van-cell-group>
			<div class="search_btn">
				<van-button type="danger" size="small" @click="handleClickReset">重置</van-button>
				<van-button type="danger" size="small" @click="onConfirm"> 确认 </van-button>
			</div>
		</van-dropdown-item>
	</van-dropdown-menu>
	<van-popup
		class="aa"
		v-model:show="datetimeShow"
		position="bottom"
		:style="{height: '308px'}"
		@click.stop="handleClick"
	>
		<van-datetime-picker v-model="time" type="datetime" title="选择完整时间" />
	</van-popup>
	<div @click="test">test click</div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, computed, readonly} from 'vue';

export default defineComponent({
	name: 'business-list',
	setup(props, context) {
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
		return {
			search,
			value,
			option,
			sort,
			datetimeShow,
			time,
			result,
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