import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from "../../useFetch";

toast.configure()

const CategoryEdit = () => {

    const history = useHistory();

    const {id} = useParams();
    // const { data:category, isLoading, error } = useFetch('http://localhost:8000/api/admin/category/show/'+id);

    const [name, setName] = useState("")
    const [slug, setSlug] = useState("")
    const [description, setDescription] = useState("")
    const [metaTitle, setMetaTitle] = useState("")
    const [metaDescription, setMetaDescription] = useState("")
    const [metaKeyword, setMetaKeyword] = useState("")
    const [status, setStatus] = useState(false)
    const [errors, setErrors] = useState([])

    useEffect(() => {

        axios.get('http://localhost:8000/api/admin/category/show/'+id)
        .then((result) => {
            console.log(result.data)
            setName(result.data.name);
            setSlug(result.data.slug)
            setDescription(result.data.description)
            setMetaTitle(result.data.meta_title)
            setMetaKeyword(result.data.meta_keyword)
            setMetaDescription(result.data.meta_description)
            setStatus(result.data.status)
            // console.log(result.data.status);
        })
    }, [])
    

    const updateCategory = async(e) => {
        e.preventDefault()
        console.log("clické");
        const category = {name, slug, description, metaTitle, metaDescription, metaKeyword, status};
        // const category = {name, slug, description};

        await axios.put('http://localhost:8000/api/admin/category/update/'+id, category)
        .then((result) =>{
            toast.success("Category created successfully! 🙃");
            setErrors("")
            // console.log(result.data)
            history.push('/admin/category');
        })
        .catch((err) =>{
            setErrors(err.response.data.errors)
            toast.error(`Error! ${err.response.data.message} 😣`);
            // console.log(err.response.data.errors);
        })
    }


    return ( 
        <div className="container m-3">
            <nav aria-label="breadcrumb" className="m-5">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
                    <li className="breadcrumb-item" aria-current="page"><Link to="/admin/category">Category</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit</li>
                </ol>
            </nav>
            <div className="card">
                
                <span className="card-header d-flex justify-content-between">
                    <h5>Edit category {name}</h5>
                    <Link to="/admin/category" className="btn btn-primary">Back</Link>
                </span>
                <div className="card-body">

               <form onSubmit={updateCategory} >
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home"
                            type="button" role="tab" aria-controls="home" aria-selected="true">Current</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="Seo-tags" data-bs-toggle="tab"
                            data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO</button>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div className="my-2">
                            <label htmlFor="category" className="form-label">Category name</label>
                            <input type="text" className={errors.name ? "form-control border-danger": "form-control"} value={name} onChange={(e) => setName(e.target.value)} />
                            {errors.name && <div className="form-text text-danger">{errors.name}</div>}
                        </div>
                        <div className="mb-2">
                            <label htmlFor="slug" className="form-label">Slug</label>
                            <input type="text" className={errors.slug ? "form-control border-danger": "form-control"} id="slug"  value={slug} onChange={(e) => setSlug(e.target.value)} />
                            {errors.slug && <div className="form-text text-danger">{errors.slug}</div>}
                        </div>
                        <div className="mb-2">
                            <label htmlFor="description" className="form-label">description</label>
                            <textarea 
                                className={errors.description ? "form-control border-danger": "form-control"} 
                                id="description"  value={description} onChange={(e) => setDescription(e.target.value)}>
                            </textarea>
                            {errors.description && <div className="form-text text-danger">{errors.description}</div>}
                        </div>
                        <div className="mb-2">
                            <label htmlFor="status" className="form-label">status</label>
                            {status==1 ? <input type="checkbox" className="m-2" checked id="status" value={status} onChange={(e) => setStatus(!status)} />
                            : <input type="checkbox" className="m-2" id="status" value={status} onChange={(e) => setStatus(!status)} /> }
                            {errors.status && <div className="form-text text-danger">{errors.status}</div>}
                        </div>
                    </div>
                    <div className="tab-pane fade" id="seo-tags" role="tabpanel" aria-labelledby="Seo-tags">
                    <div className="my-2">
                            <label htmlFor="metaN" className="form-label">Meta name</label>
                            <input type="text" className={errors.metaTitle ? "form-control border-danger": "form-control"}
                            value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} id="metaN" />
                            {errors.metaTitle && <div className="form-text text-danger">{errors.metaTitle}</div>}
                        </div>
                        <div className="mb-2">
                            <label htmlFor="metaD" className="form-label">Meta Description</label>
                            <textarea className={errors.metaDescription ? "form-control border-danger": "form-control"} 
                                value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} id="metaD">
                            </textarea>
                            {errors.metaDescription && <div className="form-text text-danger">{errors.metaDescription}</div>}
                        </div>
                        <div className="mb-2">
                            <label htmlFor="metaD" className="form-label">Meta Keyword</label>
                            <textarea className={errors.metaKeyword ? "form-control border-danger": "form-control"} 
                                value={metaKeyword} onChange={(e) => setMetaKeyword(e.target.value)} id="metaD">
                            </textarea>
                            {errors.metaKeyword && <div className="form-text text-danger">{errors.metaKeyword}</div>}
                        </div>

                    </div>
                </div>
                        <button type="submit" className="btn btn-primary">Submit</button>

            </form>

        
                </div>
            </div>

        </div>
     );
}
 
export default CategoryEdit;