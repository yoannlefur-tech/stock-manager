<?php

namespace App\Service;

use App\Entity\User;
use App\Model\UserDto;
use Doctrine\ORM\EntityManagerInterface;

final readonly class UserManager
{
    public function __construct(
        private EntityManagerInterface $em,
    ) {}

    public function updateFromDto(User $user, UserDto $dto): void
    {
        $user
            ->setFirstName($dto->firstName)
            ->setLastName($dto->lastName)
            ->setEmail($dto->email);

        $this->em->flush();

    }
}