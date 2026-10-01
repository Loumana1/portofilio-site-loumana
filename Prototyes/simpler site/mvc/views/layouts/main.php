<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= SITE_TITLE ?></title>
  <meta name="description" content="<?= SITE_DESCRIPTION ?>">
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  
  <!-- CSS Files -->
  <?php foreach($cssFiles as $css): ?>
  <link rel="stylesheet" href="<?= CSS_URL ?>/<?= $css ?>">
  <?php endforeach; ?>
  
  <!-- Three.js CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  
  <!-- GSAP & ScrollTrigger -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  
  <!-- Pre-extracted 3D Model Data -->
  <script src="<?= EXT_MODELS ?>/computer-model.js"></script>
  <script src="<?= EXT_MODELS ?>/moog-model.js"></script>
</head>
<body>

  <?php include PARTIALS_PATH . '/_background.php'; ?>

  <div class="layout-container">

    <?php include PARTIALS_PATH . '/_sidebar.php'; ?>

    <main class="main-wrapper">
      <?= $content ?>
    </main>

  </div>

  <!-- JavaScript -->
  <?php foreach($jsFiles as $js): ?>
  <script src="<?= JS_URL ?>/<?= $js ?>"></script>
  <?php endforeach; ?>

</body>
</html>