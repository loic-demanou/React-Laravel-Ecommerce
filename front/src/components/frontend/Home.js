import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import baner1 from "../../components/frontend/1_1.jpg"
import baner2 from "../../components/frontend/1_2.jpg"
import SlideFeatured from "./SlideFeatured";
// "images/banner/1_1.jpg"
const Home = () => {

  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);

  
  useEffect(async () => {
    // setIsLoading(true);
    await axios.get('http://127.0.0.1:8000/api/fetch-home-products')
      .then((result) => {
        setProduct(result.data.product)
        setFeatured(result.data.featured)
      })
  }, [])

  // getting all categories
  const getCategories = () => {
    axios.get('/api/getCollections')
    .then(res => {
      setCategories(res.data)
    })
    .catch(err => console.log(err))
  }

  // Getting the trending articles


  useEffect(() => {
    getCategories();
  }, [])


  return (
    <>
      {/* <Slide /> */}
      <div className="w-10/12 mx-auto my-9">
        <SlideFeatured />
      </div>
      <div id="advantages">
        <div className="container">
          <div className="row mb-4 mt-4">
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

      <div className="box py-4 my-4">
          <div className="container" id="advantages">
            <div className="row">
              <div className="col-md-12">
                <h2 className="mb-0">Les categories</h2>
              </div>
            </div>
          </div>
        </div>

      <div className="row justify-content-center">
          { categories && categories.map((col) =>(
              <div className="col-md-3 card mx-2 my-2 justify-content-center hover:bg-gray-100" key={col.id}>
                  <Link to={`collections/${col.slug}`}>
                      <div className="flex justify-center items-center cursor-pointer">
                          <img className="h-75 w-75  object-cover" src={`http://localhost:8000/images/category/${col.image}`} />
                      </div>
                  </Link>
                  <Link to={`collections/${col.slug}`} style={{ textDecoration:"none" }}>
                      <div className="card-body text-center text-lg">{col.name}</div>
                  </Link>
              </div>
          ))}
      </div>



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

        {/* <div className="w-10/12 mx-auto grid grid-cols-4">
            { product.map((prod) => (
              <div>
                  <div className="">
                    <div className="">
                      <div className="">
                        <Link to={`/collections/${prod.category.slug}/${prod.slug}`}><img src={`http://localhost:8000/${prod.image}`} alt className="" />
                        </Link>
                      </div>
                      <h3 className="text-red-500">
                        <Link to={`/collections/${prod.category.slug}/${prod.slug}`}>{prod.name}</Link>
                      </h3>
                      <p className="text-sm ">
                        { parseFloat(prod.selling_price).toLocaleString('fr')} Fcfa
                      </p>
                    </div>
                  </div>
              </div>
            ))}
        </div> */}
        <div className="container">
          <div className="row">
              {product && product.map((prod) =>
              <div className="item col-md-3 col-sm-6 container-lg" key={prod.id}>
                <div className="product" style={{ height:"90%" }}>
                  <div className="flip-container">
                    <div className="flipper">
                      <div className="front"><Link to={`/collections/${prod.category.slug}/${prod.slug}`}><img src={`http://localhost:8000/${prod.image}`} alt className="img-fluid" /></Link>
                      </div>
                      <div className="back"><Link to={`/collections/${prod.category.slug}/${prod.slug}`}><img src={`http://localhost:8000/${prod.image}`} alt className="img-fluid" /></Link>
                      </div>
                    </div>
                  </div>
                  <Link to={`/collections/${prod.category.slug}/${prod.slug}`} className="invisible"><img src={`http://localhost:8000/${prod.image}`} alt className="img-fluid" /></Link>
                  <div className="text text-sm">
                    <h3><Link to={`/collections/${prod.category.slug}/${prod.slug}`}>{prod.name}</Link></h3>
                    <p className="price text-sm">
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


    </>


  );
}

export default Home;