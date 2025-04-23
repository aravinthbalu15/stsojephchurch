import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from "../images/mission-vission/image.png"
import "../Style/VissionandMission.css"

const VissionandMission = () => {
  return (
    <div className='mission'>
      <div style={{ fontFamily: 'Segoe UI, sans-serif', background: '#f9f9f9' }}>
        {/* Full-width rectangular image */}
        <div className="w-100 mt-5">
          <img
            src={Image}
            alt="Church Vision and Mission"
            className="img-fluid w-100"
            style={{ height: '500px', objectFit: 'cover' }}
          />
        </div>

        <div className="container py-5">
          <div className="text-center mb-4">
            <h1 className="fw-bold" style={{ color: '#2c3e50' }}>விருதுவாக்கு (motto)</h1>
            <h4 className="fw-bold" style={{ color: '#2c3e50' }}>"கிறிஸ்துவில் நிறைவாழ்வு சமூகமாக".</h4>

            <p className="text-muted fst-italic">"Fullness of life community in Christ" <br />
            <span className="text-dark">இலட்சியப் பார்வை:<br />
            </span>
              <span className="text-dark">ஆழ்ந்த இறையனுபவமும், பூவுலகில் இறையாட்சி மலர்ந்திட உழைக்கும் சமுதாய அர்ப்பணமும் மிக்க "நிறைவாழ்வு சமூகமாக" உருவாதல்.
              </span>
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-primary fw-semibold">Vision:</h3>
            <p className="fs-5">
              Becoming a “fullness of life community” with deep God-experience and social commitment
              to work for the coming of the Kingdom of God on earth.
              <br />
              {/* <span className="text-dark">ஆழ்ந்த தெய்வ அனுபவத்துடன் மற்றும் சமூகப் பொறுப்புணர்வுடன், கடவுளின் அரசை நிலவில் உருவாக்க உறுதியாக செயல்படும் பரிபூரண வாழ்வு சமூகமாக மாறுதல்.</span> */}
            </p>
          </div>

          <div>
            <h3 className="text-primary fw-semibold">பணியற்பணம் :(mission)</h3>
            <ol className="fs-5">
              
              <li>பங்கின் அனைத்து வழிபாடு, குழு மற்றும் சமூக நிகழ்வுகளிலும் செயல்பாடுகளிலும் மக்களின் உயர்ந்தபட்ச பங்கேற்பினை வளர்த்தல்.
                <br />
                <span className="text-dark">(improving maximum participation in all the liturgical, group and social events and activities of the parish.)</span>
              </li>
              <li>ஆழ்ந்த அருள்வாழ்வில் "அப்பா" அனுபவத்தில் மகிழும் இயேசுவின் சீடர்களின் சமூகமாதல்.
                <br />
                <span className="text-dark"> (Becoming a community of disciples of Jesus with deep spirituality enjoying "Abba" experience.)</span>
              </li>
              <li>
              3. பங்கு மக்கள் மத்தியில் தலைமைப் பண்பினை வளர்த்து, அவர்கள் தன்னார்வத்துடனும், கூட்டுறவுடனும் திட்டமிட்டு நற்செயல்களில் ஈடுபடும் வாய்ப்புகளை உருவாக்குதல்.
                <br />
                <span className="text-dark"> (Developing leadership among the parishioners and creating opportunities for them to involve in the planned goodworks with a spirit of voluntarism and cooperation.)</span>
              </li>
              <li>கூட்டுப்பொறுப்புடனும் மக்களாட்சித் தன்மையுடனும் இணைந்து சிந்தித்து, இறைத்திருவுளத்தைத் தேர்ந்துதெளிந்து, நீர்மானங்கள் எடுத்து, ஆற்றலோடு செயல்படுத்தும் நிர்வாகப் பண்பாட்டினை வளர்த்தல்.
                <br />
                <span className="text-dark">(Developing a culture of administration that takes decisions by discerning God's will with a spirit of democracy and shared responsibility and carries them out effectively.)</span>
              </li>
              <li>இறைவாக்கினையும் கத்தோலிக்கத் திருஅவையின் போதனைகளையும் அறிந்து, சமூக விழிப்புணர்வுடன், சமுதாயமாற்றப் பணியாற்றும் கிறிஸ்தவ சமூகமாதல். 
                <br />
                <span className="text-dark">(Becoming a conscientized Christian community that knows the Word of God and the Teachings of the Catholic Church and works for social change.)</span>
              </li>
              <li>கடவுளின் அன்பை பிரதிபலிக்கும் வகையில், மனிதர்களின் உடலியல் மற்றும் உளவியல், தேவைகளை நிறைவு செய்தல். 
                <span className="text-dark">(Imitating God's Love by fulfilling the physical and psychological needs of all.)</span>
              </li>
              <li>நற்செய்தியின் மதிப்பீடுகளை (நம்பிக்கை, அன்பு, நீதி, உண்மை, சமத்துவம். மன்னிப்பு, அமைதி. எதிர்நோக்கு, மகிழ்ச்சி) அடித்தளமாகக் கொண்ட குடும்பங்களாகவும் சமூகங்களாகவும் வளர்தல். 
                <br />
                <span className="text-dark">(Becoming families and communities founded on the Gospel values such as faith, hope, love, justice, peace, truth, equality and forgiveness.)</span>
              </li>
              <li>தூய ஆவியின் கொடைகளைப் பெற்றவர்களாகவும், நமது இயல்பு நாட்டத்திற்கேற்ப திறன்களை வளர்த்துக்கொண்டவர்களாகவும் பணியாற்றும் மனிதர்களின் ஆற்றல்மிக்க சமூகமாக வளர்தல். 
                <br />
                <span className="text-dark">(Becoming a powerful community of persons who enjoy the gifts of the Holy Spirit and who have developed skills akin to their aptitude.)</span>
              </li>
              <li>இறைவனோடும், மனுக்குலத்தோடும், இயற்கையோடும் ஒன்றிப்பு எய்தி, இறையாட்ச்சியின் உன்னத இலட்சியங்களுக்காக உழைக்கும் தற்கடத்தல் மனிதர்களாகவும் சமூகங்களாகவும் உருவாதல். 
                <br />
                <span className="text-dark">(Becoming transcendent persons and communities, who in union with God, humanity and nature, finds meaning in working for the great causes of the Kingdom of God.)</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VissionandMission;
