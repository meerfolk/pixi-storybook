const loaderUtils = require("loader-utils")
const path = require("path")

module.exports = function(content) {
    let importContent = ""
    let declareContent = ""
    const options = loaderUtils.getOptions(this)
    if (options.imports) {
        options.imports.forEach((item, index) => {
            let importAs = `declare_${index}`
            let importFrom = item.split("\\").join("\\\\")
            
            declareContent += `\n${importAs}(mdl)\n`
            importContent += `import { declare as ${importAs} } from "${importFrom}"\n` 
        })
    }
    declareContent = `\nfunction declareAll(mdl) {${declareContent}}\n`
    if (importContent.length > 0) {
        content = importContent + declareContent + content
    }
    return content
}