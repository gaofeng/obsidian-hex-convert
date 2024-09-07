<template>
	<div id="container">
		<n-config-provider :theme="theme">
			<n-card>
				<n-space>
					<n-button type="primary" @click="theme = darkTheme">
						深色
					</n-button>
					<n-button type="success" @click="theme = null">
						浅色
					</n-button>
				</n-space>
			</n-card>
			<n-card title="选中内容">
				{{ store.text }}
			</n-card>
			<n-input v-model:value="store.text" type="text" placeholder="选中内容" />
		</n-config-provider>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { darkTheme } from "naive-ui";
import type { GlobalTheme } from "naive-ui";
import { store } from "./store";

const theme = ref<GlobalTheme | null>(null);
</script>

<style></style>
