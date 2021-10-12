import { Link } from "react-router-dom";

const Error403 = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    {/* breadcrumb*/}
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li aria-current="page" className="breadcrumb-item active">Forbidden</li>
                        </ol>
                    </nav>
                    <div id="error-page" className="row">
                        <div className="col-md-6 mx-auto">
                            <div className="box text-center py-5">
                                {/* <p className="text-center"><img src="img/logo.png" alt={document.title = "Product"}/></p> */}
                                <h3>Nous sommes désolé - cette page ne vous êtes pas authorisée d'access</h3>
                                <h4 className="text-muted">Error 403 - Forbidden</h4>
                                <p className="text-center">To continue please use the <strong>Search form</strong> or
                                    <strong>Menu</strong> above.</p>
                                <p className="buttons"><Link to="/" className="btn btn-primary"><i className="fa fa-home" /> Retour a la
                                    page d'accueil</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Error403;