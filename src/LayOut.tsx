import React, { ReactNode } from 'react'
import NonAuthNavBar from './components/navbar/NonAuthNavBar'
import Footer from './components/footer/Footer'

export default function LayOut({ children }: { children: ReactNode }) {
    return (
        <main>
            <NonAuthNavBar />

            <div>  {children}</div>
  <Footer/>
        </main>
    )
}
