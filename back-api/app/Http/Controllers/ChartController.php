<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChartController extends Controller
{
    public function DashboardCharts()
    {
        // Start user Chart
    $users = User::select(DB::raw('COUNT(*) as count'))
    ->whereYear('created_at', date('Y'))
    ->groupBy(DB::raw("Month(created_at)"))
    ->pluck('count');

    $months = User::select(DB::raw('Month(created_at) as month'))
        ->whereYear('created_at', date('Y'))
        ->groupBy(DB::raw("Month(created_at)"))
        ->pluck('month');

    $usersData = array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

    foreach ($months as $index => $month) {
        $usersData[$month] = $users[$index];
    }
    // End user Chart
    // Start order Chart
    $orders = Order::select(DB::raw('COUNT(*) as count'))
    ->whereYear('created_at', date('Y'))
    ->groupBy(DB::raw("Month(created_at)"))
    ->pluck('count');

    $months = Order::select(DB::raw('Month(created_at) as month'))
        ->whereYear('created_at', date('Y'))
        ->groupBy(DB::raw("Month(created_at)"))
        ->pluck('month');

    $ordersData = array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

    foreach ($months as $index => $month) {
        $ordersData[$month] = $orders[$index];
    }

    // end user Chart
    // Start Product Chart
    $products = Product::select(DB::raw('COUNT(*) as count'))
    ->whereYear('created_at', date('Y'))
    ->groupBy(DB::raw("Month(created_at)"))
    ->pluck('count');

    $months = Product::select(DB::raw('Month(created_at) as month'))
        ->whereYear('created_at', date('Y'))
        ->groupBy(DB::raw("Month(created_at)"))
        ->pluck('month');

    $productsData = array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

    foreach ($months as $index => $month) {
        $productsData[$month] = $products[$index];
    }

    // end product Chart

    return response()->json([
        'usersNbre' => $usersData,
        'orderNbre' => $ordersData,
        'productNbre' => $productsData,
        // 'usersNbre' => json_encode($users,JSON_NUMERIC_CHECK)
    ]);
    }
}
