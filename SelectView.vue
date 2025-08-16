<template>
	<div id="container">
		<n-config-provider :theme="theme">
			<n-space vertical>
				<div>选中内容</div>
				<n-input v-model:value="hexStore.text" readonly />
				<div>转换结果</div>
				<n-input v-model:value="hexStore.result" type="textarea" readonly />
			</n-space>
			<n-button @click="onButtonClick">Test</n-button>
		</n-config-provider>
	</div>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import { darkTheme } from "naive-ui";
import type { GlobalTheme } from "naive-ui";
import useHexConvertStore from "HexConvertStore";

const hexStore = useHexConvertStore()

const handleButton = inject<(data: string) => void>('handleButton');

const onButtonClick = () => {
  if (handleButton) {
    // 调用注入的方法
    handleButton('Hello from Vue!');
  }
};

// 检查 Obsidian 当前主题
function isDark() {
	return document.body.classList.contains('theme-dark')
}
let theme = ref<GlobalTheme | null>(isDark() ? darkTheme : null)

// 监听主题变化
const observer = new MutationObserver(() => {
	theme.value = isDark() ? darkTheme : null
})
observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
</script>
