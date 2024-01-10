import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import boximage from '../images/driver11.jpg'
import "./driverFeedback.css";

function generateStars(rating) {
  const stars = [];
  const maxRating = 5; // Maximum rating possible
  
  for (let i = 1; i <= maxRating; i++) {
    const starClassName = i <= rating ? "star filled" : "star empty";
    stars.push(<div key={i} className={starClassName}></div>);
  }
  
  return (
    <div className="star-rating">
      {stars}
    </div>
  );
}

function DriverFeedback() {
  return (
    <div class="container">
            <img src={boximage} alt="" className="driver-feedback-image" />
        <h1 className="feedback-heading">Customer Feedbacks</h1> {/* Added heading */}
        
          <div class="card">
            
            <div class="card__content">
              <span><i class="ri-double-quotes-l"></i></span>
              <div class="card__details">
              {generateStars(4)} {/* Display 4 filled stars */}
                <p>
                  We had a great time collaboraring with the Filament team. They
                  have my high recommendation!
                </p>
                <h4>- Marnus Stephen</h4>
              </div>
            </div>
          </div>
          <div class="card">
            
            <div class="card__content">
              <span><i class="ri-double-quotes-l"></i></span>
              <div class="card__details">
              {generateStars(4)} {/* Display 4 filled stars */}
                <p>
                  The team drastically improved our product's user experience &
                  increased our business outreach.
                </p>
                <h4>- Andrew Jettpace</h4>
              </div>
            </div>
          </div>
          <div class="card">
            
            <div class="card__content">
              <span><i class="ri-double-quotes-l"></i></span>
              <div class="card__details">
              {generateStars(4)} {/* Display 4 filled stars */}
                <p>
                  I absolutely loved working with the Filament team. Complete
                  experts at what they do!
                </p>
                <h4>- Stacy Stone</h4>
              </div>
            </div>
          </div>
          <div class="card">

          <div class="card__content">
              <span><i class="ri-double-quotes-l"></i></span>
              <div class="card__details">
              {generateStars(4)} {/* Display 4 filled stars */}
                <p>
                "The driver was professional and maintained good communication throughout the delivery process."
                </p>
                <h4>- Ayesha Perera </h4>
              </div>
            </div>
          </div>
          <div class="card">
           
            <div class="card__content">
              <span><i class="ri-double-quotes-l"></i></span>
              <div class="card__details">
              {generateStars(3)} {/* Display 4 filled stars */}
                <p>
                "Thank you for accommodating my special delivery request. The driver was very understanding."
Remember that feedback can be positive or constructive, depending on the situation. It's essential to provide feedback that is fair and specific to help drivers improve their performance or acknowledge their good work.

                </p>
                <h4>- Hiran </h4>
              </div>
            </div>
          </div>
          <div class="card">
            
            <div class="card__content">
              <span><i class="ri-double-quotes-l"></i></span>
              <div class="card__details">
              {generateStars(4)} {/* Display 4 filled stars */}
                <p>
                "Quick and efficient delivery. I was impressed with the speed of service."
                </p>
                <h4>- Jenny Fernando</h4>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card__content">
              <span><i class="ri-double-quotes-l"></i></span>
              <div class="card__details">
              {generateStars(5)} {/* Display 4 filled stars */}
                <p>
                "Driver was respectful and followed safety guidelines during the pandemic."
                </p>
                <h4>- Stephny</h4>
              </div>
            </div>
          </div>
          </div>
  );
}

export default DriverFeedback;
