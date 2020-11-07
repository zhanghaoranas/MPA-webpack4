import { createApp } from 'vue';
import App from './App.vue';
import { Button, DropdownMenu, DropdownItem, Cell, CellGroup, Field, DatetimePicker, Popup, Checkbox, CheckboxGroup } from 'vant';

createApp(App)
	.use(Button)
	.use(DropdownItem)
	.use(DropdownMenu)
	.use(Cell)
	.use(CellGroup)
	.use(Field)
	.use(DatetimePicker)
	.use(Popup)
	.use(Checkbox)
	.use(CheckboxGroup)
	.mount('#app');
