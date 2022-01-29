<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::latest()->get();
        return response() -> json([
            'status'=> 200,
            'users'=> $users,
        ]);
    }
}