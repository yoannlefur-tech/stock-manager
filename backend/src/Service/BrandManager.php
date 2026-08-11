<?php

namespace App\Service;

use App\Entity\Brand;
use App\Entity\User;
use App\Model\BrandDto;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;

final readonly class BrandManager
{
    public function __construct(
        private EntityManagerInterface $em,
    ) {}

    public function createFromDto(BrandDto $dto, User $user): Brand
    {
        $brand = (new Brand())
            ->setName($dto->name)
            ->setCreatedBy($user)
            ->setUpdatedAt(new DateTimeImmutable())
            ->setUpdatedBy($user);

        $this->em->persist($brand);
        $this->em->flush();

        return $brand;
    }

    public function updateFromDto(Brand $brand, BrandDto $dto, User $user): void
    {
        $brand
            ->setName($dto->name)
            ->setUpdatedAt(new DateTimeImmutable())
            ->setUpdatedBy($user);

        $this->em->flush();

    }
}