<?php

namespace App\Exception;

use DomainException;

final class ProductNotFoundException extends DomainException {

    public function __construct(int $id)
    {
        parent::__construct("Produit #{$id} introuvable");
    }
}