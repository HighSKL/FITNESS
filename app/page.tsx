import Image from 'next/image'
import styles from './page.module.css'
import LandingPage from './landingPage/LandingPage'

const data = {
  user: null
}

export default function Home() {
  return (
    <div>
      {!data.user&&<LandingPage/>}
    </div>
  )
}
