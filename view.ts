import { ItemView, WorkspaceLeaf } from "obsidian";
import { App, createApp } from "vue";
import SelectView from "SelectView.vue";
import { create, NButton, NCard, NConfigProvider, NInput, NSpace } from "naive-ui";

export const VIEW_TYPE_EXAMPLE = "example-view";

export class ExampleView extends ItemView {
	vueApp: App;
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return VIEW_TYPE_EXAMPLE;
	}

	getDisplayText() {
		return "Example view 高峰";
	}

	async onOpen() {
		const container = this.containerEl.children[1];
		container.empty();
		const mountPoint = container.createEl("div", {
			cls: "quiet-outline",
		});
		const naive = create({
			components: [NButton, NSpace, NConfigProvider, NCard , NInput],
		  })
		this.vueApp = createApp(SelectView);
		this.vueApp.use(naive)
		this.vueApp.mount(mountPoint);
	}

	async onClose() {
		// Nothing to clean up.
	}

	onunload(): void {
		this.vueApp.unmount();
	}
}
