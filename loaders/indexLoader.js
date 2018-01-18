const loaderUtils = require("loader-utils")

module.exports = function (content) {
    let options = loaderUtils.getOptions(this)
    let additionalContent = ""
    if (options.before) {
        additionalContent += `import { before } from "${options.before.split("\\").join("\\\\")}"\n`
    }
    if (options.styles) {
        let styleImports = ""
        options.styles.forEach(item => {
            styleImports += `import "${item.split("\\").join("\\\\")}"\n`
        })
        additionalContent += styleImports 
    }
    return `${additionalContent}\n${content}` 
   
}