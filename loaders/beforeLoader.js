const loaderUtils = require("loader-utils")

module.exports = function (context) {
    let options = loaderUtils.getOptions(this)
    if (options.before) {
        let before = options.before
        return(`        
            import { before } from "${before.split("\\").join("\\\\")}"
            ${context}
        `)
    }
    return context
   
}