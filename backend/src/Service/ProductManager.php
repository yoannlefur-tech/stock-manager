<?php

namespace App\Service;

use App\Entity\Brand;
use App\Entity\Category;
use App\Entity\Product;
use App\Entity\Stock;
use App\Entity\User;
use App\Model\BrandDto;
use App\Model\BrandDtoCollection;
use App\Model\CategoryDto;
use App\Model\ProductDto;
use App\Model\StockDto;
use App\Repository\BrandRepository;
use App\Repository\CategoryRepository;
use App\Repository\StockRepository;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;

final readonly class ProductManager
{
    public function __construct(
        private BrandRepository $brandRepository,
        private CategoryRepository $categoryRepository,
        private StockRepository $stockRepository,
        private EntityManagerInterface $em,
    ) {}

    public function createFromDto(ProductDto $dto, User $user): Product
    {



        $product = (new Product())
            ->setName($dto->name)
            ->setBarcode($dto->barcode)
            ->setDlc(new DateTimeImmutable($dto->dlc))
            ->setCreatedBy($user)
            ->setUpdatedAt(new DateTimeImmutable())
            ->setUpdatedBy($user)
            ->setCategory($this->resolveCategory($dto->category, $user))
            ->setStock($this->resolveStock($dto->stock, $user));

        $brands = $this->resolveBrand($dto->brands, $user);
        foreach ($brands as $brand) {
            $product->addBrand($brand);
        }
        
        $this->em->persist($product);
        $this->em->flush();

        return $product;
    }

    public function updateFromDto(Product $product, ProductDto $dto, User $user): void
    {
        $product
            ->setName($dto->name)
            ->setBarcode($dto->barcode)
            ->setDlc(new DateTimeImmutable($dto->dlc))
            ->setUpdatedAt(new DateTimeImmutable())
            ->setUpdatedBy($user)
            ->setCategory($this->resolveCategory($dto->category, $user))
            ->setStock($this->resolveStock($dto->stock, $user));

        foreach ($product->getBrands()->toArray() as $brand) {
            $product->removeBrand($brand);
        }
        
        $brands = $this->resolveBrand($dto->brands, $user);
        foreach ($brands as $brand) {
            $product->addBrand($brand);
        }

        $this->em->flush();
    }

    public function delete(Product $product): void
    {
        $this->em->remove($product);
        $this->em->flush();
    }

    public function resolveBrand(BrandDtoCollection $brandDtoCollection, User $user): array
    {
        $brands = [];

        /** @var BrandDto $brandDto */
        foreach ($brandDtoCollection as $brandDto) {
            
            if ($brandDto->id !== null && $brand = $this->brandRepository->find($brandDto->id)) {
                $brands[] = $brand;
                continue;
            }

            $brands[] = (new Brand())
                ->setName($brandDto->name)
                ->setCreatedBy($user)
                ->setUpdatedAt(new DateTimeImmutable())
                ->setUpdatedBy($user);
        }

        return $brands;
    }

    public function resolveCategory(CategoryDto $dto, User $user): Category
    {
        if ($dto->id !== null && $category = $this->categoryRepository->find($dto->id)) {
            return $category;
        }

        return (new Category())
            ->setName($dto->name)
            ->setCreatedBy($user)
            ->setUpdatedAt(new DateTimeImmutable())
            ->setUpdatedBy($user);
    }

    public function resolveStock(StockDto $dto, User $user): Stock
    {
        if ($dto->id !== null) {
            /** @var Stock|null $stock */
            $stock = $this->stockRepository->find($dto->id);

            if ($stock !== null) {
                if ($dto->quantity !== $stock->getQuantity()) {
                    $stock->setQuantity($dto->quantity);
                }
                return $stock;
            }
        }

        return (new Stock())
            ->setQuantity($dto->quantity)
            ->setCreatedBy($user)
            ->setUpdatedAt(new DateTimeImmutable())
            ->setUpdatedBy($user);
    }
}
