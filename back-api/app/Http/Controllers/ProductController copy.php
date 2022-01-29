<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Image;
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
            'name' => 'required|max:300',
            'slug' => 'required|max:100',
            'description' => 'nullable',
            'brand' => 'required|max:100',
            'meta_title' => 'required|max:100',
            'meta_description' => 'nullable',
            'meta_keyword' => 'required|max:100',
            'selling_price' => 'required',
            'original_price' => 'required',
            // 'image' => 'required|image|mimes:jpeg,png,jpg',
            // 'image.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'qty' => 'required',
        ]);
        $product = new Product;
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
        $product->status = $request->status == true ? 1 : 0;
        $product->featured = $request->featured == true ? 1 : 0;
        $product->popular = $request->popular == true ? 1 : 0;
        $product->save();

        if ($request->image) {

            $files = $request->image;
            foreach ($request->image as $image) {
                $filename = time(). '.'.$image->getClientOriginalExtension();
                $image->move('uploads/', $filename);
                // $data[] = $filename;
                $image = Image::create([
                    'product_id' => $product->id,
                    'image' => $filename
                ]);
                // $image= $product->images()->create($request->all());
            }
            return response()->json([
                'product' => $product,
                'image' => $image,
                'message' => "avec image"
            ]);
        }
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        $product->delete();
        return response()->json('Deleted sucessfully');
    }

    public function getOthersProduct($slug)
    {
        // $category = Category::find($slug);
        // $prod->products()->get();
        $category = Category::where('slug', $slug)
            ->where('status', 1)->first();

        $product = Product::where('category_id', $category->id)
            ->where('status', 1)
            ->inRandomOrder()->limit(3)->get();

        return response()->json([
            'product' => $product,
            'category' => $category,
        ]);
    }

    public function fetchHomeProducts()
    {
        $product = Product::where('status', 1)
            ->inRandomOrder()->limit(10)->get();
        return response()->json([
            'product' => $product,
        ]);
    }
}
