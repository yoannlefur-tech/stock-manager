<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[IsGranted('ROLE_USER')]
#[Route('/api')]
final class DefaultController extends AbstractController
{
    #[Route('/health', methods: ['GET'])]
    public function getHealth(): JsonResponse
    {
        return $this->json("OK");
    }
}
