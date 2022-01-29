<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $guarded= [];

    protected $with= ['category'];
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
        // return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function orderitems()
    {
        return $this->hasMany(Orderitems::class, 'order_id', 'id');
    }
}
