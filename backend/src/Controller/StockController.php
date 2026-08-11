<?php

namespace App\Controller;

use App\Entity\Stock;
use App\Entity\User;
use App\Model\ProductDto;
use App\Model\StockDto;
use App\Service\StockManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[IsGranted('ROLE_USER')]
#[Route('/api/stocks')]
final class StockController extends AbstractController
{

    public function __construct(
        private readonly ValidatorInterface $validator,
        private readonly StockManager $stockManager,
    ) {}

    #[Route('/{id}', methods: ['GET'])]
    public function get(Stock $stock): JsonResponse
    {
        return $this->json(
            $stock,
            JsonResponse::HTTP_OK,
            [],
            ['groups' => ['stock:read']],
        );
    }

    #[Route('', methods: ['POST'])]
    public function post(Request $request, #[CurrentUser] User $user): JsonResponse
    {
        $dto = $this->mapRequestToDto($request);
                
        if ($dto instanceof JsonResponse) {
            return $dto;
        }

        $stock = $this->stockManager->createFromDto($dto, $user);

        return $this->json(
            $stock,
            JsonResponse::HTTP_CREATED,
            [],
            ['groups' => ['stock:read']],
        );
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function put(Stock $stock, Request $request, #[CurrentUser] User $user): JsonResponse
    {
        $dto = $this->mapRequestToDto($request);
                
        if ($dto instanceof JsonResponse) {
            return $dto;
        }
        
        $this->stockManager->updateFromDto($stock, $dto, $user);

        return $this->json(
            $stock,
            JsonResponse::HTTP_OK,
            [],
            ['groups' => ['stock:read']],
        );
    }

    private function mapRequestToDto(Request $request): StockDto|JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $productDto = new ProductDto();
        $productDto->id = $data['productId'] ?? null;

        $dto = new StockDto();
        $dto->quantity = $data['quantity'] ?? '';
        $dto->product = $productDto;

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
