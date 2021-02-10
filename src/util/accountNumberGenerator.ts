//TODO: this is a temporary accountNumber generator and should be replaced with better implementation
function generate(){
    const timestamp = +new Date()
    const length = 12
    const ts = timestamp.toString()
    const parts = ts.split( "" ).reverse()
    let id = ""

    for( let i = 0 ;i < length; ++i ) {
        const max = parts.length - 1
        const min = 0
        const index = Math.floor( Math.random() * ( max - min + 1 ) ) + min
        id += parts[index]
    }
    return id
}

export default generate
