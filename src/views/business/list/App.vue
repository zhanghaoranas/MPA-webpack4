<template>
	<div>business/list</div>
	<span>{{ testObj.name }}</span>
</template>

<script lang="ts">
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

<style>
</style>