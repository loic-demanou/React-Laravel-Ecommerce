<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class CollectionController extends Controller
{
    public function index()
    {
        $collection = Category::where('status', 1)->get();
        return response()->json($collection);
    }

    public function getWithSlug($slug)
    {
        // $category = Category::find($slug);
        // $prod->products()->get();
        $category = Category::where('slug', $slug)
        ->where('status', 1)->first();

        $product= Product::where('category_id', $category->id)
        ->where('status', 1)->get();

        return response()->json([
            'product'=>$product,
            'category'=>$category,
        ]);
        // return response()->json($prod->products->get());
        // $product = Product::where()
    }

    public function viewproduct($category_slug, $product_slug)
    {
        $category = Category::where('slug', $category_slug)
        ->where('status', 1)
        ->first();

        $product= Product::where('category_id', $category->id)
        ->where('slug', $product_slug)
        ->where('status', 1)
        ->first();

        return response()->json([
            'product'=>$product,
            // 'category'=>$category,
        ]);

    }
}
