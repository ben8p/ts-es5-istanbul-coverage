module.exports = function tsEs5IstanbulCoverage(content) {
	return content.replace(/(return _super !== null)/g, '/* istanbul ignore next */$1');
};
