import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeLayout from './Layouts/HomeLayouts'
import Home from './Pages/Home'
import Footer from '../../carsClient/src/Components/Footer'
import Login from './Pages/Auth/Login'
import RequireAuth from './Components/Auth/RequireAuth'
import CarsList from './Pages/CarsPages/CarsList'
import CarDetail from './Pages/CarsPages/CarDetail'
import UsersList from './Pages/UserPages/UsersList'
import CarOrders from './Pages/CarsPages/CarOrders'
import CarBookDetails from './Pages/CarsPages/CarBookDetails'
import BoatList from './Pages/BoatPages/BoatList'
import BoatDetail from './Pages/BoatPages/BoatDetail'
import BoatOrders from './Pages/BoatPages/BoatOrders'
import BoatBookDetails from './Pages/BoatPages/BoatBookDetails'
import PriestList from './Pages/PriestPages/PriestList'
import PriestDetail from './Pages/PriestPages/PriestDetail'
import PriestOrders from './Pages/PriestPages/PriestOrders'
import PriestBookDetails from './Pages/PriestPages/PriestBookDetail'
import GuiderList from './Pages/GuiderPages/GuiderList'
import GuiderDetail from './Pages/GuiderPages/GuiderDetail'
import GuiderBookDetails from './Pages/GuiderPages/GuiderBookDetail'
import GuiderOrders from './Pages/GuiderPages/GuiderOrders'
import HotelsList from './Pages/HotelPages/HotelsList'
import HotelDetail from './Pages/HotelPages/HotelDetail'
import HotelOrders from './Pages/HotelPages/HotelOrders'
import HotelBookDetail from './Pages/HotelPages/HotelBookDetail'
import DeniedPage from './Pages/Auth/DeniedPage'
import PageNotFound from './Pages/Auth/404Page'
import Profile from './Pages/Auth/Profile'
import GlobalSettingsPage from './Pages/GlobalSettingsPage'
import WebsiteContent from './Pages/WebsiteContent/WebsiteContent'
import AboutContent from './Pages/WebsiteContent/AboutContent'
import ContactContent from './Pages/WebsiteContent/ContactContent'
import TestimonialWebsite from './Pages/WebsiteContent/TestimonialWebsite'
import PlaceContent from './Pages/WebsiteContent/PlacesContent'

const App = () => {
  return (
    <div className='bg-[#F2F2F7] min-h-[100vh]'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/denied' element={<DeniedPage />} />
        <Route path='/*' element={<PageNotFound />} />
        <Route element={<RequireAuth allowedRoles={['ADMIN']} />} >
          <Route path='/' element={<Home />} />
          <Route path='/profile/:fullName' element={<Profile />} />
          <Route path='/global-settings' element={<GlobalSettingsPage />} />
          <Route path='/website-content' element={<WebsiteContent />} />
          <Route path='/website-content/about' element={<AboutContent />} />
          <Route path='/website-content/contact' element={<ContactContent />} />
          <Route path='/website-content/testimonial' element={<TestimonialWebsite />} />
          <Route path='/website-content/places' element={<PlaceContent />} />
          <Route path='/car-list' element={<CarsList />} />
          <Route path='/driver/:id' element={<CarDetail />} />
          <Route path='/boat/:id' element={<BoatDetail />} />
          <Route path='/priest/:id' element={<PriestDetail />} />
          <Route path='/guider/:id' element={<GuiderDetail />} />
          <Route path='/hotel/:id' element={<HotelDetail />} />
          <Route path='/book-detail/:id' element={<CarBookDetails />} />
          <Route path='/boat-book-detail/:id' element={<BoatBookDetails />} />
          <Route path='/priest-book-detail/:id' element={<PriestBookDetails />} />
          <Route path='/guider-book-detail/:id' element={<GuiderBookDetails />} />
          <Route path='/hotel-book-detail/:id' element={<HotelBookDetail />} />
          <Route path='/car-booking' element={<CarOrders />} />
          <Route path='/boat-booking' element={<BoatOrders />} />
          <Route path='/priest-booking' element={<PriestOrders />} />
          <Route path='/guider-booking' element={<GuiderOrders />} />
          <Route path='/hotel-booking' element={<HotelOrders />} />
          <Route path='/users-list' element={<UsersList />} />
          <Route path='/boatman-list' element={<BoatList />} />
          <Route path='/priest-list' element={<PriestList />} />
          <Route path='/guider-list' element={<GuiderList />} />
          <Route path='/hotels-list' element={<HotelsList />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App
