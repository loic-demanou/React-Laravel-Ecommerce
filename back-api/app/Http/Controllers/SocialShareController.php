<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Jorenvh\Share\ShareFacade;

class SocialShareController extends Controller
{
    public function index($category_slug, $product_slug)
    {
        // $product = Product::find($id);
        $category = Category::where('slug', $category_slug)
        ->where('status', 1)
        ->first();

        $product= Product::where('category_id', $category->id)
        ->where('slug', $product_slug)
        ->where('status', 1)
        ->first();


        // $facebook = ShareFacade::page('http://localhost:3000/collections/Smartphone/Huawei'.$product->id, $product->name .' DETAILS = '. $product->description)
        $facebook = ShareFacade::page('http://localhost:3000/collections/'.$category->slug.'/'.$product->slug, $product->name .' DETAILS = '. $product->description)
        ->facebook()
        ->getRawLinks();

        // return view('profiles.social-share', compact('facebook'));
        return response()->json([
            'link'=>$facebook,
            'category'=>$category,
            'product'=>$product,
        ]);
    } 

    public function twitter($category_slug, $product_slug)
    {
        $category = Category::where('slug', $category_slug)
        ->where('status', 1)
        ->first();

        $product= Product::where('category_id', $category->id)
        ->where('slug', $product_slug)
        ->where('status', 1)
        ->first();

        // $product = Product::find($id);
        $twitter = ShareFacade::page('http://localhost:3000/collections/'.$category.'/'.$product, $product->name .' DETAILS = '. $product->description)
        ->twitter()
        ->getRawLinks();
        return view('profiles.social-share', compact('twitter'));
    }

    public function linkedin($category_slug, $product_slug)
    {
        $category = Category::where('slug', $category_slug)
        ->where('status', 1)
        ->first();

        $product= Product::where('category_id', $category->id)
        ->where('slug', $product_slug)
        ->where('status', 1)
        ->first();

        // $product = Product::find($id);
        $linkedin = ShareFacade::page('http://localhost:3000/collections/'.$category.'/'.$product, $product->name .' DETAILS = '. $product->description)
        ->linkedin()
        ->getRawLinks();
        return view('profiles.social-share', compact('linkedin'));
    }

    public function whatsapp($category_slug, $product_slug)
    {
        $category = Category::where('slug', $category_slug)
        ->where('status', 1)
        ->first();

        $product= Product::where('category_id', $category->id)
        ->where('slug', $product_slug)
        ->where('status', 1)
        ->first();

        // $product = Product::find($id);
        $whatsapp = ShareFacade::page('http://localhost:3000/collections/'.$category->slug.'/'.$product->slug, $product->name .' DETAILS = '. $product->description)
        ->whatsapp()
        ->getRawLinks();
        return response()->json([
            'link'=>$whatsapp,
            'category'=>$category,
            'product'=>$product,
        ]);

    }

    public function telegram($category_slug, $product_slug)
    {
        $category = Category::where('slug', $category_slug)
        ->where('status', 1)
        ->first();

        $product= Product::where('category_id', $category->id)
        ->where('slug', $product_slug)
        ->where('status', 1)
        ->first();

        // $product = Product::find($id);
        $telegram = ShareFacade::page('http://localhost:3000/collections/'.$category.'/'.$product, $product->name .' DETAILS = '. $product->description)
        ->telegram()
        ->getRawLinks();
        return view('profiles.social-share', compact('telegram'));
    }

}
