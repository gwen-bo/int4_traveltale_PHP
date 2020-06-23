<?php
require_once __DIR__ . '/DAO.php';
class SouvenirsDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT * FROM `souvenirs`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = "SELECT * FROM `souvenirs` WHERE `souvenir_id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }
}
