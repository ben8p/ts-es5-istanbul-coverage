module.exports = function tsEs5IstanbulCoverage(content) {
	return content.replace(/(\|\| this;)/g, '/* istanbul ignore next */$1');
};
