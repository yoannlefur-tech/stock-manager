<?php

declare(strict_types=1);

namespace App\Model;

use App\Model\StockDto;
use Symfony\Component\Validator\Constraints as Assert;

class ProductDto
{
    public ?int $id = null;
    #[Assert\NotBlank]
    #[Assert\Length(min: 2, max: 255)]
    public ?string $name = null;
    public ?string $barcode = null;
    #[Assert\Date]
    public ?string $dlc = null;
    public ?CategoryDto $category = null;
    public BrandDtoCollection|array $brands;
    public ?StockDto $stock = null;
}
