import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const SocialShareButtons = ({ prod_cat_slug, prod_slug }) => {

    const [link, setLink] = useState("");
    const[isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        // axios.get(`http://127.0.0.1:8000/api/view-product/${slug}`)
        axios.get(`http://127.0.0.1:8000/api/social-share-wa/${prod_cat_slug}/${prod_slug }`)
        .then((result) => {
            console.log(result.data)
            setLink(result.data.link)
            setIsLoading(false)
        })
    }, [link])

    return (

        <div className="social">
            <h4>Show it to your friends</h4>
            <li><a href="#" data-toggle="modal" data-target=".shareAd">
                <i class="fas fa-share-alt"></i> Share</a></li>
            <div className="modal fade shareAd" id="shareAd" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Share This Ad</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Link to={`/social-share-fb/${prod_slug}`} ><i className="fab fa-facebook-square ml-3" /> Facebook</Link>
                            <Link to={`/social-share-tw/${prod_slug}`} ><i className="fab fa-twitter ml-3" /> Twitter</Link>
                            <Link to={`/social-share-ln/${prod_slug}`} ><i className="fab fa-linkedin-in ml-3" /> LinkedIn</Link>
                            <Link to={`/social-share-wa/${prod_slug}`} ><i className="fab fa-whatsapp ml-3" /> WhatsApp</Link>
                            <Link to={`/social-share-te/${prod_slug}`} ><i className="fab fa-telegram ml-3" /> Telegram</Link>
                        </div>
                        <Link>{link}</Link>
                    </div>
                </div>
            </div>

            {/* <SocialShareButtons /> */}
            {/* <p><a href="#" className="external facebook"><i className="fa fa-facebook" /></a><a href="#" className="external gplus"><i className="fa fa-google-plus" /></a><a href="#" className="external twitter"><i className="fa fa-twitter" /></a><a href="#" className="email"><i className="fa fa-envelope" /></a></p> */}
        </div>


    );
}

export default SocialShareButtons;