import React from "react";

function Footer() {
  return (
    <footer style={{ backgroundColor: "#979797", padding: "10px 0" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <h5 className="mb-3 text-dark">StreetBitez</h5>
            <p style={{ fontSize: "14px" }}>
  Explore our mouthwatering menu at See Menu. Indulge in a variety of delicious dishes, crafted with passion and finest ingredients. From savory appetizers to delectable desserts, our menu offers a culinary delight for every palate. Visit See Menu and satisfy your cravings today.
</p>

          </div>
          <div className="col-lg-3 col-md-6">
          
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="mb-1 text-dark">Opening Hours</h5>
            <table className="table" style={{ borderColor: "#666" }}>
              <tbody>
                <tr>
                  <td>Mon - Fri:</td>
                  <td>8am - 9pm</td>
                </tr>
                <tr>
                  <td>Sat - Sun:</td>
                  <td>8am - 1am</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
        © {new Date().getFullYear()} Copyright:
        <a className="text-dark" href="">
          StreetBitez.com
        </a>
      </div>
    </footer>
  );
}

export default Footer;
