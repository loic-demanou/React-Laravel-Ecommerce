<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CollectionController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    //     return $request->user();
    // });
    
    Route::middleware(['auth:sanctum','isAPIAdmin'])->group(function () {
        
        Route::get('/checkingAuthenticated', function () {
            return response()->json(['message' => 'You are in', 'status' => 200], 200);
        });

        Route::get('/categories', [CategoryController::class, 'index'])->name('category.index');
        Route::post('/create-category', [CategoryController::class, 'store'])->name('category.store');
        Route::get('/admin/category/show/{id}', [CategoryController::class, 'show'])->name('category.show');
        Route::put('/admin/category/update/{id}', [CategoryController::class, 'update'])->name('category.update');
        Route::delete('/category/delete/{id}', [CategoryController::class, 'destroy'])->name('category.destroy');

        
        // Route::post('/logout', [AuthController::class, 'logout']);
    });
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/getCategory', [CategoryController::class, 'getCategory']);
    Route::post('/create-product', [ProductController::class, 'store']);
    Route::delete('/product/delete/{id}', [ProductController::class, 'destroy'])->name('product.destroy');

    Route::post('/add-to-cart', [CartController::class, 'addToCart'])->name('cart.add');
    Route::get('/cart', [CartController::class, 'getCart'])->name('cart.get');
    Route::put('/cart-updatequantity/{cart_id}/{scope}', [CartController::class, 'updateQuantity'])->name('qty.update');
    Route::delete('/delete-cartitem/{cart_id}', [CartController::class, 'deleteCartItem'])->name('cart.deleteItem');


    Route::middleware(['auth:sanctum'])->group(function () {
        
        Route::post('/logout', [AuthController::class, 'logout']);

});

// Route::get('/categories', [CategoryController::class, 'index'])->name('category.index');
// Route::post('/create-category', [CategoryController::class, 'store'])->name('category.store');
// Route::get('/admin/category/show/{id}', [CategoryController::class, 'show'])->name('category.show');
// Route::put('/admin/category/update/{id}', [CategoryController::class, 'update'])->name('category.update');
// Route::delete('/category/delete/{id}', [CategoryController::class, 'destroy'])->name('category.destroy');

// Route::get('/products', [ProductController::class, 'index'])->name('products.index');
// Route::get('/getCategory', [CategoryController::class, 'getCategory']);
// Route::post('/create-product', [ProductController::class, 'store']);
// Route::delete('/product/delete/{id}', [ProductController::class, 'destroy'])->name('product.destroy');

Route::get('/getCollections', [CollectionController::class, 'index'])->name('collection.index');
Route::get('/getCollections/{slug}', [CollectionController::class, 'getWithSlug'])->name('collection.slug');
Route::get('/view-product/{category_slug}/{product_slug}', [CollectionController::class, 'viewproduct'])->name('product.show');