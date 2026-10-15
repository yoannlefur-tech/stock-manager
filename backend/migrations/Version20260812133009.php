<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260812133009 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE product_brand (product_id INT NOT NULL, brand_id INT NOT NULL, PRIMARY KEY (product_id, brand_id))');
        $this->addSql('CREATE INDEX IDX_BD0E82044584665A ON product_brand (product_id)');
        $this->addSql('CREATE INDEX IDX_BD0E820444F5D008 ON product_brand (brand_id)');
        $this->addSql('ALTER TABLE product_brand ADD CONSTRAINT FK_BD0E82044584665A FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE product_brand ADD CONSTRAINT FK_BD0E820444F5D008 FOREIGN KEY (brand_id) REFERENCES brand (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE product DROP CONSTRAINT fk_d34a04ad44f5d008');
        $this->addSql('DROP INDEX idx_d34a04ad44f5d008');
        $this->addSql('ALTER TABLE product DROP brand_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE product_brand DROP CONSTRAINT FK_BD0E82044584665A');
        $this->addSql('ALTER TABLE product_brand DROP CONSTRAINT FK_BD0E820444F5D008');
        $this->addSql('DROP TABLE product_brand');
        $this->addSql('ALTER TABLE product ADD brand_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT fk_d34a04ad44f5d008 FOREIGN KEY (brand_id) REFERENCES brand (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_d34a04ad44f5d008 ON product (brand_id)');
    }
}
