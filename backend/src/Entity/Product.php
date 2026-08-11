<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['product:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['product:read'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(['product:read'])]
    private ?string $barcode = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['product:read'])]
    private ?DateTimeImmutable $dlc = null;

    #[ORM\Column]
    #[Groups(['product:read'])]
    private ?DateTimeImmutable $createdAt = null;

    #[ORM\ManyToOne(inversedBy: 'productsCreatedBy')]
    #[Groups(['user:read'])]
    private ?User $createdBy = null;

    #[ORM\Column]
    #[Groups(['product:read'])]
    private ?DateTimeImmutable $updatedAt = null;

    #[ORM\ManyToOne(inversedBy: 'productsUpdatedBy')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['user:read'])]
    private ?User $updatedBy = null;

    #[ORM\ManyToOne(inversedBy: 'products')]
    #[Groups(['category:read'])]
    private ?Category $category = null;

    #[ORM\ManyToOne(inversedBy: 'products', cascade: ['persist'])]
    #[Groups(['brand:read'])]
    private ?Brand $brand = null;

    #[ORM\OneToOne(mappedBy: 'product', cascade: ['persist', 'remove'])]
    #[Groups(['stock.small:read'])]
    private ?Stock $stock = null;

    public function __construct()
    {
        $this->createdAt = new DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getCreatedAt(): ?DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getBarcode(): ?string
    {
        return $this->barcode;
    }

    public function setBarcode(string $barcode): static
    {
        $this->barcode = $barcode;

        return $this;
    }

    public function getDlc(): ?DateTimeImmutable
    {
        return $this->dlc;
    }

    public function setDlc(?DateTimeImmutable $dlc): static
    {
        $this->dlc = $dlc;

        return $this;
    }

    public function getCreatedBy(): ?User
    {
        return $this->createdBy;
    }

    public function setCreatedBy(?User $createdBy): static
    {
        $this->createdBy = $createdBy;

        return $this;
    }

    public function getUpdatedBy(): ?User
    {
        return $this->updatedBy;
    }

    public function setUpdatedBy(?User $updatedBy): static
    {
        $this->updatedBy = $updatedBy;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): static
    {
        $this->category = $category;

        return $this;
    }

    public function getBrand(): ?Brand
    {
        return $this->brand;
    }

    public function setBrand(?Brand $brand): static
    {
        $this->brand = $brand;

        return $this;
    }

    public function getStock(): ?Stock
    {
        return $this->stock;
    }

    public function setStock(?Stock $stock): static
    {
        // unset the owning side of the relation if necessary
        if ($stock === null && $this->stock !== null) {
            $this->stock->setProduct(null);
        }

        // set the owning side of the relation if necessary
        if ($stock !== null && $stock->getProduct() !== $this) {
            $stock->setProduct($this);
        }

        $this->stock = $stock;

        return $this;
    }
}
