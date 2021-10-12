<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        if (auth('sanctum')->check()) {

            $user_id = auth('sanctum')->user()->id;
            $product_id = $request->product_id;
            $product_qty = $request->product_qty;

            // $checkProduct = Product::where('id', $product_id)->first();
            $checkProduct = Product::find($product_id);
            if ($checkProduct) {
                if (Cart::where('product_id', $product_id)->where('user_id', $user_id)->exists()) {
                    return response()->json([
                        'status' => 409,
                        'message' => 'Ce produit est déja dans le panier',
                    ]);    
                } else {
                    $cart = Cart::create([
                        'user_id' =>$user_id,
                        'product_id' =>$product_id,
                        'product_qty' =>$product_qty,
                    ]);

                    return response()->json([
                        'status' => 201,
                        'message' => 'Ajouté au panier avec success',
                    ]);
                }
                
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => "Le produit n'existe pas",
                ]);

            }
            

        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Vous devez être connecté',
            ]);
        }
        
    }

    public function getCart()
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartitems = Cart::where('user_id', $user_id)->get();

            return response()->json([
                'status' => 200,
                'cart' => $cartitems,
            ]);

        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Vous devez être connecté',
            ]);
        }
        
    }

    public function updateQuantity($cart_id, $scope)
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartitem = Cart::where('id', $cart_id)->where('user_id', $user_id)->first();
            if ($scope == "inc") {
                $cartitem->product_qty += 1;
            }else if($scope == "dec"){
                $cartitem->product_qty -= 1;
            }
            $cartitem->update();
            return response()->json([
                'status' => 200,
                'message' => 'Qty Updated',
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Vous devez être connecté',
            ]);
        }
    }

    public function deleteCartItem($cart_id)
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartitem = Cart::where('id', $cart_id)->where('user_id', $user_id)->first();
            if ($cartitem) {
                $cartitem->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Le produit a été rétiré au panier',
                ]);    
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Le produit est introuvable',
                ]);    
            }
            
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Vous devez être connecté',
            ]);
        }
    }
}
