import { IconName, ItemView, WorkspaceLeaf } from "obsidian";
import { App, createApp } from "vue";
import SelectView from "./SelectView.vue";
import {
	create,
	NButton,
	NCard,
	NConfigProvider,
	NInput,
	NSpace,
} from "naive-ui";

export const VIEW_TYPE_EXAMPLE = "view-hex-convert";

export class ExampleView extends ItemView {
	vueApp: App;
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return VIEW_TYPE_EXAMPLE;
	}

	getIcon(): IconName {
		return "dice";		
	}

	getDisplayText() {
		return "十六进制转换页面";
	}

	async onOpen() {
		const container = this.containerEl.children[1];
		container.empty();
		const mountPoint = container.createEl("div", {
			cls: "hex-convert-mount-point",
		});
		const naive = create({
			components: [NButton, NSpace, NConfigProvider, NCard, NInput],
		});
		this.vueApp = createApp(SelectView);
		this.vueApp.use(naive);
		this.vueApp.provide('handleButton', this.handleButtonClicked.bind(this));
		this.vueApp.mount(mountPoint);
	}

	private handleButtonClicked(data: string) {
        console.log("in view.ts: " + data);
    }

	async onClose() {
		// Nothing to clean up.
	}

	onunload(): void {
		this.vueApp.unmount();
	}
}
