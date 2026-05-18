import { Hero } from '@/components/home/hero'
import { CategoriesShowcase } from '@/components/home/categories'
import { FeaturedTools } from '@/components/home/featured-tools'
import { Benefits } from '@/components/home/benefits'
import { Testimonials } from '@/components/home/testimonials'
import { FAQ } from '@/components/home/faq'
import { CTA } from '@/components/home/cta'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedTools />
      <CategoriesShowcase />
      <Benefits />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  )
}