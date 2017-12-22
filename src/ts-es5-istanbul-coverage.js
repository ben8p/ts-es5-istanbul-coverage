module.exports = function tsEs5IstanbulCoverage(content) {
	return content
		.replace(/(\|\| this;)/g, '/* istanbul ignore next */$1')
		.replace(/(return _this;)([\n\r]+\s+)(var .*?;)/g, '$3$2$1');
};
