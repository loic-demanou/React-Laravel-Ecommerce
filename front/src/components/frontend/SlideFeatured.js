import React, { useEffect, useRef, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import 'swiper/swiper.min.css'
// import 'swiper/components/pagination/pagination.min.css'
// import 'swiper/components/pagination/pagination.min.css'
// import SwiperCore, {
//     Autoplay, Pagination, Navigation,
// } from 'swiper';
import axios from 'axios';
// import './featured.css'


import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import otherImg from "./1_2.jpg";
import { Link } from "react-router-dom";

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#4FBFA8", width:"25px", height:"25px", paddingTop:"3px", textAlign:"center", borderRadius:"50%" }}
            onClick={onClick}
        />
    );
    }



export default function SlideFeatured() {

    const [featured, setFeatured] = useState([]);


    useEffect(async () => {
        // setIsLoading(true);
        await axios.get('http://127.0.0.1:8000/api/fetch-home-products')
            .then((result) => {
                setFeatured(result.data.featured)
            })
    }, [])
    // SwiperCore.use([Pagination, Autoplay]);

    var settings = {
        dots: true,
        autoplay:true,
        autoplaySpeed:3000,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    return (
        <>
            {/* <Swiper slidesPerView={4} spaceBetween={10} autoplay={{ "delay": 2500, "disableOnInteraction": false}} 
            pagination={{ "clickable": true }} className="mySwiper">
                    {featured .map ((fea, idx) => (
                        <div className="">
                        <SwiperSlide>
                            <img className="w-75 bg-cover h-3/6  bg-no-repeat " key={idx} src={`http://localhost:8000/${fea.image}`}  />
                        </SwiperSlide>
                        </div>
                    ))}
            </Swiper> */}

            <Slider {...settings}>
          
          {featured && featured.map((fea) => (
                <div className="p-1 rounded-xl overflow-hidden" key={fea.id}>
                    <Link to={`/collections/${fea.category.slug}/${fea.slug}`}>
                            <div className=" flex justify-center items-center shadow-xl hover:shadow-2xl transition duration-300">
                                    {fea.image ? <img className="bg-black bg-cover bg-no-repeat inline w-40 h-40 rounded-3xl cursor-pointer"
                                        src={`http://localhost:8000/${fea.image}`} alt={fea.name}/>
                                    :
                                    <img className=" bg-black bg-cover bg-no-repeat inline w-40 h-40 rounded-3xl cursor-pointer" 
                                        src={otherImg} alt="Le title de l'article" />}
                            </div>
                        <div className="pl-4 text-center text-gray-700 no-underline mt-3 cursor-pointer">
                            <div>
                                <a className="no-underline my-4 text-sm font-bold px-3">{fea.name} </a> <br/>
                                {/* <a className="my-4 text-gray-400  px-3">{fea.brand} </a> <br/>  */}
                                <a className="no-underline my-4 text-gray-400 text-sm  px-3">{ parseFloat(fea.selling_price).toLocaleString('fr')} Fcfa </a> <br/> 
                            </div>
                        </div>
                    </Link>
                </div>
            ))
        }



        </Slider>
        </>
    );
}

