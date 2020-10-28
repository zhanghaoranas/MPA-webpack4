<template>
	<div>business/list</div>
	<span>{{ testObj.name }}</span>
	<van-button type="primary">主要按钮</van-button>
</template>

<script lang="ts">
import { Button } from "vant";
import { defineComponent, reactive } from "vue";

export default defineComponent({
	name: "list",
	setup(props, context) {
		const testObj = reactive({
			name: "test",
		});
		return {
			testObj,
		};
	},
});
</script>

<style lang="sass" scoped>
	div{
width: 200px;
	}
</style>