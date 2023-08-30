// // import multer from 'multer';


// // export async function POST(request) {
    
// // console.log("hello")
// // const storage = await  multer.diskStorage({
// //     destination: function (req, file, cb) {
// //         cb(null, '/images')
// //     },
// //     filename: function (req, file, cb) {
// //         cb(null, file.originalname)
// //     }
// // })
// // console.log("hello")

// // const upload = await multer({ storage: storage }).single('image');

// // console.log("hello")
// // // uploading image 
// // upload(request)
// // console.log("hello")
// // return
// // }

// import {createEdgeRouter} from 'next-connect';
// import multer from 'multer';
// import path from 'path';

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: path.join(process.cwd(),'/public/uploads'),
//     filename: (req, file, cb) => cb(null, file.originalname),
//   }),
// });

// const apiRoute = createEdgeRouter()


// // nextConnect({
// //   onError(error, req, res) {
// //     res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
// //   },
// //   onNoMatch(req, res) {
// //     res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
// //   },
// // })
// apiRoute
// .use(upload.single('file'))
// .post((req, res) => {
//   res.status(200).json({ data: 'success' });
// });

// export default apiRoute.handler({
//     onError: (err, req, event) => {
//       console.error(err.stack);
//       return new NextResponse("Something broke!", {
//         status: err.statusCode || 500,
//       });
//     },
//   });

// export const config = {
//     api: {
//         bodyParser: false, // Disallow body parsing, consume as stream
//     },
// };





export default async function POST(){{
    
}}