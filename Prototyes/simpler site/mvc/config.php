<?php
/**
 * Global Configuration
 * Defines all path constants and site metadata.
 */

// Base paths
define('BASE_PATH', __DIR__);
define('VIEWS_PATH', BASE_PATH . '/views');
define('PARTIALS_PATH', VIEWS_PATH . '/partials');
define('LAYOUTS_PATH', VIEWS_PATH . '/layouts');
define('CONTROLLERS_PATH', BASE_PATH . '/controllers');
define('DATA_PATH', BASE_PATH . '/data');
define('PAGES_PATH', BASE_PATH . '/pages');

// Asset URL paths (relative to web root)
define('ASSETS_URL', 'assets');
define('CSS_URL', ASSETS_URL . '/css');
define('JS_URL', ASSETS_URL . '/js');

// External asset paths (relative to mvc/ folder)
define('EXT_ASSETS', '../../../assets');
define('EXT_IMAGES', EXT_ASSETS . '/images');
define('EXT_AUDIO', EXT_ASSETS . '/audio');
define('EXT_FONTS', EXT_ASSETS . '/fonts');
define('EXT_MODELS', EXT_ASSETS . '/models');
define('EXT_RESOURCES', '../../../../resources');

// Site metadata
define('SITE_TITLE', 'Loumana — Producer, DJ & Software Engineer');
define('SITE_DESCRIPTION', 'Music Producer, DJ, Audio Developer & Creative Technologist based in Brussels.');

// CSS files in load order
$cssFiles = [
    'base.css',
    'layout.css',
    'nav.css',
    'hero.css',
    'carousel.css',
    'releases.css',
    'radio.css',
    'beatmaking.css',
    'showcase.css',
    'discovery.css',
    'skills.css',
    'contact.css',
    'responsive.css',
];

// JS files in load order
$jsFiles = [
    'three-viewer.js',
    'carousel.js',
    'releases.js',
    'audio-player.js',
    'discovery.js',
];
