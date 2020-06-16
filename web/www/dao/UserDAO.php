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

  public function insert($data) {
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "INSERT INTO `users` (`id`, `naam`, `stappen pot`, `leeftijd`, `fontsize`, `reisbegeleider`) VALUES (:id, :name, :stappen, :leeftijd, :fontsize, :reisbegeleider)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':id', $data['id']);
      $stmt->bindValue(':naam', $data['naam']);
      $stmt->bindValue(':stappen', $data['stappen']);
      $stmt->bindValue(':fontsize', $data['fontsize']);
      $stmt->bindValue(':reisbegeleider', $data['reisbegeleider']);
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
      $sql = "UPDATE `users` SET `naam` = :naam, `stappen` = :stappen, `leeftijd`=:leeftijd, `fontsize` =:fontsize, `reisbegeleider` WHERE `id` = :id";
      $stmt->bindValue(':id', $data['id']);
      $stmt->bindValue(':naam', $data['naam']);
      $stmt->bindValue(':stappen', $data['stappen']);
      $stmt->bindValue(':fontsize', $data['fontsize']);
      $stmt->bindValue(':reisbegeleider', $data['reisbegeleider']);
      if($stmt->execute()) {
        return $this->selectById($data['id']);
      }
    }
    return false;
  }

  public function getValidationErrors($data) {
    $errors = array();
    if(!isset($data['naam'])) {
      $errors['naam'] = "Please fill in a name";
    }
    if(!isset($data['stappen'])) {
      $errors['stappen'] = "Please fill in stappen";
    }
    if(!isset($data['fontsize'])) {
      $errors['fontsize'] = "Please fill in fontsize";
    }
    if(!isset($data['reisbegeleider'])) {
      $errors['reisbegeleider'] = "Please fill in reisbegeleider";
    }
    return $errors;
  }
  
}
