<?php

namespace Tests;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Config;

abstract class TestCase extends BaseTestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Docker Compose injeta CACHE_STORE=redis; força array nos testes.
        Config::set('cache.default', 'array');
        Cache::forgetDriver('array');
        Cache::setDefaultDriver('array');
    }
}
