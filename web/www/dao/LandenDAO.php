<?php
require_once __DIR__ . '/DAO.php';
class LandenDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT * FROM `landen`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = "SELECT * FROM `landen` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function selectStedenForLand($id) {
    $sql = "
    SELECT `steden`.* FROM `steden`
    WHERE `steden`.`land_id` = :id
    ";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }
  
}
