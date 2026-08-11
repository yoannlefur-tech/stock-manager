<?php

namespace App\Controller;

use App\Entity\User;
use App\Model\UserDto;
use App\Service\UserManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[IsGranted('ROLE_USER')]
#[Route('/api')]
final class UserController extends AbstractController
{

    public function __construct(
        private readonly ValidatorInterface $validator,
        private readonly UserManager $userManager,
    ) {}

    #[Route('/me', methods: ['GET'])]
    public function getMe(#[CurrentUser] User $user): JsonResponse
    {
        return $this->json([
            'id'    => $user->getId(),
            'firstName' => $user->getFirstName(),
            'lastName' => $user->getLastName(),
            'email' => $user->getUserIdentifier(),
        ]);
    }


    #[Route('/users/{id}', methods: ['PUT'])]
    public function put(User $user, Request $request): JsonResponse
    {
        $dto = $this->mapRequestToDto($request);

        if ($dto instanceof JsonResponse) {
            return $dto;
        }

        $this->userManager->updateFromDto($user, $dto);

        return $this->json(
            $user,
            JsonResponse::HTTP_OK,
            [],
            ['groups' => ['user:read']],
        );
    }

    private function mapRequestToDto(Request $request): UserDto|JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $dto = new UserDto();
        $dto->firstName = $data['firstName'] ?? '';
        $dto->lastName  = $data['lastName'] ?? '';
        $dto->email     = $data['email'] ?? '';

        $errors = $this->validator->validate($dto);

        if (count($errors) > 0) {
            return $this->json(
                ['errors' => array_map(
                    fn($e) => ['field' => $e->getPropertyPath(), 'message' => $e->getMessage()],
                    iterator_to_array($errors),
                )],
                JsonResponse::HTTP_UNPROCESSABLE_ENTITY,
            );
        }

        return $dto;
    }
}
