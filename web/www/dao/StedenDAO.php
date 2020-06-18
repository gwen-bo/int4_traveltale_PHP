<?php
require_once __DIR__ . '/DAO.php';
class StedenDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT * FROM `steden`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = "SELECT * FROM `steden` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function selectActiviteitenForSteden($id) {
    $sql = "
    SELECT `activiteiten`.* FROM `activiteiten` WHERE `activiteiten`.`stad_id` = :id
    ";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }
  
}
