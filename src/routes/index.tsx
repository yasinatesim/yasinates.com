import { createFileRoute, Link } from '@tanstack/react-router'
import { useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import axios from 'axios'
import xml2js from 'xml2js'
import Hero from '~/components/Home/Hero'
import About from '~/components/Home/About'
import Projects from '~/components/Home/Projects'
import Blogs from '~/components/Home/Blogs'
import Contact from '~/components/Home/Contact'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {

  return (
    <>
      <Hero />

      <About />

      <Projects />

      <Blogs />

      <Contact />


    </>
  )
}
