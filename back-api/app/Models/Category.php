<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    // protected $fillable = ['name', 'slug', 'description', 'status',
    // 'meta_name', 'meta_description', 'meta_keyword'];
    protected $guarded= [];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
