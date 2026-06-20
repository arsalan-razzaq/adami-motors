import { useEffect } from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { Layout } from '../components'
import {
  About,
  Contact,
  Home,
  NotFound,
  Sell,
  Services,
  VehicleDetail,
  Vehicles,
} from '../pages'

function ScrollReset() {
  const { pathname } = useLocation()

  useEffect(() => {
    scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <ScrollReset />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicles/:id" element={<VehicleDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/sell-your-car" element={<Sell />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
