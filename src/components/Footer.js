import React from 'react'
import mapImage from '../assets/footer-image.png'
const Footer = () => {
  return (
    <>
      <div className='footer-left'>
        <div className="image-section">
          <img src={mapImage} alt='footer-map' />
        </div>
        <div className="adress-section">
          <div className="adress-header">
            İletişim
          </div>
          <div className="adress-text">
            Adres: Çifte Havuzlar Mah. Eski Londra Asfaltı Cad. Kuluçka Merkezi D2 Blok No: 151/1F İç Kapı No: 2B03 Esenler/İstanbul
          </div>
          <div className="adress-contact">
            Email: bilgi@tesodev.com
          </div>
        </div>
      </div>
      <div className="map-section">
        <iframe
          className="iframe-map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6196.895959934394!2d28.887295034359756!3d41.01997867733297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cabb7abf29ba35%3A0xc98f44e9057adcde!2zVGVzb2RldiBZYXrEsWzEsW0gRG9uYW7EsW0gQmlsacWfaW0gQml5b21lZGlrYWwgS29uZ3JlIFR1cml6bSBFxJ9pdGltIERhbsSxxZ9tYW5sxLFrIExpbWl0ZWQgxZ5pcmtldGk!5e0!3m2!1str!2str!4v1665479092113!5m2!1str!2str"
          style={{ border: '0' }}
          title='map'
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </>
  )
}
export default Footer



