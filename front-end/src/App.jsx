import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import OurParish from "./components/OurParish";
import Anbiyangal from "./components/Anbiyangal";
import SpecialGallery from "./components/Videos";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Footer from "./components/Footer";
import ImageCategory from "./components/ImageCategory";
import Videos from "./components/Videos";
import AdminLogin from "./components/admin/AdminLogin";
import AdminAddImages from "./components/AdminAddImages";
import Feb from "./components/All-images/Feb";
import March from "./components/All-images/March";
import April from "./components/All-images/April";
import June from "./components/All-images/June";
import July from "./components/All-images/July";
import August from "./components/All-images/August";
import September from "./components/All-images/September";
import October from "./components/All-images/October";
import December from "./components/All-images/December";
import November from "./components/All-images/November";
import January from "./components/All-images/January";
import May from "./components/All-images/May";

import Festival from "./components/Festival";
import Body from "./components/Body";
import One from "./components/participative-structures/One";
import Two from "./components/participative-structures/Two";
import Three from "./components/participative-structures/Three";
import Four from "./components/participative-structures/Four";
import Five from "./components/participative-structures/Five";
import Service from "./components/Service";
import HistoryDetails from "./components/HistoryDetails";
import About from "./components/About";
import OldPriest from "./components/OldPriest";
import AnbiyamCoordination from "./components/AnbiyamCoordination";
import TKOne from "./components/participative-structures/tk/TKOne";
import TKTwo from "./components/participative-structures/tk/TKTwo";
import TKThree from "./components/participative-structures/tk/Three";
import OAOne from "./components/participative-structures/oa/OAOne";
import OATwo from "./components/participative-structures/oa/OATwo";
import OAThree from "./components/participative-structures/oa/OAThree";
import OAFour from "./components/participative-structures/oa/OAFour";
import OAFive from "./components/participative-structures/oa/OAFive";
import OASix from "./components/participative-structures/oa/OASix";
import OASeven from "./components/participative-structures/oa/OASeven";
import OAEight from "./components/participative-structures/oa/OAEight";

import SAOne from "./components/participative-structures/sa/SAOne";
import SATwo from "./components/participative-structures/sa/SATwo";
import SAThree from "./components/participative-structures/sa/SAThree";
import SAFour from "./components/participative-structures/sa/SAFour";
import VAOne from "./components/participative-structures/va/VAOne";
import VATwo from "./components/participative-structures/va/VATwo";
import VAThree from "./components/participative-structures/va/VAThree";
import HeartConvent from "./components/HeartConvent";
import Auditorium from "./components/Auditorium";
import Substation from "./components/Substation";
import VissionandMission from "./components/VissionandMission";
import Announcement from "./components/Announcement";
import AdminsDash from "./components/admin/AdminAnnouncement";
import AdminVideos from "./components/admin/AdminVideos";
import AdminImageUpload from "./components/admin/AdminImageUpload";
import AdminEventUpload from "./components/admin/AdminEventUpload";
import AdminDashBoard from "./components/admin/AdminDashBoard";
import AdminAnnouncement from "./components/admin/AdminAnnouncement";
import PrivateRoute from "./components/admin/PrivateRoute";
import AdminFestivalImages from "./components/admin/AdminFestivalImages";
import AdminHeartConvent from "./components/admin/AdminHeartConvent";
import AdminOldPriest from "./components/admin/AdminOldPriest";
import AdminParish from "./components/admin/AdminParish";
import AdminTiming from "./components/admin/AdminTiming";
import AdminAnbiyamCoordination from "./components/admin/AdminAnbiyamCoordination";
import AdminVideoLink from "./components/admin/AdminVideoLink";
import AdminImgLinkUpload from "./components/admin/AdminImgLinkUpload";
import AdminPresident from "./components/admin/AdminPresident";
import AdminFamily from "./components/admin/AdminFamily";
import AdminAnbiyangal from "./components/admin/AdminAnbiyangal";


