<?php

namespace App\Controller;

use App\Entity\Brand;
use App\Entity\User;
use App\Model\BrandDto;
use App\Repository\BrandRepository;
use App\Service\BrandManager;
use App\Service\HttpParametersService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[IsGranted('ROLE_USER')]
#[Route('/api/brands')]
final class BrandController extends AbstractController
{

    public function __construct(
        private readonly EntityManagerInterface $em,
        private readonly ValidatorInterface $validator,
        private readonly HttpParametersService $paramService,
        private readonly BrandRepository $brandRepository,
        private readonly BrandManager $brandManager,
    ) {}

    #[Route('', methods: ['GET'])]
    public function getCollection(Request $request): JsonResponse
    {
        $params = $this->paramService->extractRequestParams(
            $request,
            [
                'name',
                'page',
                'limit',
                'offset',
                'createdAt',
                'updatedAt',
                'search',
            ]
        );

        $page  = max(1, (int) ($params['page'] ?? 1));
        $limit = min(50, max(1, (int) ($params['limit'] ?? 10)));

        $params['limit'] = $limit;
        $params['offset'] = ($page - 1) * $limit;

        $brands = $this->brandRepository->findByParams($params);
        $total = $this->brandRepository->countByParams($params);

        return $this->json(
            [
                'data' => $brands,
                'meta' => [
                    'total' => $total,
                    'page' => $page,
                    'limit' => $limit,
                    'pages' => (int) ceil($total / $limit),
                ]
            ],
            200,
            [],
            ['groups' => ['brand:read']]
        );
    }

    #[Route('/{id}', methods: ['GET'])]
    public function get(Brand $brand): JsonResponse
    {
        return $this->json(
            $brand,
            JsonResponse::HTTP_OK,
            [],
            ['groups' => ['brand:read']],
        );
    }

    #[Route('', methods: ['POST'])]
    public function post(Request $request, #[CurrentUser] User $user): JsonResponse
    {
        $dto = $this->mapRequestToDto($request);

        if ($dto instanceof JsonResponse) {
            return $dto;
        }

        $brand = $this->brandManager->createFromDto($dto, $user);

        return $this->json(
            $brand,
            JsonResponse::HTTP_CREATED,
            [],
            ['groups' => ['brand:read']],
        );
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function put(Brand $brand, Request $request, #[CurrentUser] User $user): JsonResponse
    {
        $dto = $this->mapRequestToDto($request);

        if ($dto instanceof JsonResponse) {
            return $dto;
        }

        $this->brandManager->updateFromDto($brand, $dto, $user);

        return $this->json(
            $brand,
            JsonResponse::HTTP_OK,
            [],
            ['groups' => ['brand:read']],
        );
    }

    #[Route('/{id}', name: 'delete_post', methods: ['DELETE'])]
    public function delete(Brand $brand): JsonResponse
    {
        $this->em->remove($brand);
        $this->em->flush();

        return new JsonResponse(null, JsonResponse::HTTP_NO_CONTENT);
    }

    private function mapRequestToDto(Request $request): BrandDto|JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $dto = new BrandDto();
        $dto->name = $data['name'] ?? '';

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
