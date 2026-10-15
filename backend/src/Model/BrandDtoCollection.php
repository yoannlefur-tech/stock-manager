<?php

declare(strict_types=1);

namespace App\Model;

use ArrayIterator;
use Countable;
use Iterator;
use IteratorAggregate;

/**
 * @implements IteratorAggregate<BrandDtoCollection>
 */
final class BrandDtoCollection implements IteratorAggregate, Countable
{
    /**
     * @var BrandDto[] $data
     */
    private array $data = [];

    public function add(BrandDto $dto): self
    {
        $this->data[] = $dto;

        return $this;
    }

    /**
     * @return Iterator
     */
    public function getIterator(): Iterator
    {
        return new ArrayIterator($this->data);
    }

    public function count(): int
    {
        return count($this->data);
    }
}
