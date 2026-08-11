<?php

namespace App\EventListener;

use App\Exception\ProductNotFoundException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;

#[AsEventListener(event: KernelEvents::EXCEPTION)]
final class ApiExceptionListener
{
    public function __invoke(ExceptionEvent $event): void
    {
        $exception = $event->getThrowable();
        
        if (!str_starts_with($event->getRequest()->attributes->get('_route') ?? '', 'api_')
            && !str_starts_with($event->getRequest()->getPathInfo(), '/api/')) {
            return;
        }

        if ($exception instanceof ProductNotFoundException) {
            $event->setResponse(new JsonResponse(
                ['error' => $exception->getMessage()],
                JsonResponse::HTTP_NOT_FOUND,
            ));
        }
    }
}