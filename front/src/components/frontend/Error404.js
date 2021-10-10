import { Link } from "react-router-dom";

const Error404 = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    {/* breadcrumb*/}
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li aria-current="page" className="breadcrumb-item active">Page not found</li>
                        </ol>
                    </nav>
                    <div id="error-page" className="row">
                        <div className="col-md-6 mx-auto">
                            <div className="box text-center py-5">
                                {/* <p className="text-center"><img src="img/logo.png" alt={document.title = "Product"}/></p> */}
                                <h3>We are sorry - this page is not here anymore</h3>
                                <h4 className="text-muted">Error 404 - Page not found</h4>
                                <p className="text-center">To continue please use the <strong>Search form</strong> or
                                    <strong>Menu</strong> above.</p>
                                <p className="buttons"><Link to="/" className="btn btn-primary"><i className="fa fa-home" /> Go to
                                    Homepage</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Error404;