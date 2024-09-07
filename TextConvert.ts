
export function Convert(text: string): string {
	// 判断是否为 Hex 字符串（包含空格和制表符）
	const isHexWithSpacesOrTabs = /^[0-9a-fA-F\s\t]+$/.test(text);
  
	if (!isHexWithSpacesOrTabs) {
	  // 不是 Hex 字符串，直接转为 Hex 字符串，以空格分隔每个字节
	  return text.split('').map(char => char.charCodeAt(0).toString(16).toUpperCase()).join(' ');
	} else {
	  // 是 Hex 字符串，以空格或制表符分割
	  const hexPairs = text.split(/\s+/).map(hex => {
		// 如果长度大于 2，则每两个字符作为一个字节
		if (hex.length > 2) {
		  return hex.match(/../g) || [];
		} else {
		  return [hex];
		}
	  });
  
	  // 展平数组并转换为 ASCII 字符，特殊处理 0A 和 0D
	  return hexPairs.flat().map(hex => {
		const decimal = parseInt(hex, 16);
		switch (decimal) {
		  case 10:
			return '\\n';
		  case 13:
			return '\\r';
		  default:
			return String.fromCharCode(decimal);
		}
	  }).join('');
	}
  }
