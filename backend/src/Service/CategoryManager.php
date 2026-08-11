<?php

namespace App\Service;

use App\Entity\Category;
use App\Entity\User;
use App\Model\CategoryDto;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;

final readonly class CategoryManager
{
    public function __construct(
        private EntityManagerInterface $em,
    ) {}

    public function createFromDto(CategoryDto $dto, User $user): Category
    {
        $category = (new Category())
            ->setName($dto->name)
            ->setCreatedBy($user)
            ->setUpdatedAt(new DateTimeImmutable())
            ->setUpdatedBy($user);

        $this->em->persist($category);
        $this->em->flush();

        return $category;
    }

    public function updateFromDto(Category $category, CategoryDto $dto, User $user): void
    {
        $category
            ->setName($dto->name)
            ->setUpdatedAt(new DateTimeImmutable())
            ->setUpdatedBy($user);

        $this->em->flush();
    }
}
