import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from "../../useFetch";


const CreateProduct = () => {

    // const { data:categories, isLoading, error } = useFetch('http://127.0.0.1:8000/api/getCategory/');

    const history = useHistory();

    const [categoryId, setCategoryId] = useState("")
    const [name, setName] = useState("")
    const [slug, setSlug] = useState("")
    const [description, setDescription] = useState("")
    const [brand, setBrand] = useState("")

    const [sellingPrice, setSellingPrice] = useState(0)
    const [originalPrice, setOriginalPrice] = useState(0)
    const [qty, setQty] = useState(0)
    const [image, setImage] = useState([])

    const [metaTitle, setMetaTitle] = useState("")
    const [metaDescription, setMetaDescription] = useState("")
    const [metaKeyword, setMetaKeyword] = useState("")

    const [featured, setFeatured] = useState(false)
    const [popular, setPopular] = useState(false)
    const [status, setStatus] = useState(false)

    const [errors, setErrors] = useState([])
    const [categoryList, setCategoryList] = useState([])


    const handleImageChange = (e) => {
        setImage([]);
        if (e.target.files) {
          const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
          setImage((prevImages) => prevImages.concat(filesArray));
          Array.from(e.target.files).map(
            (file) => URL.revokeObjectURL(file)
          );
        }
      };

    //   const renderPhotos = (source) => {
    //    source.map((photo) => {
    //       return (<img className="p-2" src={photo} alt="" key={photo} style={{ width: "10%", height: "110px" }} />)

    //     });
    //   };

    useEffect(()=> {
        axios.get('/api/getCategory/')
        .then((result) => {
            console.log(result.data)
            setCategoryList(result.data)
        })

    },[])


    const createProduct = (e) => {
        e.preventDefault()
        console.log("clické");
        setImage({image:e.target.files})
        // var files = e.target.files;
        console.log(image);
        const formData= new FormData();
        // for (const file of image) {
        //     formData.append("image[]", image);
        //   }
        //   formData.append('image[]', file);
        // const formData= new FormData();
                for (let i = 0; i < image.length; i++) {
            formData.append('image[]', image[i])
          }

        formData.append('category_id', categoryId);
        formData.append('name', name);
        formData.append('slug', slug);
        formData.append('description', description);

        formData.append('meta_title', metaTitle);
        formData.append('meta_description', metaDescription);
        formData.append('meta_keyword', metaKeyword);

        formData.append('brand', brand);
        formData.append('selling_price', sellingPrice);
        formData.append('original_price', originalPrice);
        formData.append('qty', qty);

        // for (let i = 0; i < files.length; i++) {
        //     formData.append('image[]', files[i])
        //   }
      
        // formData.append('image', image);
        formData.append('featured', featured);
        formData.append('popular', popular);
        formData.append('status', status);

         axios.post('/api/create-product', formData)
            .then((result) => {
                toast.success("Created successfully! 🙃");
                console.log(result.data);
                setErrors("")
                history.push('/admin/product');
            })
            // .catch((err) => {
            //     setErrors(err.response.data.errors)
            //     console.log(err.response.data);
            //     toast.error(`Error! ${err.response.data.message} 😣`);
            // })
    }



    return (
        <div className="container m-3">
            <nav aria-label="breadcrumb" className="m-5">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
                    <li className="breadcrumb-item" aria-current="page"><Link to="/admin/product">Products</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Create</li>
                </ol>
            </nav>

            <div className="card">
                <span className="card-header d-flex justify-content-between">
                    <h5>Add a product</h5>
                    <Link to="/admin/category" className="btn btn-primary">Back</Link>
                </span>
                <div className="card-body">

                    <form onSubmit={createProduct} encType="multipart/form-data" >
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="product-tab" data-bs-toggle="tab" data-bs-target="#product"
                                    type="button" role="tab" aria-controls="product" aria-selected="true">Current</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="Seo-tags" data-bs-toggle="tab"
                                    data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="other-tab" data-bs-toggle="tab"
                                    data-bs-target="#other-detail" type="button" role="tab" aria-controls="other-detail" aria-selected="false">other details</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="product" role="tabpanel" aria-labelledby="product-tab">
                                <div className="my-2">
                                    <label htmlFor="category" className="form-label">Category name</label>
                                    <select id="" className={errors.categoryId ? "form-control border-danger" : "form-control"} value={categoryId} onChange={(e) => setCategoryId(e.target.value)} >
                                        <option>select the category</option>
                                        
                                            {categoryList && categoryList.map((cat) => 
                                                <option value={cat.id} key={cat.id}>{cat.name}</option>
                                            )}
                                        
                                    </select>
                                    {/* <input type="text" className={errors.name ? "form-control border-danger" : "form-control"} value={name} onChange={(e) => setName(e.target.value)} /> */}
                                    {errors.category_id && <div className="form-text text-danger">{errors.category_id}</div>}
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="category" className="form-label">Product name</label>
                                    <input type="text" className={errors.name ? "form-control border-danger" : "form-control"} value={name} onChange={(e) => setName(e.target.value)} />
                                    {errors.name && <div className="form-text text-danger">{errors.name}</div>}
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="slug" className="form-label">Slug</label>
                                    <input type="text" className={errors.slug ? "form-control border-danger" : "form-control"} id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
                                    {errors.slug && <div className="form-text text-danger">{errors.slug}</div>}
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="description" className="form-label">description</label>
                                    <textarea
                                        className={errors.description ? "form-control border-danger" : "form-control"}
                                        id="description" value={description} onChange={(e) => setDescription(e.target.value)}>
                                    </textarea>
                                    {errors.description && <div className="form-text text-danger">{errors.description}</div>}
                                </div>
                            </div>

                            <div className="tab-pane fade" id="seo-tags" role="tabpanel" aria-labelledby="Seo-tags">
                                <div className="my-2">
                                    <label htmlFor="metaN" className="form-label">Meta title</label>
                                    <input type="text" className={errors.meta_title ? "form-control border-danger" : "form-control"}
                                        value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} id="metaN" />
                                    {errors.meta_title && <div className="form-text text-danger">{errors.meta_title}</div>}
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="metaD" className="form-label">Meta Description</label>
                                    <textarea className={errors.meta_description ? "form-control border-danger" : "form-control"}
                                        value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} id="metaD">
                                    </textarea>
                                    {errors.meta_description && <div className="form-text text-danger">{errors.meta_description}</div>}
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="metaD" className="form-label">Meta Keyword</label>
                                    <textarea className={errors.meta_keyword ? "form-control border-danger" : "form-control"}
                                        value={metaKeyword} onChange={(e) => setMetaKeyword(e.target.value)} id="metaD">
                                    </textarea>
                                    {errors.meta_keyword && <div className="form-text text-danger">{errors.meta_keyword}</div>}
                                </div>
                            </div> 

                            <div className="tab-pane fade" id="other-detail" role="tabpanel" aria-labelledby="other">
                            
                                <div className="row">

                                    <div className="form-group col-md-4 my-2">
                                        <label htmlFor="metaN" className="form-label">Selling price</label>
                                        <input type="number" className={errors.selling_price ? "form-control border-danger" : "form-control"}
                                            value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} id="metaN" />
                                        {errors.selling_price && <div className="form-text text-danger">{errors.selling_price}</div>}
                                    </div>
                                    <div className="form-group col-md-4 mb-2">
                                        <label htmlFor="op" className="form-label">Original price</label>
                                        <input type="number" className={errors.original_price ? "form-control border-danger" : "form-control"}
                                            value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} id="op" />
                                        {errors.original_price && <div className="form-text text-danger">{errors.original_price}</div>}
                                    </div>
                                    <div className="form-group col-md-4 mb-2">
                                        <label htmlFor="qty" className="form-label">Quantity</label>
                                        <input type="number" className={errors.qty ? "form-control border-danger" : "form-control"}
                                            value={qty} onChange={(e) => setQty(e.target.value)} id="qty" />
                                        {errors.qty && <div className="form-text text-danger">{errors.qty}</div>}
                                    </div>
                                    <div className="form-group col-md-4 mb-2">
                                        <label htmlFor="brand" className="form-label">Brand</label>
                                        <input type="text" className={errors.brand ? "form-control border-danger" : "form-control"}
                                            value={brand} onChange={(e) => setBrand(e.target.value)} id="brand" />
                                        {errors.brand && <div className="form-text text-danger">{errors.brand}</div>}
                                    </div>
                                    <div className="form-group col-md-8 mb-2">
                                        <label htmlFor="image" className="form-label">Image</label>
                                        <input type="file" name="file[]" className={errors.image ? "form-control border-danger" : "form-control"}
                                            // onChange={(e)=>setImage(e.target.files[0])} 
                                            id="image" multiple onChange={handleImageChange} />
                                        {errors.image && <div className="form-text text-danger">{errors.image}</div>}
                                        {/* <div className="result">{renderPhotos(image)}</div> */}
                                    </div>
                                    <div className="form-group col-md-4 mb-2">
                                        <label htmlFor="featured" className="form-label">Featured (checked=shown)</label>
                                        <input type="checkbox" className={errors.featured ? "border-danger m-2" : "m-2"}
                                            value={featured} onChange={(e) => setFeatured(!featured)} id="featured" />
                                        {errors.featured && <div className="form-text text-danger">{errors.featured}</div>}
                                    </div>
                                    <div className="form-group col-md-4 mb-2">
                                        <label htmlFor="popular" className="form-label">Popular (checked=shown) </label>
                                        <input type="checkbox" className={errors.popular ? "border-danger m-2" : "m-2"}
                                            value={popular} onChange={(e) => setPopular(!popular)} id="popular" />
                                        {errors.popular && <div className="form-text text-danger">{errors.popular}</div>}
                                    </div>
                                    <div className="form-group col-md-4 mb-2">
                                        <label htmlFor="status" className="form-label">status (checked=available)</label>
                                        <input type="checkbox" className="m-2" id="status" value={status} onChange={(e) => setStatus(!status)} />
                                        {errors.status && <div className="form-text text-danger">{errors.status}</div>}
                                    </div>

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

export default CreateProduct;