import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import baner1 from "../../components/frontend/1_1.jpg"
import baner2 from "../../components/frontend/1_2.jpg"
// "images/banner/1_1.jpg"
const Home = () => {

  const [product, setProduct] = useState([]);

  // axios.get('/api/fetch-home-products').then(res => {
  //   console.log(res.data);
  //   setProduct(res.data.product)
  // }) 

  // axios.get('/api/fetch-home-products')
  // .then((result) => {
  //   setProduct(result.data.product)
  // })
  useEffect(async () => {
    // setIsLoading(true);
    await axios.get('http://127.0.0.1:8000/api/fetch-home-products/')
      .then((result) => {
        // setCategory(result.data)
        setProduct(result.data.product)
        // setIsLoading(false)
      })
  }, [])



  return (
    <div>
      <div className="container-fluid mb-4">
        <div className="row">
          <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#carouselExampleCaptions" data-slide-to={0} className="active" />
              <li data-target="#carouselExampleCaptions" data-slide-to={1} />
              <li data-target="#carouselExampleCaptions" data-slide-to={2} />
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active" style={{ height:"200px" }} >
                <img src={baner1} className="d-block w-100"alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5>First slide label</h5>
                  <p>Some representative placeholder content for the first slide.</p>
                </div>
              </div>
              <div className="carousel-item" style={{ height:"200px" }}>
                <img src={baner2} className="d-block w-100" alt="..." />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Second slide label</h5>
                  <p>Some representative placeholder content for the second slide.</p>
                </div>
              </div>
              <div className="carousel-item" style={{ height:"200px" }}>
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
          <div className="row">

            
              {product && product.map((prod) =>
              <div className="item col-md-3 col-sm-6" key={prod.id}>
                <div className="product" style={{ height:"90%" }}>
                  <div className="flip-container">
                    <div className="flipper">
                      <div className="front"><Link to={`/collections/${prod.category.slug}/${prod.slug}`}><img src={`http://localhost:8000/${prod.image}`} alt className="img-fluid" /></Link>
                      </div>
                      <div className="back"><Link to={`/collections/${prod.category.slug}/${prod.slug}`}><img src={`http://localhost:8000/${prod.image}`} alt className="img-fluid" /></Link>
                      </div>
                    </div>
                  </div><Link to={`/collections/${prod.category.slug}/${prod.slug}`} className="invisible"><img src={`http://localhost:8000/${prod.image}`} alt className="img-fluid" /></Link>
                  <div className="text">
                    <h3><Link to={`/collections/${prod.category.slug}/${prod.slug}`}>{prod.name}</Link></h3>
                    <p className="price">
                      <del />{ parseFloat(prod.selling_price).toLocaleString('fr')} Fcfa
                    </p>
                  </div>
                  {/* /.text*/}
                </div>

              </div>
            )}


            {/* /.product-slider*/}
          </div>
          {/* /.container*/}
        </div>
        {/* /#hot*/}
        {/* *** HOT END ****/}
      </div>


    </div>


  );
}

export default Home;