function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-K5ME5WWLWC', {
        page_path: location.pathname,
      });
    }
  }, [location]);
  

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Home */}
        <Route path="/heart-convent" element={<HeartConvent />} />
        <Route path="/vission-mission" element={<VissionandMission />} />
        <Route path="/announcements" element={<Announcement />} />

        <Route path="/auditorium" element={<Auditorium />} />
        <Route path="/substation" element={<Substation />} />
        <Route path="/admin-product" element={<AdminAddImages />} />
        
        <Route path="/ourparish" element={<OurParish />} />
        <Route path="/anbiyam" element={<Anbiyangal />} />
        <Route path="/special-gallery" element={<SpecialGallery />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/images-category" element={<ImageCategory />} />
        <Route path="/jan" element={<January />} />
        <Route path="/feb" element={<Feb />} />
        <Route path="/march" element={<March />} />
        <Route path="/april" element={<April />} />
        <Route path="/may" element={<May />} />
        <Route path="/june" element={<June />} />
        <Route path="/july" element={<July />} />
        <Route path="/august" element={<August />} />
        <Route path="/sept" element={<September />} />
        <Route path="/oct" element={<October />} />
        <Route path="/nov" element={<November/>} />
        <Route path="/dec" element={<December/>} />
        <Route path="/festival" element={<Festival />} />
        <Route path="/gallery" element={<Body />} />
        <Route path="/one" element={<One />} />
        <Route path="/two" element={<Two />} />
        <Route path="/three" element={<Three />} />
        <Route path="/four" element={<Four />} />
        <Route path="/five" element={<Five />} />
        <Route path="/service" element={<Service />} />
        <Route path="/history-details" element={<HistoryDetails />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/old-priest" element={<OldPriest />}/>
        <Route path="/anbiyam-co" element={<AnbiyamCoordination />}/>

        {/* திருத்தூதர்கள் சங்கங்கள் */}
        <Route path="/மரியாவின் சேனை" element={<TKOne />}/>
        <Route path="/வின்சென்ட் தெ பால் சங்கம்" element={<TKTwo />}/>
        <Route path="/கத்தோலிக்க சேவா சங்கம்" element={<TKThree/>}/>

        {/* உருவாக்க அமைப்புகள் */}
        <Route path="/பாலர் சபை" element={<OAOne />}/>
        <Route path="/சிறார் இயக்கம்" element={<OATwo />}/>
        <Route path="/இளம் கிறித்தவ மாணாக்கர் இயக்கம்" element={<OAThree/>}/>
        <Route path="/இளையோர் இயக்கம்" element={<OAFour/>}/>
        <Route path="/இளையோர் இயக்கம் ( பெண்கள்)" element={<OAFive/>}/>
        <Route path="/பெண்கள் இயக்கம்" element={<OASix/>}/>
        <Route path="/விவிலியப் பணிக்குழு" element={<OASeven/>}/>
        <Route path="/கிறிஸ்தவ தொழிலாளர் இயக்கம்" element={<OAEight/>}/>


        {/* சேவை அமைப்புகள்  */}
        <Route path="/பெண்கள் கிராம முன்னேற்றச் சங்கம்" element={<SAOne />}/>
         <Route path="/கோல்பிங்  இயக்கம்" element={<SATwo/>}/>
          <Route path="/கைகள் தன்னம்பிக்கை இயக்கம்" element={< SAThree/>}/>
            <Route path="/அடித்தள முழுவளர்ச்சி சங்கம்" element={<SAFour />}/>


              <Route path="/வழிபாட்டுக் குழு" element={< VAOne/>}/>
                <Route path="/பாடகர் குழு" element={< VATwo/>}/>
                  <Route path="/பீடச்சிறார்" element={< VAThree/>}/>
        {/* Admin Dash */}
        {/* <Route path="/admin" element={<AdminLogin />} /> */}
        <Route path="/admin" element={<AdminLogin />} />
        {/* <Route path="/admin-dash" element={< AdminDashBoard/>}/>
        <Route path="/add-announcement" element={<AdminAnnouncement />} />

        <Route path="/add-images" element={<AdminImageUpload />} />
        <Route path="/add-videos" element={<AdminVideos />} /> */}

<Route
  path="/admin-dash"
  element={
    <PrivateRoute>
      <AdminDashBoard />
    </PrivateRoute>
  }
/>

<Route
  path="/add-announcement"
  element={
    <PrivateRoute>
      <AdminAnnouncement />
    </PrivateRoute>
  }
/>

<Route
  path="/add-images"
  element={
    <PrivateRoute>
      <AdminImageUpload />
    </PrivateRoute>
  }
/>

<Route
  path="/add-videos"
  element={
    <PrivateRoute>
      <AdminVideos />
    </PrivateRoute>
  }
/>
<Route
  path="/add-events"
  element={
    <PrivateRoute>
      <AdminEventUpload />
    </PrivateRoute>
  }
/>

<Route
  path="/add-festivals"
  element={
    <PrivateRoute>
      <AdminFestivalImages />
     
    </PrivateRoute>
  }
/>
<Route
  path="/add-heart-convent"
  element={
    <PrivateRoute>
      <AdminHeartConvent/>
     
    </PrivateRoute>
  }
/>



<Route
  path="/add-priest"
  element={
    <PrivateRoute>
      <AdminOldPriest/>
     
    </PrivateRoute>
  }
/>

<Route
  path="/add-ourparish"
  element={
    <PrivateRoute>
      <AdminParish/>
     
    </PrivateRoute>
  }
/>
<Route
  path="/add-parish-coordination"
  element={
    <PrivateRoute>
      <AdminAnbiyamCoordination/>
     
    </PrivateRoute>
  }
/>

<Route
  path="/add-time"
  element={
    <PrivateRoute>
      <AdminTiming />
     
    </PrivateRoute>
  }
/>

<Route
  path="/add-imagLink"
  element={
    <PrivateRoute>
      < AdminImgLinkUpload/>
     
    </PrivateRoute>
  }
/>

<Route
  path="/add-videoLink"
  element={
    <PrivateRoute>
      < AdminVideoLink/>
     
    </PrivateRoute>
  }
/>

<Route
  path="/add-adminfaminly-number"
  element={
    <PrivateRoute>
      < AdminFamily/>
     
    </PrivateRoute>
  }
/>

<Route
  path="/add-president"
  element={
    <PrivateRoute>
      < AdminPresident/>
     
    </PrivateRoute>
  }
/>
<Route
  path="/add-adminanbiyangal"
  element={
    <PrivateRoute>
      < AdminAnbiyangal/>
     
    </PrivateRoute>
  }
/>

      </Routes>
      <Footer />
    </>
  );
}

export default App;


