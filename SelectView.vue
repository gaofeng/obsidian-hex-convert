<template>
	<div id="container">
		<n-config-provider :theme-overrides="themeOverrides">
			<n-space vertical>
				<div>选中内容</div>
				<n-input v-model:value="store.text" readonly />
				<div>转换结果</div>
				<n-input
					v-model:value="store.result"
					type="textarea"
					readonly
				/>
			</n-space>
		</n-config-provider>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { darkTheme } from "naive-ui";
import type { GlobalTheme, GlobalThemeOverrides } from "naive-ui";
import { store } from "./store";

function getDefaultColor() {
	let button = document.body.createEl("button", {
		cls: "mod-cta",
		attr: { style: "width: 0px; height: 0px;" },
	});
	let color = getComputedStyle(button, null).getPropertyValue(
		"background-color"
	);
	button.remove();
	return color;
}
var color = getDefaultColor();
const newPrimaryColor = getComputedStyle(
	document.documentElement
).getPropertyValue("--background-primary");
const themeOverrides: GlobalThemeOverrides = {
	common: {
		primaryColor: "#442200",
	},
	Button: {
		textColor: "#FFFF00",
	},
	Card: {
		color: newPrimaryColor,
	},
};
</script>
