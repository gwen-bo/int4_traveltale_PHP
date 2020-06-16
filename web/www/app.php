<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Slim\Routing\RouteCollectorProxy as RouteCollectorProxy;

require __DIR__ . '/vendor/autoload.php';

try {
  $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
  $dotenv->load();
} catch (Exception $e) {
}

date_default_timezone_set('UTC');
require __DIR__ . '/dao/LandenDAO.php';
require __DIR__ . '/dao/StedenDAO.php';
require __DIR__ . '/dao/ActiviteitenDAO.php';
require __DIR__ . '/dao/UserDAO.php';


/**
 * Instantiate App
 *
 * In order for the factory to work you need to ensure you have installed
 * a supported PSR-7 implementation of your choice e.g.: Slim PSR-7 and a supported
 * ServerRequest creator (included with Slim PSR-7)
 */
$app = AppFactory::create();

// Add Routing Middleware
$app->addRoutingMiddleware();

$app->addBodyParsingMiddleware();

/**
 * Add Error Handling Middleware
 *
 * @param bool $displayErrorDetails -> Should be set to false in production
 * @param bool $logErrors -> Parameter is passed to the default ErrorHandler
 * @param bool $logErrorDetails -> Display error details in error log
 * which can be replaced by a callable of your choice.

 * Note: This middleware should be added last. It will not handle any exceptions/errors
 * for middleware added after it.
 */
$errorMiddleware = $app->addErrorMiddleware(true, true, true);

// Define app routes

$app->group('/api', function (RouteCollectorProxy $routeGroup) {

  // LANDEN OPHALEN
  $routeGroup->group('/landen', function (RouteCollectorProxy $routeGroup) {
    $routeGroup->get('', function (Request $request, Response $response) {
      $landenDAO = new LandenDAO();
      $data = $landenDAO->selectAll();
      $response->getBody()->write(json_encode($data));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(201);
    });
    
    $routeGroup->get('/{id}', function (Request $request, Response $response, $args) {
      $landenDAO = new LandenDAO();
      $data = $landenDAO->selectById($args['id']);
      if (empty($data)) {
        return $response
              ->withStatus(404);
      }
      $response->getBody()->write(json_encode($data));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });
    $routeGroup->get('/{id}/steden', function (Request $request, Response $response, $args) {
      $landenDAO = new LandenDAO();
      $data = $landenDAO->selectStedenForLand($args['id']);
      $response->getBody()->write(json_encode($data));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });
  });

  // STEDEN OPHALEN
  $routeGroup->group('/steden', function (RouteCollectorProxy $routeGroup) {
     $routeGroup->get('', function (Request $request, Response $response) {
      $stedenDAO = new StedenDAO();
      $data = $stedenDAO->selectAll();
      $response->getBody()->write(json_encode($data));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });
    $routeGroup->get('/{id}', function (Request $request, Response $response, $args) {
      $stedenDAO = new StedenDAO();
      $data = $stedenDAO->selectById($args['id']);
      if (empty($data)) {
        return $response
              ->withStatus(404);
      }
      $response->getBody()->write(json_encode($data));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });
    $routeGroup->get('/{id}/activiteiten', function (Request $request, Response $response, $args) {
      $stedenDAO = new StedenDAO();
      $data = $groupDAO->selectActiviteitenForSteden($args['id']);
      $response->getBody()->write(json_encode($data));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });
  });

  // ACTIVITEITEN OPHALEN
  $routeGroup->group('/activiteiten', function (RouteCollectorProxy $routeGroup) {
     $routeGroup->get('', function (Request $request, Response $response) {
      $activiteitenDAO = new ActiviteitenDAO();
      $data = $activiteitenDAO->selectAll();
      $response->getBody()->write(json_encode($data));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });

    $routeGroup->get('/{id}', function (Request $request, Response $response, $args) {
      $activiteitenDAO = new ActiviteitenDAO();
      $data = $activiteitenDAO->selectById($args['id']);
      if (empty($data)) {
        return $response
              ->withStatus(404);
      }
      $response->getBody()->write(json_encode($data));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });

    $routeGroup->get('/{id}/intro', function (Request $request, Response $response, $args) {
      $activiteitenDAO = new ActiviteitenDAO();
      $data = $groupDAO->selectIntroActiviteit($args['id']);
      $response->getBody()->write(json_encode($data));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });

  });

  // USER OPHALEN
  $routeGroup->group('/users', function (RouteCollectorProxy $routeGroup) {
   $routeGroup->get('/{id}', function (Request $request, Response $response, $args) {
     $userDAO = new UserDAO();
     $data = $userDAO->selectById($args['id']);
     if (empty($data)) {
       return $response
             ->withStatus(404);
     }
     $response->getBody()->write(json_encode($data));
     return $response
             ->withHeader('Content-Type', 'application/json')
             ->withStatus(200);
   });

   $routeGroup->put('/{id}', function (Request $request, Response $response, $args) {
    $userDAO = new UserDAO();
    $input = $request->getParsedBody();
    // $errors = $userDAO->getValidationErrorsLinkGroups($input);
    // if (!empty($errors)) {
    //   $response->getBody()->write(json_encode($errors));
    //   return $response
    //           ->withHeader('Content-Type', 'application/json')
    //           ->withStatus(422);
    // }
    $data = $userDAO->update($input);
    $response->getBody()->write(json_encode($data));
    return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
  });

  $routeGroup->post('', function (Request $request, Response $response, $args) {
    $userDAO = new UserDAO();
    $input = $request->getParsedBody();

    $errors = $userDAO->getValidationErrors($input);
    if (!empty($errors)) {
      $response->getBody()->write(json_encode($errors));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(422);
    }
    $result = $userDAO->insert($input);
    $response->getBody()->write(json_encode($result));
    return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
  });

  // $routeGroup->post('/{id}/{checked}', function (Request $request, Response $response, $args) {
  //   $userDAO = new UserDAO();
  //   $input = $request->getParsedBody();

  //   $errors = $userDAO->getValidationErrors($input);
  //   if (!empty($errors)) {
  //     $response->getBody()->write(json_encode($errors));
  //     return $response
  //             ->withHeader('Content-Type', 'application/json')
  //             ->withStatus(422);
  //   }
  //   $result = $userDAO->insert($input);
  //   $response->getBody()->write(json_encode($result));
  //   return $response
  //           ->withHeader('Content-Type', 'application/json')
  //           ->withStatus(200);
  // });

 });
});

// send all other routes to our react app
$app->get('[/{params:.*}]', function(Request $request, Response $response) {
  $file = __DIR__ . '/html/build/index.html';
  $response->getBody()->write(file_get_contents($file));
  return $response
              ->withStatus(200);
});

// Run app
$app->run();