import React from "react"
import GreetingBlock from "./Sections/GreetingBlock"
import { Catalogs } from "./Sections/Catalogs"
import FirstBlock from "./Sections/FirstBlock"
import OurServices from "./Sections/OurServices"

export const Home = () => {
  return (
    <main>
      <FirstBlock />
      <GreetingBlock />
      <Catalogs />
      <OurServices />
    </main>
  )
}

export default Home
