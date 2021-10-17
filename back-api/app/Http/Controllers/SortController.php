<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class SortController extends Controller
{
    public function sortSection(Request $request, $category, $data)
    {
        if ($data == 'price') {
            $prod= Product::where('category_id', $category)->orderBy('name', 'ASC')->get();
            return response()->json([
                'data'=> "price",
                'category'=> $category,
                'product'=> $prod,
            ]);
        }elseif ($data == 'name') {
            $prod= Product::where('category_id', $category)->orderBy('selling_price', 'ASC')->get();
            return response()->json([
                'data'=> "name",
                'category'=> $category,
                'product'=> $prod,
            ]);
        }else {
            return response()->json([
                'data'=> "no selection",
                'category'=> $category,
                'product'=> "none",
            ]);
        }
        
    }
    public function searchSection(Request $request, $category, $data)
    {
            $prod= Product::where('category_id', $category)
            ->where('name', 'like', "%$data%")
            ->get();
            return response()->json([
                'data'=> $data,
                'category'=> $category,
                'product'=> $prod,
            ]);
    }

    public function sortShopage($data)
    {
        if ($data == 'price') {
            $prod= Product::orderBy('name', 'ASC')->get();
            return response()->json([
                'data'=> "price",
                'product'=> $prod,
            ]);
        }elseif ($data == 'name') {
            $prod= Product::orderBy('selling_price', 'ASC')->get();
            return response()->json([
                'data'=> "name",
                'product'=> $prod,
            ]);
        }else {
            return response()->json([
                'data'=> "no selection",
                'product'=> "none",
            ]);
        }
        
    }

    public function searchShopage($data)
    {
            $prod= Product::where('name', 'like', "%$data%")
            ->get();
            return response()->json([
                'data'=> $data,
                // 'category'=> $category,
                'product'=> $prod,
            ]);
    }

}


