import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import { Toaster } from 'react-hot-toast';
import StyledComponentsRegistry from '@/helpers/antdRegistery';



export const metadata = {
  title: 'Home Page',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body >
      {/* <Image src='/test2.webp'
          // width={500}
          // height={500}
          fill
          overlay
        /> */}
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        {/* {children} */}
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </body>
    </html>
  )
}