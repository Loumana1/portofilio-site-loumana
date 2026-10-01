<?php
/**
 * Main Entry Point & Simple Router
 */
require_once __DIR__ . '/config.php';
require_once CONTROLLERS_PATH . '/PageController.php';

// Simple routing
$page = isset($_GET['page']) ? $_GET['page'] : 'home';

// Sanitize page name
$page = preg_replace('/[^a-zA-Z0-9_-]/', '', $page);

PageController::render($page);