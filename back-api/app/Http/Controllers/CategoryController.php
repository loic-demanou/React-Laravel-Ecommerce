<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function getCategory()
    {
        $categories= Category::where('status', 1)->get();
        return response()->json($categories);
    }

    public function index()
    {
        $categories = Category::latest()->get();
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        // dd($request->status);
        $request->validate([
            'name' => 'required|max:50',
            'slug' => 'required|max:50',
            'description' => 'required',
            'status' => 'required',
            'metaTitle' => 'required',
            'metaDescription' => 'required',
            'metaKeyword' => 'required',
        ]);
        $category= Category::create([
            'name' => $request->name,
            'slug' => $request->slug,
            'description' => $request->description,
            'meta_title' => $request->metaTitle,
            'meta_description' => $request->metaDescription,
            'meta_keyword' => $request->metaKeyword,
            'status' => $request->status==true ? 1 : 0,
        ]);
        // $category = Category::create($request->all());
        return response()->json($category);
    }

    public function update($id, Request $request)
    {
        $cat = Category::find($id);

        $request->validate([
            'name' => 'required|max:50',
            'slug' => 'required|max:50',
            'description' => 'required',
            'status' => 'required',
            'metaTitle' => 'required',
            'metaDescription' => 'required',
            'metaKeyword' => 'required',
        ]);

        $resp = $cat->update([
            'name' => $request->name,
            'slug' => $request->slug,
            'description' => $request->description,
            'meta_title' => $request->metaTitle,
            'meta_description' => $request->metaDescription,
            'meta_keyword' => $request->metaKeyword,
            'status' => $request->status==true ? 1 : 0,
        ]);

        return response()->json($resp);
    }


    public function show($id)
    {
        $category = Category::find($id);
        return response()->json($category);
    }


    public function destroy($id)
    {
        $category = Category::find($id);
        $category->delete();
        return response()->json("deleted sucessfully");
    }

    public function getBrand($cat)
    {
        $category = Category::find($cat);
        $categories = Category::where('id', $cat);
        return response()->json($category;
    }

}
