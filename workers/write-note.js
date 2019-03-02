const fs = require('fs')
const mkdirp = require('make-dir')
const os = require('os')
const moment = require('moment')

const KOUPREY_HOME = `${os.homedir()}/Documents/Kouprey/notes`
const FILE_DATE_FORMAT = 'YYYYMMDD_HHmmss'

console.info(`Kouprey Home: ${KOUPREY_HOME}`)

module.exports = async (e, arg) => {
    const koupreyHomePath = await mkdirp(KOUPREY_HOME)
    console.log(koupreyHomePath)
    console.log('write-note', arg)
    const noteFilePath = `${koupreyHomePath}/${arg.filename}.md`
    const noteResp = fs.writeFileSync(noteFilePath, arg.content)
    console.log(noteResp)
}