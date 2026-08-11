<?php

namespace App\Service;

use App\Entity\Product;
use App\Entity\Stock;
use App\Entity\User;
use App\Exception\ProductNotFoundException;
use App\Model\ProductDto;
use App\Model\StockDto;
use App\Repository\ProductRepository;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;

final readonly class StockManager
{
    public function __construct(
        private EntityManagerInterface $em,
        private ProductRepository $productRepository
    ) {}

    public function createFromDto(StockDto $dto, User $user): Stock
    {
        $stock = (new Stock())
            ->setQuantity($dto->quantity)
            ->setProduct($this->resolveProduct($dto->product, $user))
            ->setCreatedBy($user)
            ->setUpdatedAt(new DateTimeImmutable())
            ->setUpdatedBy($user);

        $this->em->persist($stock);
        $this->em->flush();

        return $stock;
    }

    public function updateFromDto(Stock $stock, StockDto $dto, User $user): void
    {
        $stock
            ->setQuantity($dto->quantity)
            ->setProduct($this->resolveProduct($dto->product, $user))
            ->setUpdatedAt(new DateTimeImmutable())
            ->setUpdatedBy($user);

        $this->em->flush();

    }

    public function resolveProduct(ProductDto $dto, User $user): Product
    {
        if ($dto->id !== null && $product = $this->productRepository->find($dto->id)) {
            return $product;
        }

        throw new ProductNotFoundException($dto->id ?? 0);
    }
}