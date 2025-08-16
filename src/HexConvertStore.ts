import { readonly, ref } from 'vue'


const text = ref<string>()
const result = ref<string>()
const isHex = ref<boolean>()
const formatedHexString = ref<string>()
const resultByteCount = ref<number>()

const useHexConvertStore = () => {

	const setText = (selectedText: string) => {
		text.value = selectedText
		result.value = Convert(selectedText)
	}
	return {
		setText,
		text: readonly(text),
		result: readonly(result),
		isHex: readonly(isHex),
		formatedHexString: formatedHexString,
		resultByteCount: readonly(resultByteCount)
	}
}

export default useHexConvertStore;

function Convert(text: string): string {
	// 判断是否为 Hex 字符串（包含空格和制表符）
	const isHexWithSpacesOrTabs = /^[0-9a-fA-F\s\t]+$/.test(text);

	isHex.value = isHexWithSpacesOrTabs

	if (!isHexWithSpacesOrTabs) {
		resultByteCount.value = text.length
		// 不是 Hex 字符串，直接转为 Hex 字符串，以空格分隔每个字节
		return [...text]
			.map((char) => char.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0'))
			.join(" ");
	} else {
		// 从 text 中提取所有十六进制字符（去掉空格、制表符等）
		const hexString = text.replace(/\s+/g, "");

		// 判断长度是否是 2 的倍数，如果是，则每 2 个字符转成一个字节
		if (hexString.length % 2 !== 0) {
			return ""
		}
		resultByteCount.value = hexString.length / 2;
		// 将十六进制字符串每两个字符转换成一个字节
		const hexPairs = hexString.match(/.{2}/g); // 每两个字符匹配一次
		if (hexPairs == null) return "";
		formatedHexString.value = hexPairs.join(" ");
		// 将字节转换为 ASCII 字符，并特殊处理 0A 和 0D
		return hexPairs
			.map((hex) => {
				const decimal = parseInt(hex, 16);
				switch (decimal) {
					case 10: // 0A -> "\n"
						return "\\n";
					case 13: // 0D -> "\r"
						return "\\r";
					default:
						return String.fromCharCode(decimal);
				}
			})
			.join("");
	}
}
