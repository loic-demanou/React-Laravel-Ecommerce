import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import baner1 from "../../components/frontend/1_1.jpg"
import baner2 from "../../components/frontend/1_2.jpg"
// "images/banner/1_1.jpg"
const Home = () => {

  const [home, setHome] =useState([])

  // fetchHomeProducts = () =>{
  //   axios.get('/api/fetch-home-products').then(res => {
  //     console.log(res.data);
  //     setProduct(res.data.product)
  //   })    
  // }


    axios.get('/api/fetch-home-products').then(res => {
      console.log(res.data);
      // setHome(res.data.product)
    }) 


  return (
    <>
      <div className="container">
        <div className="row">
          <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#carouselExampleCaptions" data-slide-to={0} className="active" />
              <li data-target="#carouselExampleCaptions" data-slide-to={1} />
              <li data-target="#carouselExampleCaptions" data-slide-to={2} />
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={baner1} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5>First slide label</h5>
                  <p>Some representative placeholder content for the first slide.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src={baner2} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Second slide label</h5>
                  <p>Some representative placeholder content for the second slide.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src={baner1} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Third slide label</h5>
                  <p>Some representative placeholder content for the third slide.</p>
                </div>
              </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>

        </div>
      </div>

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

            {home && home.map((prod) => (

            <div className="item" key={prod.id}>
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
                  <h3><a href="detail.html">{prod.name}</a></h3>
                  <p className="price">
                    <del />{ parseFloat(prod.selling_price).toLocaleString('fr')} Fcfa
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
            )) 
            }
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