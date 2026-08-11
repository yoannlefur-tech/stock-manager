<?php

declare(strict_types=1);

namespace App\Entity;

use App\Repository\UserRepository;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:read'])]
    private ?string $lastName = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:read'])]
    private ?string $firstName = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:read'])]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $password = null;

    #[ORM\Column]
    private ?DateTimeImmutable $createdAt = null;

    /**
     * @var Collection<int, Product>
     */
    #[ORM\OneToMany(targetEntity: Product::class, mappedBy: 'createdBy')]
    private Collection $productsCreatedBy;

    /**
     * @var Collection<int, Product>
     */
    #[ORM\OneToMany(targetEntity: Product::class, mappedBy: 'updatedBy')]
    private Collection $productsUpdatedBy;

    /**
     * @var Collection<int, Brand>
     */
    #[ORM\OneToMany(targetEntity: Brand::class, mappedBy: 'createdBy')]
    private Collection $brandsCreatedBy;

    /**
     * @var Collection<int, Brand>
     */
    #[ORM\OneToMany(targetEntity: Brand::class, mappedBy: 'updatedBy')]
    private Collection $brandsUpdatedBy;

    /**
     * @var Collection<int, Category>
     */
    #[ORM\OneToMany(targetEntity: Category::class, mappedBy: 'createdBy')]
    private Collection $categoriesCreatedBy;

    /**
     * @var Collection<int, Category>
     */
    #[ORM\OneToMany(targetEntity: Category::class, mappedBy: 'updatedBy')]
    private Collection $categoriesUpdatedBy;

    /**
     * @var Collection<int, Stock>
     */
    #[ORM\OneToMany(targetEntity: Stock::class, mappedBy: 'createdBy')]
    private Collection $stocksCreatedBy;

    /**
     * @var Collection<int, Stock>
     */
    #[ORM\OneToMany(targetEntity: Stock::class, mappedBy: 'updatedBy')]
    private Collection $stocksUpdatedBy;

    public function __construct()
    {
        $this->createdAt = new DateTimeImmutable();
        $this->productsCreatedBy = new ArrayCollection();
        $this->productsUpdatedBy = new ArrayCollection();
        $this->brandsCreatedBy = new ArrayCollection();
        $this->brandsUpdatedBy = new ArrayCollection();
        $this->categoriesCreatedBy = new ArrayCollection();
        $this->categoriesUpdatedBy = new ArrayCollection();
        $this->stocksCreatedBy = new ArrayCollection();
        $this->stocksUpdatedBy = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getlastName(): ?string
    {
        return $this->lastName;
    }

    public function setlastName(string $lastName): static
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getfirstName(): ?string
    {
        return $this->firstName;
    }

    public function setfirstName(string $firstName): static
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

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

    // Ajoute ces méthodes
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    public function getRoles(): array
    {
        return ['ROLE_USER'];
    }

    public function eraseCredentials(): void {}

    /**
     * @return Collection<int, Product>
     */
    public function getProductsCreatedBy(): Collection
    {
        return $this->productsCreatedBy;
    }

    public function addProductsCreatedBy(Product $productsCreatedBy): static
    {
        if (!$this->productsCreatedBy->contains($productsCreatedBy)) {
            $this->productsCreatedBy->add($productsCreatedBy);
            $productsCreatedBy->setCreatedBy($this);
        }

        return $this;
    }

    public function removeProductsCreatedBy(Product $productsCreatedBy): static
    {
        if ($this->productsCreatedBy->removeElement($productsCreatedBy)) {
            // set the owning side to null (unless already changed)
            if ($productsCreatedBy->getCreatedBy() === $this) {
                $productsCreatedBy->setCreatedBy(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Product>
     */
    public function getProductsUpdatedBy(): Collection
    {
        return $this->productsUpdatedBy;
    }

    public function addProductsUpdatedBy(Product $productsUpdatedBy): static
    {
        if (!$this->productsUpdatedBy->contains($productsUpdatedBy)) {
            $this->productsUpdatedBy->add($productsUpdatedBy);
            $productsUpdatedBy->setUpdatedBy($this);
        }

        return $this;
    }

    public function removeProductsUpdatedBy(Product $productsUpdatedBy): static
    {
        if ($this->productsUpdatedBy->removeElement($productsUpdatedBy)) {
            // set the owning side to null (unless already changed)
            if ($productsUpdatedBy->getUpdatedBy() === $this) {
                $productsUpdatedBy->setUpdatedBy(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Brand>
     */
    public function getBrandsCreatedBy(): Collection
    {
        return $this->brandsCreatedBy;
    }

    public function addBrandsCreatedBy(Brand $brandsCreatedBy): static
    {
        if (!$this->brandsCreatedBy->contains($brandsCreatedBy)) {
            $this->brandsCreatedBy->add($brandsCreatedBy);
            $brandsCreatedBy->setCreatedBy($this);
        }

        return $this;
    }

    public function removeBrandsCreatedBy(Brand $brandsCreatedBy): static
    {
        if ($this->brandsCreatedBy->removeElement($brandsCreatedBy)) {
            // set the owning side to null (unless already changed)
            if ($brandsCreatedBy->getCreatedBy() === $this) {
                $brandsCreatedBy->setCreatedBy(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Brand>
     */
    public function getBrandsUpdatedBy(): Collection
    {
        return $this->brandsUpdatedBy;
    }

    public function addBrandsUpdatedBy(Brand $brandsUpdatedBy): static
    {
        if (!$this->brandsUpdatedBy->contains($brandsUpdatedBy)) {
            $this->brandsUpdatedBy->add($brandsUpdatedBy);
            $brandsUpdatedBy->setUpdatedBy($this);
        }

        return $this;
    }

    public function removeBrandsUpdatedBy(Brand $brandsUpdatedBy): static
    {
        if ($this->brandsUpdatedBy->removeElement($brandsUpdatedBy)) {
            // set the owning side to null (unless already changed)
            if ($brandsUpdatedBy->getUpdatedBy() === $this) {
                $brandsUpdatedBy->setUpdatedBy(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Category>
     */
    public function getCategoriesCreatedBy(): Collection
    {
        return $this->categoriesCreatedBy;
    }

    public function addCategoriesCreatedBy(Category $categoriesCreatedBy): static
    {
        if (!$this->categoriesCreatedBy->contains($categoriesCreatedBy)) {
            $this->categoriesCreatedBy->add($categoriesCreatedBy);
            $categoriesCreatedBy->setCreatedBy($this);
        }

        return $this;
    }

    public function removeCategoriesCreatedBy(Category $categoriesCreatedBy): static
    {
        if ($this->categoriesCreatedBy->removeElement($categoriesCreatedBy)) {
            // set the owning side to null (unless already changed)
            if ($categoriesCreatedBy->getCreatedBy() === $this) {
                $categoriesCreatedBy->setCreatedBy(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Category>
     */
    public function getCategoriesUpdatedBy(): Collection
    {
        return $this->categoriesUpdatedBy;
    }

    public function addCategoriesUpdatedBy(Category $categoriesUpdatedBy): static
    {
        if (!$this->categoriesUpdatedBy->contains($categoriesUpdatedBy)) {
            $this->categoriesUpdatedBy->add($categoriesUpdatedBy);
            $categoriesUpdatedBy->setUpdatedBy($this);
        }

        return $this;
    }

    public function removeCategoriesUpdatedBy(Category $categoriesUpdatedBy): static
    {
        if ($this->categoriesUpdatedBy->removeElement($categoriesUpdatedBy)) {
            // set the owning side to null (unless already changed)
            if ($categoriesUpdatedBy->getUpdatedBy() === $this) {
                $categoriesUpdatedBy->setUpdatedBy(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Stock>
     */
    public function getStocks(): Collection
    {
        return $this->stocksCreatedBy;
    }

    public function addStock(Stock $stocksCreatedBy): static
    {
        if (!$this->stocksCreatedBy->contains($stocksCreatedBy)) {
            $this->stocksCreatedBy->add($stocksCreatedBy);
            $stocksCreatedBy->setCreatedBy($this);
        }

        return $this;
    }

    public function removeStock(Stock $stocksCreatedBy): static
    {
        if ($this->stocksCreatedBy->removeElement($stocksCreatedBy)) {
            // set the owning side to null (unless already changed)
            if ($stocksCreatedBy->getCreatedBy() === $this) {
                $stocksCreatedBy->setCreatedBy(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Stock>
     */
    public function getStocksUpdatedBy(): Collection
    {
        return $this->stocksUpdatedBy;
    }

    public function addStocksUpdatedBy(Stock $stocksUpdatedBy): static
    {
        if (!$this->stocksUpdatedBy->contains($stocksUpdatedBy)) {
            $this->stocksUpdatedBy->add($stocksUpdatedBy);
            $stocksUpdatedBy->setUpdatedBy($this);
        }

        return $this;
    }

    public function removeStocksUpdatedBy(Stock $stocksUpdatedBy): static
    {
        if ($this->stocksUpdatedBy->removeElement($stocksUpdatedBy)) {
            // set the owning side to null (unless already changed)
            if ($stocksUpdatedBy->getUpdatedBy() === $this) {
                $stocksUpdatedBy->setUpdatedBy(null);
            }
        }

        return $this;
    }
}
