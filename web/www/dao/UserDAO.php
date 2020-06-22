<?php
require_once __DIR__ . '/DAO.php';
class UserDAO extends DAO {

  public function selectById($id) {
    $sql = "SELECT * FROM `users` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function selectCheckedStad($id) {
    $sql = "SELECT * FROM `users_steden`
    WHERE `users_steden`.`user_id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectAll() {
    $sql = "SELECT * FROM `users`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function insert($data) {
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "INSERT INTO `users` (`id`, `firstName`, `leeftijd`, `fullName`, `fontsize`,`reisbegeleider`) VALUES (:id, :firstName, :age, :fullName, :fontSize, :reisbegeleider)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':id', $data['id']);
      $stmt->bindValue(':firstName', $data['firstName']);
      $stmt->bindValue(':age', $data['age']);
      $stmt->bindValue(':fullName', $data['fullName']);
      $stmt->bindValue(':fontSize', $data['fontSize']);
      $stmt->bindValue(':reisbegeleider', $data['reisbegeleider']);
      if($stmt->execute()) {
        return $this->selectById($data['id']);
      }
    }
    return false;
  }

  public function insertCheckedLand($data) {
    $errors = $this->getValidationErrorsCheckedLand($data);
    if(empty($errors)) {
      $sql = "INSERT INTO `users_landen` (`user_id`, `land_id`) VALUES (:user_id, :land_id)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':user_id', $data['user_id']);
      $stmt->bindValue(':land_id', $data['land_id']);
      if($stmt->execute()) {
        return $this->selectById($data['id']);
      }
    }
    return false;
  }

  public function insertCheckedStad($data) {
    $errors = $this->getValidationErrorsCheckedStad($data);
    if(empty($errors)) {
      $sql = "INSERT INTO `users_steden` (`user_id`, `stad_id`) VALUES (:user_id, :stad_id)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':user_id', $data['user_id']);
      $stmt->bindValue(':stad_id', $data['stad_id']);
      if($stmt->execute()) {
        return $this->selectById($data['user_id']);
      }
    }
    return $false;
  }

  public function insertCheckedActiviteit($data) {
    $errors = $this->getValidationErrorsCheckedAct($data);
    if(empty($errors)) {
      $sql = "INSERT INTO `users_activiteiten` (`user_id`, `activiteit_id`) VALUES (:user_id, :activiteit_id)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':user_id', $data['user_id']);
      $stmt->bindValue(':activiteit_id', $data['activiteit_id']);
      if($stmt->execute()) {
        return $this->selectById($data['user_id']);
      }
    }
    return $false;
  }

  public function updateCurrentReis($data) {
    $errors = $this->getValidationErrorsCurrentReis($data);
    if(empty($errors)) {
      $sql = "UPDATE `users` SET `currentReis_id` = :currentReis_id WHERE `id` = :id";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':id', $data['id']);
      $stmt->bindValue(':currentReis_id', $data['currentReis_id']);
      if($stmt->execute()) {
        return $this->selectById($data['id']);
      }
    }
    return false;
  }

  public function updateCurrentStappen($data) {
    $errors = $this->getValidationErrorsCurrentStappen($data);
    if(empty($errors)) {
      $sql = "UPDATE `users` SET `stappen` = :stappen WHERE `id` = :id";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':id', $data['id']);
      $stmt->bindValue(':stappen', $data['stappen']);
      if($stmt->execute()) {
        return $this->selectById($data['id']);
      }
    }
    return false;
  }

  public function updateLifetimeStappen($data) {
    $errors = $this->getValidationErrorsLifetimeStappen($data);
    if(empty($errors)) {
      $sql = "UPDATE `users` SET `lifetime_stappen` = :lifetime_stappen WHERE `id` = :id";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':id', $data['id']);
      $stmt->bindValue(':lifetime_stappen', $data['lifetime_stappen']);
      if($stmt->execute()) {
        return $this->selectById($data['id']);
      }
    }
    return false;
  }

  public function insertUsersLanden($data) {
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "INSERT INTO `users_landen` (`user_id`, `activiteit_id`) VALUES (:user_id, :activiteit_id)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':user_id', $data['user_id']);
      $stmt->bindValue(':activiteit_id', $data['activiteit_id']);
      // if($stmt->execute()) {
      //   return $this->selectById($data['id']);
      // }
    }
    return false;
  }

  public function update($data) {
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "UPDATE `users` SET `firstName` = :firstName, `fullName`, =:fullName, `stappen` = :stappen, `leeftijd`=:leeftijd, `fontsize` =:fontsize, `reisbegeleider` =:reisbegeleider, `currentReis_id` =:currentReis_id WHERE `id` = :id";      
      $stmt->bindValue(':id', $data['id']);
      $stmt->bindValue(':firstName', $data['firstName']);
      $stmt->bindValue(':fullName', $data['fullName']);
      $stmt->bindValue(':stappen', $data['stappen']);
      $stmt->bindValue(':fontsize', $data['fontSize']);
      $stmt->bindValue(':leeftijd', $data['leeftijd']);
      $stmt->bindValue(':reisbegeleider', $data['reisbegeleider']);
      $stmt->bindValue(':currentReis_id', $data['currentReis_id']);
      if($stmt->execute()) {
        return $this->selectById($data['id']);
      }
    }
    return false;
  }

  public function getValidationErrors($data) {
    $errors = array();
    if(!isset($data['firstName'])) {
      $errors['firstName'] = "Please fill in a first name";
    }
    if(!isset($data['fullName'])) {
      $errors['fullName'] = "Please fill in the full name";
    }
    if(!isset($data['id'])) {
      $errors['id'] = "Please fill in a id";
    }
    if(!isset($data['age'])) {
      $errors['age'] = "Please fill in age";
    }
    // if(!isset($data['currentReis_id'])) {
    //   $errors['currentReis_id'] = "Please fill in currentReis_id";
    // }
    return $errors;
  }

  public function getValidationErrorsCurrentReis($data) {
    $errors = array();
    if(!isset($data['currentReis_id'])) {
      $errors['currentReis_id'] = "Please fill in a reis Id";
    }
    return $errors;
  }

  public function getValidationErrorsCurrentStappen($data) {
    $errors = array();
    if(!isset($data['stappen'])) {
      $errors['stappen'] = "Please fill in the current steps";
    }
    return $errors;
  }

  public function getValidationErrorsLifetimeStappen($data) {
    $errors = array();
    if(!isset($data['lifetime_stappen'])) {
      $errors['lifetime_stappen'] = "Please fill in the lifetime stappen";
    }
    return $errors;
  }

  public function getValidationErrorsCheckedLand($data) {
    $errors = array();
    if(!isset($data['user_id'])) {
      $errors['user_id'] = "Please fill in a user_id";
    }
    if(!isset($data['land_id'])) {
      $errors['land_id'] = "Please fill in a land id";
    }
    return $errors;
  }

  public function getValidationErrorsCheckedStad($data) {
    $errors = array();
    if(!isset($data['user_id'])) {
      $errors['user_id'] = "Please fill in a user_id";
    }
    if(!isset($data['stad_id'])) {
      $errors['stad_id'] = "Please fill in a stad id";
    }
    return $errors;
  }

  public function getValidationErrorsCheckedAct($data) {
    $errors = array();
    if(!isset($data['user_id'])) {
      $errors['user_id'] = "Please fill in a user_id";
    }
    if(!isset($data['activiteit_id'])) {
      $errors['activiteit_id'] = "Please fill in a activiteit_id";
    }
    return $errors;
  }
 
}
