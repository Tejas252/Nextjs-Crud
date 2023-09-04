import { NextResponse } from "next/server"
import {createEdgeRouter, nextConnect} from "next-connect"
import multer from "multer";

export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
  };
    
        const upload = multer({
            storage: multer.diskStorage({
              destination: './public/upload',
              filename: (req, file, cb) => {
                console.log('hell0-1')
                console.log("🚀 ~ file: route.jsx:11 ~ file:", file)
                cb(null, file.originalname)
            },
            }),
          });

        const apiRoutes = createEdgeRouter()

        // const uploadMiddleware = 
        apiRoutes.use(async() =>{
            console.log('hell0-2')
            upload.single('image')
            console.log('hell0-3')}
            )

        apiRoutes.all(async () => {
                return NextResponse.json({ success: true })
        })

        // export default apiRoutes.handler({
        //     onError: (err, req, event) => {
        //       console.error(err.stack);
        //       return new NextResponse("Something broke!", {
        //         status: err.statusCode || 500,
        //       });
        //     },
        //   });
export  async function POST(request){
        return apiRoutes.run(request)
}

