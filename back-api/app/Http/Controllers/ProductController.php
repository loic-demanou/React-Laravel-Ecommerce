<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required',
            'name' => 'required|max:100',
            'slug' => 'required|max:100',
            'description' => 'nullable',
            'brand' => 'required|max:100',
            'meta_title' => 'required|max:100',
            'meta_description' => 'nullable',
            'meta_keyword' => 'required|max:100',
            'selling_price' => 'required',
            'original_price' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'qty' => 'required',
        ]);

        $product = new Product;
        // $produts = Product::create([
            $product->category_id = $request->category_id;
            $product->name = $request->name;
            $product->slug = $request->slug;
            $product->description = $request->description;
            $product->brand = $request->brand;
            $product->meta_title = $request->meta_title;
            $product->meta_description = $request->meta_description;
            $product->meta_keyword = $request->meta_keyword;
            $product->selling_price = $request->selling_price;
            $product->original_price = $request->original_price;
            $product->qty = $request->qty;
            $product->status = $request->status==true ? 1 : 0;
            $product->featured = $request->featured==true ? 1 : 0;
            $product->popular = $request->popular==true ? 1 : 0;

            if ($request->image) {
                $file= $request->file('image');
                $extension= $file->getClientOriginalExtension();
                $filename= time() .'.'.$extension;
                $file->move('uploads/product/', $filename);
                $product->image= 'uploads/product/'.$filename;
            }
            $product->save();

            return response()->json($product);
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        $product->delete();
        return response()->json('Deleted sucessfully');
    }
}
