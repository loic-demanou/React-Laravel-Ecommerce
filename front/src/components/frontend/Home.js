import { Link } from "react-router-dom";
import baner1 from "../../components/frontend/1_1.jpg"
import baner2 from "../../components/frontend/1_2.jpg"
// "images/banner/1_1.jpg"
const Home = () => {
  return (

    <>

      <div id="advantages">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="box clickable d-flex flex-column justify-content-center mb-0 h-100">
                <div className="icon"><i className="fa fa-heart" /></div>
                <h3><Link to="#">We love our customers</Link></h3>
                <p className="mb-0">We are known to provide best possible service ever</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="box clickable d-flex flex-column justify-content-center mb-0 h-100">
                <div className="icon"><i className="fa fa-tags" /></div>
                <h3><Link to="#">Best prices</Link></h3>
                <p className="mb-0">You can check that the height of the boxes adjust when longer text like this one is used
                  in one of them.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="box clickable d-flex flex-column justify-content-center mb-0 h-100">
                <div className="icon"><i className="fa fa-thumbs-up" /></div>
                <h3><a href="#">100% satisfaction guaranteed</a></h3>
                <p className="mb-0">Free returns on everything for 3 months.</p>
              </div>
            </div>
          </div>
          {/* /.row*/}
        </div>
        {/* /.container*/}
      </div>
      {/* /#advantages*/}
      {/* *** ADVANTAGES END ****/}



<div id="hot">
  <div className="box py-4">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h2 className="mb-0">Hot this week</h2>
        </div>
      </div>
    </div>
  </div>
  <div className="container">
    <div className="product-slider owl-carousel owl-theme">
      <div className="item">
        <div className="product">
          <div className="flip-container">
            <div className="flipper">
              <div className="front"><a href="detail.html"><img src={baner1} alt className="img-fluid" /></a>
              </div>
              <div className="back"><a href="detail.html"><img src={baner2} alt className="img-fluid" /></a>
              </div>
            </div>
          </div><a href="detail.html" className="invisible"><img src={baner1} alt className="img-fluid" /></a>
          <div className="text">
            <h3><a href="detail.html">Fur coat with very but very very long name</a></h3>
            <p className="price">
              <del />$143.00
            </p>
          </div>
          {/* /.text*/}
          <div className="ribbon sale">
            <div className="theribbon">SALE</div>
            <div className="ribbon-background" />
          </div>
          {/* /.ribbon*/}
          <div className="ribbon new">
            <div className="theribbon">NEW</div>
            <div className="ribbon-background" />
          </div>
          {/* /.ribbon*/}
          <div className="ribbon gift">
            <div className="theribbon">GIFT</div>
            <div className="ribbon-background" />
          </div>
          {/* /.ribbon*/}
        </div>
        {/* /.product*/}
      </div>
      <div className="item">
        <div className="product">
          <div className="flip-container">
            <div className="flipper">
              <div className="front"><a href="detail.html"><img src="img/product2.jpg" alt className="img-fluid" /></a>
              </div>
              <div className="back"><a href="detail.html"><img src="img/product2_2.jpg" alt className="img-fluid" /></a>
              </div>
            </div>
          </div><a href="detail.html" className="invisible"><img src="img/product2.jpg" alt className="img-fluid" /></a>
          <div className="text">
            <h3><a href="detail.html">White Blouse Armani</a></h3>
            <p className="price">
              <del>$280</del>$143.00
            </p>
          </div>
          {/* /.text*/}
          <div className="ribbon sale">
            <div className="theribbon">SALE</div>
            <div className="ribbon-background" />
          </div>
          {/* /.ribbon*/}
          <div className="ribbon new">
            <div className="theribbon">NEW</div>
            <div className="ribbon-background" />
          </div>
          {/* /.ribbon*/}
          <div className="ribbon gift">
            <div className="theribbon">GIFT</div>
            <div className="ribbon-background" />
          </div>
          {/* /.ribbon*/}
        </div>
        {/* /.product*/}
      </div>
      <div className="item">
        <div className="product">
          <div className="flip-container">
            <div className="flipper">
              <div className="front"><a href="detail.html"><img src="img/product3.jpg" alt className="img-fluid" /></a>
              </div>
              <div className="back"><a href="detail.html"><img src="img/product3_2.jpg" alt className="img-fluid" /></a>
              </div>
            </div>
          </div><a href="detail.html" className="invisible"><img src="img/product3.jpg" alt className="img-fluid" /></a>
          <div className="text">
            <h3><a href="detail.html">Black Blouse Versace</a></h3>
            <p className="price">
              <del />$143.00
            </p>
          </div>
          {/* /.text*/}
        </div>
        {/* /.product*/}
      </div>
      <div className="item">
        <div className="product">
          <div className="flip-container">
            <div className="flipper">
              <div className="front"><a href="detail.html"><img src="img/product3.jpg" alt className="img-fluid" /></a>
              </div>
              <div className="back"><a href="detail.html"><img src="img/product3_2.jpg" alt className="img-fluid" /></a>
              </div>
            </div>
          </div><a href="detail.html" className="invisible"><img src="img/product3.jpg" alt className="img-fluid" /></a>
          <div className="text">
            <h3><a href="detail.html">Black Blouse Versace</a></h3>
            <p className="price">
              <del />$143.00
            </p>
          </div>
          {/* /.text*/}
        </div>
        {/* /.product*/}
      </div>
      <div className="item">
        <div className="product">
          <div className="flip-container">
            <div className="flipper">
              <div className="front"><a href="detail.html"><img src="img/product2.jpg" alt className="img-fluid" /></a>
              </div>
              <div className="back"><a href="detail.html"><img src="img/product2_2.jpg" alt className="img-fluid" /></a>
              </div>
            </div>
          </div><a href="detail.html" className="invisible"><img src="img/product2.jpg" alt className="img-fluid" /></a>
          <div className="text">
            <h3><a href="detail.html">White Blouse Versace</a></h3>
            <p className="price">
              <del />$143.00
            </p>
          </div>
          {/* /.text*/}
          <div className="ribbon new">
            <div className="theribbon">NEW</div>
            <div className="ribbon-background" />
          </div>
          {/* /.ribbon*/}
        </div>
        {/* /.product*/}
      </div>
      <div className="item">
        <div className="product">
          <div className="flip-container">
            <div className="flipper">
              <div className="front"><a href="detail.html"><img src="img/product1.jpg" alt className="img-fluid" /></a>
              </div>
              <div className="back"><a href="detail.html"><img src="img/product1_2.jpg" alt className="img-fluid" /></a>
              </div>
            </div>
          </div><a href="detail.html" className="invisible"><img src="img/product1.jpg" alt className="img-fluid" /></a>
          <div className="text">
            <h3><a href="detail.html">Fur coat</a></h3>
            <p className="price">
              <del />$143.00
            </p>
          </div>
          {/* /.text*/}
          <div className="ribbon gift">
            <div className="theribbon">GIFT</div>
            <div className="ribbon-background" />
          </div>
          {/* /.ribbon*/}
        </div>
        {/* /.product*/}
      </div>
      <div className="item">
        <div className="product">
          <div className="flip-container">
            <div className="flipper">
              <div className="front"><a href="detail.html"><img src="img/product2.jpg" alt className="img-fluid" /></a>
              </div>
              <div className="back"><a href="detail.html"><img src="img/product2_2.jpg" alt className="img-fluid" /></a>
              </div>
            </div>
          </div><a href="detail.html" className="invisible"><img src="img/product2.jpg" alt className="img-fluid" /></a>
          <div className="text">
            <h3><a href="detail.html">White Blouse Armani</a></h3>
            <p className="price">
              <del>$280</del>$143.00
            </p>
          </div>
          {/* /.text*/}
          <div className="ribbon sale">
            <div className="theribbon">SALE</div>
            <div className="ribbon-background" />
          </div>
          {/* /.ribbon*/}
          <div className="ribbon new">
            <div className="theribbon">NEW</div>
            <div className="ribbon-background" />
          </div>
          {/* /.ribbon*/}
          <div className="ribbon gift">
            <div className="theribbon">GIFT</div>
            <div className="ribbon-background" />
          </div>
          {/* /.ribbon*/}
        </div>
        {/* /.product*/}
      </div>
      <div className="item">
        <div className="product">
          <div className="flip-container">
            <div className="flipper">
              <div className="front"><a href="detail.html"><img src="img/product3.jpg" alt className="img-fluid" /></a>
              </div>
              <div className="back"><a href="detail.html"><img src="img/product3_2.jpg" alt className="img-fluid" /></a>
              </div>
            </div>
          </div><a href="detail.html" className="invisible"><img src="img/product3.jpg" alt className="img-fluid" /></a>
          <div className="text">
            <h3><a href="detail.html">Black Blouse Versace</a></h3>
            <p className="price">
              <del />$143.00
            </p>
          </div>
          {/* /.text*/}
        </div>
        {/* /.product*/}
      </div>
      {/* /.product-slider*/}
    </div>
    {/* /.container*/}
  </div>
  {/* /#hot*/}
  {/* *** HOT END ****/}
</div>

      
    </>


  );
}

export default Home;