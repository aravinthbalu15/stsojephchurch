import React from 'react';
import '../Style/Anbiyangal.css';
import { Container, Row, Col } from 'react-bootstrap';
import Image1 from "../images/all-soul/1.png";
import Image2 from "../images/all-soul/2.png";
import Image3 from "../images/all-soul/3.png";
import Image4 from "../images/all-soul/image.png"; // Rectangular Image
import Image5 from "../images/jenish.jpeg";



const member1 = [
 
];

const Anbiyangal = () => {
return (
<>





{/* anbiyangal-1 */}
<Container className="anbiyangal-container mt-5 ">
<h1 className="section-title">அன்பியம்-1</h1>
<p className="section-subtitle text-center">புனித சூசையப்பர் அன்பியம்</p>
<Row className="align-items-center">
{/* Left Side - Three Circular Images (Mobile: Second, Desktop: First) */}
<Col md={6} className="d-flex flex-column align-items-start gap-4 left-side order-1 order-md-0">
{/* ... circular images content ... */}
<div className="image-box d-flex align-items-center">
<img src={Image1} alt="Image 1" className="circle-img" />
<div className="text-content">
<h1 className="image-title">தலைவர்</h1>
<p className="image-desc">தலைவர்</p>
</div>
</div>
<div className="image-box d-flex align-items-center">
<img src={Image2} alt="Image 2" className="circle-img" />
<div className="text-content">
<h1 className="image-title">செயலாளர்</h1>
<p className="image-desc">செயலாளர்</p>
</div>
</div>
<div className="image-box d-flex align-items-center">
<img src={Image3} alt="Image 3" className="circle-img" />
<div className="text-content">

<h1 className="image-title">பொருளாளர்</h1>
              <p className="image-desc">பொருளாளர்</p>
</div>
</div>
</Col>

{/* Right Side - Rectangular Image (Mobile: First, Desktop: Second) */}
<Col md={6} className="d-flex flex-column align-items-start text-left right-side order-0 order-md-1">
{/* ... rectangular image content ... */}
<img src={Image4} alt="Rectangular Image" className="rect-img " />
<h1 className="rect-title">Main Heading</h1>
<p className="rect-desc">This is the detailed description for the rectangular image. It provides more information about the content displayed.</p>
</Col>
</Row>
</Container>

{/* anbiyangal-2 */}

<Container className="anbiyangal-container2">
<h1 className="section-title">அன்பியம்-2</h1>
<p className="section-subtitle text-center">சதா சகாய மாதா அன்பியம்</p>
<Row className="align-items-center">
{/* Left Side - Three Circular Images (Mobile: Second, Desktop: First) */}
<Col md={6} className="d-flex flex-column align-items-start gap-4 left-side order-1 order-md-0">
{/* ... circular images content ... */}
<div className="image-box d-flex align-items-center">
<img src={Image1} alt="Image 1" className="circle-img" />
<div className="text-content">
<h1 className="image-title">தலைவர்</h1>
<p className="image-desc">This is the description for Image 1.</p>
</div>
</div>
<div className="image-box d-flex align-items-center">
<img src={Image2} alt="Image 2" className="circle-img" />
<div className="text-content">
<h1 className="image-title">செயலாளர்</h1>
<p className="image-desc">This is the description for Image 2.</p>
</div>
</div>
<div className="image-box d-flex align-items-center">
<img src={Image3} alt="Image 3" className="circle-img" />
<div className="text-content">
<h1 className="image-title">பொருளாளர்</h1>
<p className="image-desc">This is the description for Image 3.</p>
</div>
</div>
</Col>

{/* Right Side - Rectangular Image (Mobile: First, Desktop: Second) */}
<Col md={6} className="d-flex flex-column align-items-start text-left right-side order-0 order-md-1">
{/* ... rectangular image content ... */}
<img src={Image4} alt="Rectangular Image" className="rect-img" />
<h1 className="rect-title">Main Heading</h1>
<p className="rect-desc">This is the detailed description for the rectangular image. It provides more information about the content displayed.</p>
</Col>
</Row>
</Container>
{/* anbiyangal-3 */}
<Container className="anbiyangal-container3">
<h1 className="section-title">அன்பியம்-3</h1>
<p className="section-subtitle text-center">விண்ணரசி அன்பியம்</p>
<Row className="align-items-center">
{/* Left Side - Three Circular Images (Mobile: Second, Desktop: First) */}
<Col md={6} className="d-flex flex-column align-items-start gap-4 left-side order-1 order-md-0">
{/* ... circular images content ... */}
<div className="image-box d-flex align-items-center">
<img src={Image1} alt="Image 1" className="circle-img" />
<div className="text-content">
<h1 className="image-title">தலைவர்</h1>
<p className="image-desc">This is the description for Image 1.</p>
</div>
</div>
<div className="image-box d-flex align-items-center">
<img src={Image2} alt="Image 2" className="circle-img" />
<div className="text-content">
<h1 className="image-title">செயலாளர்</h1>
<p className="image-desc">This is the description for Image 2.</p>
</div>
</div>
<div className="image-box d-flex align-items-center">
<img src={Image3} alt="Image 3" className="circle-img" />
<div className="text-content">
<h1 className="image-title">பொருளாளர்</h1>
<p className="image-desc">This is the description for Image 3.</p>
</div>
</div>
</Col>

{/* Right Side - Rectangular Image (Mobile: First, Desktop: Second) */}
<Col md={6} className="d-flex flex-column align-items-start text-left right-side order-0 order-md-1">
{/* ... rectangular image content ... */}
<img src={Image4} alt="Rectangular Image" className="rect-img" />
<h1 className="rect-title">Main Heading</h1>
<p className="rect-desc">This is the detailed description for the rectangular image. It provides more information about the content displayed.</p>
</Col>
</Row>
</Container>
{/* anbiyangal-4 */}
<Container className="anbiyangal-container4">
<h1 className="section-title">அன்பியம்-4</h1>
<p className="section-subtitle text-center">குழந்தை இயேசு அன்பியம்</p>

<Row className="align-items-center">
{/* Left Side - Three Circular Images (Mobile: Second, Desktop: First) */}
<Col md={6} className="d-flex flex-column align-items-start gap-4 left-side order-1 order-md-0">
{/* ... circular images content ... */}
<div className="image-box d-flex align-items-center">
<img src={Image1} alt="Image 1" className="circle-img" />
<div className="text-content">
<h1 className="image-title">தலைவர்</h1>
<p className="image-desc">This is the description for Image 1.</p>
</div>
</div>
<div className="image-box d-flex align-items-center">
<img src={Image2} alt="Image 2" className="circle-img" />
<div className="text-content">
<h1 className="image-title">செயலாளர்</h1>
<p className="image-desc">This is the description for Image 2.</p>
</div>
</div>
<div className="image-box d-flex align-items-center">
<img src={Image3} alt="Image 3" className="circle-img" />
<div className="text-content">
<h1 className="image-title">பொருளாளர்</h1>
<p className="image-desc">This is the description for Image 3.</p>
</div>
</div>
</Col>

{/* Right Side - Rectangular Image (Mobile: First, Desktop: Second) */}
<Col md={6} className="d-flex flex-column align-items-start text-left right-side order-0 order-md-1">
{/* ... rectangular image content ... */}
<img src={Image4} alt="Rectangular Image" className="rect-img" />
<h1 className="rect-title">Main Heading</h1>
<p className="rect-desc">This is the detailed description for the rectangular image. It provides more information about the content displayed.</p>
</Col>
</Row>
</Container>
{/* anbiyangal-5 */}
<Container className="anbiyangal-container5">
<h1 className="section-title">அன்பியம்-5</h1>
<p className="section-subtitle text-center">அன்னை தெரேசா அன்பியம்</p>
<Row className="align-items-center">
{/* Left Side - Three Circular Images (Mobile: Second, Desktop: First) */}
<Col md={6} className="d-flex flex-column align-items-start gap-4 left-side order-1 order-md-0">
{/* ... circular images content ... */}
<div className="image-box d-flex align-items-center">
<img src={Image1} alt="Image 1" className="circle-img" />
<div className="text-content">
<h1 className="image-title">தலைவர்</h1>
<p className="image-desc">This is the description for Image 1.</p>
</div>
</div>
<div className="image-box d-flex align-items-center">
<img src={Image2} alt="Image 2" className="circle-img" />
<div className="text-content">
<h1 className="image-title">செயலாளர்</h1>
<p className="image-desc">This is the description for Image 2.</p>
</div>
</div>
<div className="image-box d-flex align-items-center">
<img src={Image3} alt="Image 3" className="circle-img" />
<div className="text-content">
<h1 className="image-title">பொருளாளர்</h1>
<p className="image-desc">This is the description for Image 3.</p>
</div>
</div>
</Col>

{/* Right Side - Rectangular Image (Mobile: First, Desktop: Second) */}
<Col md={6} className="d-flex flex-column align-items-start text-left right-side order-0 order-md-1">
{/* ... rectangular image content ... */}
<img src={Image4} alt="Rectangular Image" className="rect-img" />
<h1 className="rect-title">Main Heading</h1>
<p className="rect-desc">This is the detailed description for the rectangular image. It provides more information about the content displayed.</p>
</Col>
</Row>
</Container>
{/* anbiyangal-6 */}
<Container className="anbiyangal-container6">
<h1 className="section-title">அன்பியம்-6</h1>
<p className="section-subtitle text-center">புனித பிரான்சிஸ் சவேரியார் அன்பியம்</p>
<Row className="align-items-center">
{/* Left Side - Three Circular Images (Mobile: Second, Desktop: First) */}
<Col md={6} className="d-flex flex-column align-items-start gap-4 left-side order-1 order-md-0">
{/* ... circular images content ... */}
<div className="image-box d-flex align-items-center">
<img src={Image1} alt="Image 1" className="circle-img" />
<div className="text-content">
<h1 className="image-title">தலைவர்</h1>
<p className="image-desc">This is the description for Image 1.</p>
</div>
</div>
<div className="image-box d-flex align-items-center">
<img src={Image2} alt="Image 2" className="circle-img" />
<div className="text-content">
<h1 className="image-title">செயலாளர்</h1>
<p className="image-desc">This is the description for Image 2.</p>
</div>
</div>
<div className="image-box d-flex align-items-center">
<img src={Image3} alt="Image 3" className="circle-img" />
<div className="text-content">
<h1 className="image-title">பொருளாளர்</h1>
<p className="image-desc">This is the description for Image 3.</p>
</div>
</div>
</Col>

{/* Right Side - Rectangular Image (Mobile: First, Desktop: Second) */}
<Col md={6} className="d-flex flex-column align-items-start text-left right-side order-0 order-md-1">
{/* ... rectangular image content ... */}
<img src={Image4} alt="Rectangular Image" className="rect-img" />
<h1 className="rect-title">Main Heading</h1>
<p className="rect-desc">This is the detailed description for the rectangular image. It provides more information about the content displayed.</p>
</Col>
</Row>
</Container>
{/* anbiyangal-7 */}
<Container className="anbiyangal-container7 mb-5">
<h1 className="section-title">அன்பியம்-7</h1>
<p className="section-subtitle text-center">புனித அந்தோணியார் அன்பியம்</p>
<Row className="align-items-center">
{/* Left Side - Three Circular Images (Mobile: Second, Desktop: First) */}
<Col md={6} className="d-flex flex-column align-items-start gap-4 left-side order-1 order-md-0">
{/* ... circular images content ... */}
<div className="image-box d-flex align-items-center">
<img src={Image1} alt="Image 1" className="circle-img" />
<div className="text-content">
<h1 className="image-title">தலைவர்</h1>
<p className="image-desc">தலைவர்</p>
</div>
</div>
<div className="image-box d-flex align-items-center">
<img src={Image2} alt="Image 2" className="circle-img" />
<div className="text-content">
<h1 className="image-title">செயலாளர்</h1>
<p className="image-desc">This is the description for Image 2.</p>
</div>
</div>
<div className="image-box d-flex align-items-center">
<img src={Image3} alt="Image 3" className="circle-img" />
<div className="text-content">
<h1 className="image-title">பொருளாளர்</h1>
<p className="image-desc">This is the description for Image 3.</p>
</div>
</div>
</Col>

{/* Right Side - Rectangular Image (Mobile: First, Desktop: Second) */}
<Col md={6} className="d-flex flex-column align-items-start text-left right-side order-0 order-md-1">
{/* ... rectangular image content ... */}
<img src={Image4} alt="Rectangular Image" className="rect-img" />
<h1 className="rect-title">Main Heading</h1>
<p className="rect-desc">This is the detailed description for the rectangular image. It provides more information about the content displayed.</p>
</Col>
</Row>
</Container>
</>
);
}

export default Anbiyangal;