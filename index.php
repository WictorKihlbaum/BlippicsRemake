<?php

/* TODO: (When PHP V 7.1+ is implemented)
   Add return type "void" to all functions 
   that doesn't return anything. */

declare(strict_types = 1);

/* Make sure errors are shown.
   (Turn off for production). */
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
require_once('view/EditOnlineView.php');
require_once('view/EditLocalView.php');
require_once('view/AttributionView.php');

// Controllers
// ...

/* Add all views in an array to avoid long 
   parameter row in LayoutView.php constructor. */
$views = [
	'index' => new IndexView(), 
	'about' => new AboutView(),
	'contact' => new ContactView(),
	'editonline' => new EditOnlineView(),
	'editlocal' => new EditLocalView(),
	'attribution' => new AttributionView()
];

$layoutView = new LayoutView($views);

$layoutView -> renderLayout();