// import { RequestHandler } from 'express'
// import fs from 'fs'

// export const stream: RequestHandler = (req, res) => {
//     function readBytes (fd: number , sharedBuffer: Buffer) {
//         return new Promise((resolve, reject) => {
//             fs.read(
//                 fd, 
//                 sharedBuffer,
//                 0,
//                 sharedBuffer.length,
//                 null,
//                 (err) => {
//                     if (err) { return reject(err) }
//                     resolve(true)
//                 }
//             )
//         })
//     }
    
//     async function* generateChunks (filePath: string, size: number) {
//         const sharedBuffer = Buffer.alloc(size)
//         const stats = fs.statSync(filePath) // file details
//         const fd = fs.openSync(filePath, 'r') // file descriptor
//         let bytesRead = 0 // how many bytes were read
//         let end = size 
        
//         for (let i = 0; i < Math.ceil(stats.size / size); i++) {
//             await readBytes(fd, sharedBuffer)
//             bytesRead = (i + 1) * size
//             if (bytesRead > stats.size) {
//                 // When we reach the end of file, 
//                 // we have to calculate how many bytes were actually read
//                 end = size - (bytesRead - stats.size)
//             }
//             yield sharedBuffer.slice(0, end)
//         }
//     }

//     const CHUNK_SIZE = 10000000 // 10MB
//     async function main (filePath: string) {  
//         const chunks = generateChunks(filePath, CHUNK_SIZE)
//         for await (const chunk of chunks) {
//             res.write(chunk)
//         }
//     }

//     main('./50mb.txt')
// }
