<?php

namespace App\Repository;

use App\Entity\Product;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Product>
 */
class ProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Product::class);
    }

    /**
     * @param array<string, mixed> $params
     *
     * @return QueryBuilder
     */
    public function buildQueryWithParams(array $params, QueryBuilder $query): QueryBuilder
    {
        foreach ($params as $key => $value) {
            switch ($key) {
                case 'search':
                    if (empty($value)) {
                        break;
                    }
                    $value = trim($value);
                    $query->andWhere(
                        'p.name like :name
                        OR p.barcode like :barcode'
                    )
                        ->setParameter('name', "%{$value}%")
                        ->setParameter('barcode', "%{$value}%");
                    break;
                case 'barcode':
                    $query
                        ->andWhere('p.barcode LIKE :barcode')
                        ->setParameter('barcode', "{$value}%");
                    break;
                case 'name':
                    $query->andWhere('p.name LIKE :name')
                        ->setParameter('name', "{$value}%");
                    break;
                case 'createdAt':
                    $startDate = (new DateTime($value))->setTime(0, 0);
                    $endDate = (new DateTime($value))->setTime(23, 59);
                    $query
                        ->andWhere('p.createdAt between :startCreatedAt AND :endCreatedAt ')
                        ->setParameter('startCreatedAt', $startDate)
                        ->setParameter('endCreatedAt', $endDate);
                    break;
                case 'updatedAt':
                    $startDate = (new DateTime($value))->setTime(0, 0);
                    $endDate = (new DateTime($value))->setTime(23, 59);
                    $query
                        ->andWhere('p.updatedAt between :startUpdatedAt AND :endUpdatedAt ')
                        ->setParameter('startUpdatedAt', $startDate)
                        ->setParameter('endUpdatedAt', $endDate);
                    break;
            }
        }
        return $query;
    }

    /**
     * @param array<string, mixed> $params
     * @param QueryBuilder $query
     *
     * @return QueryBuilder
     */
    public function applyPagination(QueryBuilder $query, array $params): QueryBuilder
    {
        $limit = (int) ($params['limit'] ?? 0);
        if ($limit > 0) {
            $query->setMaxResults($limit)
                ->setFirstResult((int) ($params['offset'] ?? 0));
        }

        return $query;
    }

    /**
     * @param array<string, mixed> $params
     * 
     * @return mixed
     */
    public function findByParams(array $params)
    {
        $query = $this->createQueryBuilder('p');

        $query = $this->buildQueryWithParams($params, $query);
        $this->applyPagination($query, $params);

        return $query->getQuery()->getResult();
    }

    /**
     * @param array<string, mixed> $params
     * 
     * @return mixed
     */
    public function countByParams(array $params)
    {
        $query = $this->createQueryBuilder('p')
            ->select('COUNT(p.id)');

        $query = $this->buildQueryWithParams($params, $query);

        return (int) $query->getQuery()->getSingleScalarResult();
    }

}
