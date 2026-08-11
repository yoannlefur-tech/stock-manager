<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\User;
use App\Model\BrandDto;
use App\Model\CategoryDto;
use App\Model\ProductDto;
use App\Model\StockDto;
use App\Repository\ProductRepository;
use App\Service\HttpParametersService;
use App\Service\ProductManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[IsGranted('ROLE_USER')]
#[Route('/api/products')]
final class ProductController extends AbstractController
{

    public function __construct(
        private readonly EntityManagerInterface $em,
        private readonly ValidatorInterface $validator,
        private readonly HttpParametersService $paramService,
        private readonly ProductRepository $productRepository,
        private readonly ProductManager $productManager,
    ) {}

    #[Route('', methods: ['GET'])]
    public function getCollection(Request $request): JsonResponse
    {
        $params = $this->paramService->extractRequestParams(
            $request,
            [
                'barcode',
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

        $products = $this->productRepository->findByParams($params);
        $total = $this->productRepository->countByParams($params);

        return $this->json(
            [
                'data' => $products,
                'meta' => [
                    'total' => $total,
                    'page' => $page,
                    'limit' => $limit,
                    'pages' => (int) ceil($total / $limit),
                ]
            ],
            200,
            [],
            ['groups' => ['product:read', 'product.small:read', 'user:read', 'category:read', 'brand:read', 'stock.small:read']],
        );
    }

    #[Route('/{id}', methods: ['GET'])]
    public function get(Product $product): JsonResponse
    {
        return $this->json(
            $product,
            JsonResponse::HTTP_OK,
            [],
            ['groups' => ['product:read', 'user:read', 'category:read', 'brand:read', 'stock.small:read']],
        );
    }

    #[Route('', name: 'api_post_product', methods: ['POST'])]
    public function post(Request $request, #[CurrentUser] User $user): JsonResponse
    {
        $dto = $this->mapRequestToDto($request);

        if ($dto instanceof JsonResponse) {
            return $dto;
        }
        
        $product = $this->productManager->createFromDto($dto, $user);

        return $this->json(
            $product,
            JsonResponse::HTTP_CREATED,
            [],
            ['groups' => ['product:read', 'user:read', 'category:read', 'brand:read', 'stock:read']],
        );
    }

    #[Route('/{id}', name: 'api_put_product', methods: ['PUT'])]
    public function put(Product $product, Request $request, #[CurrentUser] User $user): JsonResponse
    {
        $dto = $this->mapRequestToDto($request);

        if ($dto instanceof JsonResponse) {
            return $dto;
        }
        
        $this->productManager->updateFromDto($product, $dto, $user);

        return $this->json(
            $product,
            JsonResponse::HTTP_OK,
            [],
            ['groups' => ['product:read', 'user:read', 'category:read', 'brand:read']],
        );
    }

    #[Route('/{id}', name: 'delete_post', methods: ['DELETE'])]
    public function delete(Product $product): JsonResponse
    {
        $this->em->remove($product);
        $this->em->flush();

        return new JsonResponse(null, JsonResponse::HTTP_NO_CONTENT);
    }   

    private function mapRequestToDto(Request $request): ProductDto|JsonResponse
    {
        $data = json_decode($request->getContent(), true);
  
        $stockDto = new StockDto();
        $stockDto->id =  $data['stockId'] ?? null;
        $stockDto->quantity =  $data['stockQuantity'] ?? '';

        $brandDto = new BrandDto();
        $brandDto->id =  $data['brandId'] ?? null;
        $brandDto->name =  $data['brandName'] ?? '';

        $categoryDto = new CategoryDto();
        $categoryDto->id =  $data['categoryId'] ?? null;
        $categoryDto->name =  $data['categoryName'] ?? '';

        $dto = new ProductDto();
        $dto->name = $data['name'] ?? '';
        $dto->barcode  = $data['barcode'] ?? '';
        $dto->dlc  = $data['dlc'] ?? '';
        $dto->category = $categoryDto;
        $dto->brand  = $brandDto;
        $dto->stock  = $stockDto;

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
