<?php
/**
 * PageController - Renders pages within the main layout
 */
class PageController {
    
    public static function render($page) {
        global $cssFiles, $jsFiles;
        
        $pagePath = PAGES_PATH . "/$page.php";
        
        if (!file_exists($pagePath)) {
            http_response_code(404);
            echo "<h1>404 - Page Not Found</h1>";
            return;
        }
        
        // Capture page content
        ob_start();
        include $pagePath;
        $content = ob_get_clean();
        
        // Render within layout
        include LAYOUTS_PATH . '/main.php';
    }
}