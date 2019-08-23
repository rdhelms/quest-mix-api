import * as Parse from 'parse/node'

Parse.Cloud.define('threadTest', (request) => {
    console.log('called')
    for (let x = 0; x < 1000000; x++) {
        console.log(x)
    }
    console.log('done')
})
