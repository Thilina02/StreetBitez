import React from 'react';
import './SeeMenuPage.css';
import 'font-awesome/css/font-awesome.min.css';


const stalls = [
  {
    name: 'Pizza Mart',
    menuImage: '/stallImages/Black And Yellow Restaurant Menu (1).png',
  },
  {
    name: 'හෙළ බොජුන්',
    menuImage: '/stallImages/Dark Aesthetic Coffee Shop Menu .png',
  },
  {
    name: 'Sweet Serenity',
    menuImage: '/stallImages/Pastel Colors Minimalist Bakery Menu (1).png',
  },
  {
    name: 'Asiano',
    menuImage: '/stallImages/Red Minimalist Ramen Menu.png',
  },

  {
    name: 'Cafe 007',
    menuImage: '/stallImages/Black Modern Bar Menu.png',
  },

  {
    name: 'Korean Restaurent',
    menuImage: '/stallImages/Neutral Modern Korean Menu Menu Portrait.png',
  },

];

function SeeMenuPage() {
    const handleDownload = (menuImage) => {
        const link = document.createElement('a');
        link.href = menuImage;
        link.download = 'menu_image.png'; // Change the filename as needed
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.click();
    };
  
    return (
      <div className="menu-page">
        <div className='container'>
        <h1 className="page-header">Menu</h1>
        </div>

        <div className="menu-cards-container">
          {stalls.map((stall, index) => (
            <div className="menu-card" key={index}>
              <h3 className="stall-name">{stall.name}</h3>
              <img
                className="menu-image"
                src={stall.menuImage}
                alt={`${stall.name} Menu`}
              />
              <div className="menu-card-footer">
                <button
                  className="download-button"
                  onClick={() => handleDownload(stall.menuImage)}
                >
                  <i className="fa fa-download"></i> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default SeeMenuPage;