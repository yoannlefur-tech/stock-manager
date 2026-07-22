FROM php:8.4-fpm-alpine

# Dépendances système
RUN apk add --no-cache \
    bash \
    git \
    curl \
    unzip \
    nginx \
    supervisor \
    postgresql-dev \
    openssl \
    icu-dev \
    oniguruma-dev

# Extensions PHP
RUN docker-php-ext-install \
    pdo \
    pdo_pgsql \
    intl \
    mbstring \
    opcache

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Dépendances Composer (layer mis en cache si composer.json inchangé)
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --prefer-dist --optimize-autoloader

# Code source
COPY . .

# Génération du cache Symfony
RUN composer run-script post-install-cmd --no-interaction || true
RUN php bin/console cache:clear --env=prod --no-debug || true

# Config Nginx
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Config Supervisor (php-fpm + nginx)
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Permissions
RUN chown -R www-data:www-data /app/var

EXPOSE 8000

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
