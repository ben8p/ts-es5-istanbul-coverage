module.exports = function tsEs5IstanbulCoverage(content) {
	return content
		.replace(/(\|\| this;)/g, '/* istanbul ignore next */$1')
		.replace(/(return _this;)([\n\r]+\s+)(var .*?;)/g, '$3$2$1')
		.replace(/(return (_[a-zA-Z0-9]+))((?:.|[\n\r])*)(var \2;)/g, '$4$1$3')
		.replace(/(for \(var _i = 0; _i < arguments\.length; _i\+\+\) \{)/g, '$1/* istanbul ignore next */');
};
