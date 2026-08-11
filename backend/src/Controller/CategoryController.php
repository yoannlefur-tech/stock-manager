<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\User;
use App\Model\CategoryDto;
use App\Repository\CategoryRepository;
use App\Service\CategoryManager;
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
#[Route('/api/categories')]
final class CategoryController extends AbstractController
{

    public function __construct(
        private readonly EntityManagerInterface $em,
        private readonly ValidatorInterface $validator,
        private readonly HttpParametersService $paramService,
        private readonly CategoryRepository $categoryRepository,
        private readonly CategoryManager $categoryManager,
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

        $categories = $this->categoryRepository->findByParams($params);
        $total = $this->categoryRepository->countByParams($params);

        return $this->json(
            [
                'data' => $categories,
                'meta' => [
                    'total' => $total,
                    'page' => $page,
                    'limit' => $limit,
                    'pages' => (int) ceil($total / $limit),
                ]
            ],
            200,
            [],
            ['groups' => ['category:read']]
        );
    }

    #[Route('/{id}', methods: ['GET'])]
    public function get(Category $category): JsonResponse
    {
        return $this->json(
            $category,
            JsonResponse::HTTP_OK,
            [],
            ['groups' => ['category:read']],
        );
    }

    #[Route('', methods: ['POST'])]
    public function post(Request $request, #[CurrentUser] User $user): JsonResponse
    {
        $dto = $this->mapRequestToDto($request);

        if ($dto instanceof JsonResponse) {
            return $dto;
        }

        $category = $this->categoryManager->createFromDto($dto, $user);

        return $this->json(
            $category,
            JsonResponse::HTTP_CREATED,
            [],
            ['groups' => ['brand:read']],
        );
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function put(Category $category, Request $request, #[CurrentUser] User $user): JsonResponse
    {
        $dto = $this->mapRequestToDto($request);

        if ($dto instanceof JsonResponse) {
            return $dto;
        }

        $this->categoryManager->updateFromDto($category, $dto, $user);

        return $this->json(
            $category,
            JsonResponse::HTTP_OK,
            [],
            ['groups' => ['category:read']],
        );
    }

    #[Route('/{id}', name: 'delete_post', methods: ['DELETE'])]
    public function delete(Category $category): JsonResponse
    {
        $this->em->remove($category);
        $this->em->flush();

        return new JsonResponse(null, JsonResponse::HTTP_NO_CONTENT);
    }

    private function mapRequestToDto(Request $request): CategoryDto|JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $dto = new CategoryDto();
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
