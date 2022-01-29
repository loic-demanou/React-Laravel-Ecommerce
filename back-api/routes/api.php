<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ChartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\CollectionController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SocialShareController;
use App\Http\Controllers\SortController;
use App\Http\Controllers\UserController;
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

Route::middleware(['auth:sanctum', 'isAPIAdmin'])->group(function () {

    Route::get('/checkingAuthenticated', function () {
        return response()->json(['message' => 'You are in', 'status' => 200], 200);
    });

    Route::get('/DashboardCharts', [ChartController::class, 'DashboardCharts']);


    Route::get('/users', [UserController::class, 'index'])->name('user.index');
    Route::get('/categories', [CategoryController::class, 'index'])->name('category.index');
    Route::post('/create-category', [CategoryController::class, 'store'])->name('category.store');
    Route::get('/admin/category/show/{id}', [CategoryController::class, 'show'])->name('category.show');
    Route::post('/admin/category/update/{id}', [CategoryController::class, 'update'])->name('category.update');
    Route::delete('/category/delete/{id}', [CategoryController::class, 'destroy'])->name('category.destroy');


    // Route::post('/logout', [AuthController::class, 'logout']);
});
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/getCategory', [CategoryController::class, 'getCategory']);
Route::post('/create-product', [ProductController::class, 'store']);
Route::delete('/product/delete/{id}', [ProductController::class, 'destroy'])->name('product.destroy');
Route::get('/fetch-home-products', [ProductController::class, 'fetchHomeProducts']);

Route::post('/add-to-cart', [CartController::class, 'addToCart'])->name('cart.add');
Route::get('/cart', [CartController::class, 'getCart'])->name('cart.get');
Route::put('/cart-updatequantity/{cart_id}/{scope}', [CartController::class, 'updateQuantity'])->name('qty.update');


Route::delete('/delete-cartitem/{cart_id}', [CartController::class, 'deleteCartItem'])->name('cart.deleteItem');

Route::post('/place-order', [CheckoutController::class, 'placeorder']);
Route::post('/validate-order', [CheckoutController::class, 'validateOrder']);
Route::get('/ventes', [CheckoutController::class, 'ventes']);


Route::get('/pricefilter/{minPrice}/{maxPrice}', [SortController::class, 'pricefilter']);
Route::get('/sortSection/{categoryId}/{data}', [SortController::class, 'sortSection']);
Route::get('/sortShopage/{data}', [SortController::class, 'sortShopage']);
Route::get('/searchSection/{categoryId}/{data}', [SortController::class, 'searchSection']);
Route::get('/searchShopage/{data}', [SortController::class, 'searchShopage']);


Route::get('/social-share-fb/{category_slug}/{product_slug}', [SocialShareController::class, 'index'])->name('social.index');
Route::get('/social-share-tw/{category_slug}/{product_slug}', [SocialShareController::class, 'twitter'])->name('social.twitter');
Route::get('/social-share-ln/{category_slug}/{product_slug}', [SocialShareController::class, 'linkedIn'])->name('social.linkedin');
Route::get('/social-share-wa/{category_slug}/{product_slug}', [SocialShareController::class, 'whatsapp'])->name('social.whatsapp');
Route::get('/social-share-te/{category_slug}/{product_slug}', [SocialShareController::class, 'telegram'])->name('social.telegram');


Route::middleware(['auth:sanctum'])->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::get('/getCollections', [CollectionController::class, 'index'])->name('collection.index');
Route::get('/getCollections/{slug}', [CollectionController::class, 'getWithSlug'])->name('collection.slug');

Route::get('/getOthersProduct/{slug}', [ProductController::class, 'getOthersProduct'])->name('others.products');

Route::get('/view-product/{category_slug}/{product_slug}', [CollectionController::class, 'viewproduct'])->name('product.show');
