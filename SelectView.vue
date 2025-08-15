<template>
	<div id="container">
		<n-config-provider :theme="theme">
			<n-space vertical>
				<div>选中内容</div>
				<n-input v-model:value="store.text" readonly />
				<div>转换结果</div>
				<n-input v-model:value="store.result" type="textarea" readonly />
			</n-space>
		</n-config-provider>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { darkTheme } from "naive-ui";
import type { GlobalTheme, GlobalThemeOverrides } from "naive-ui";
import { store } from "./store";

// 检查 Obsidian 当前主题
function isDark() {
	return document.body.classList.contains('theme-dark')
}

const lightThemeOverrides = {
	// common: {
	// 	primaryColor: '#000000',
	// 	textColor2: '#000000'
	// }
}

const darkThemeOverrides = {
	// common: {
	// 	primaryColor: '#FFFFFF',
	// 	textColor2: '#FFFFFF'
	// }
}
let theme = ref<GlobalTheme | null>(isDark() ? darkTheme : null)

// 监听主题变化
const observer = new MutationObserver(() => {
	theme.value = isDark() ? darkTheme : null
})
observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
</script>
