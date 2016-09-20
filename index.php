<?php

/**
 * TODO: (When PHP V 7.1+ is implemented by Mamp & CPanel)
 * Add return type "void" to all functions
 * that doesn't return anything.
 */

declare(strict_types = 1);

/**
 * Make sure all errors are shown.
 * (Turn off for production).
 */
error_reporting(E_ALL);
ini_set('display_errors', 'On');

// Include all files needed.

// Models
// ...

// Views
require_once('view/LayoutView.php');
require_once('view/IndexView.php');
require_once('view/AboutView.php');
require_once('view/ContactView.php');
require_once('view/EditGoogleDriveView.php');
require_once('view/AttributionView.php');
require_once('view/SelfieView.php');

// Shared views
require_once('view/shared/HeaderView.php');
require_once('view/shared/FooterView.php');
require_once('view/shared/EditView.php');

// Controllers
// ...

/**
 * Add all views in arrays to avoid long
 * parameter row in 'LayoutView.php' constructor.
 */
$views = [
	'index' => new IndexView(),
	'about' => new AboutView(),
	'contact' => new ContactView(),
	'editgoogledrive' => new EditGoogleDriveView(),
	'attribution' => new AttributionView(),
	'selfie' => new SelfieView()
];

$sharedViews = [
	'header' => new HeaderView(),
	'footer' => new FooterView(),
	'editview' => new EditView()
];

$layoutView = new LayoutView($views, $sharedViews);

$layoutView -> renderLayout();
