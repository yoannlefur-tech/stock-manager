<?php

declare(strict_types=1);

namespace App\Model;

class StockDto
{
    public ?int $id = null;
    public float $quantity = 0;
    public ?ProductDto $product = null;
}
