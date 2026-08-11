<?php

declare(strict_types=1);

namespace App\Model;

use Symfony\Component\Validator\Constraints as Assert;

class CategoryDto
{
    public ?int $id = null;
    #[Assert\NotBlank]
    #[Assert\Length(min: 1, max: 255)]
    public ?string $name = null;
}
