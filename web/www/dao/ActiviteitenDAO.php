<?php
require_once __DIR__ . '/DAO.php';
class ActiviteitenDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT * FROM `activiteiten`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = "SELECT * FROM `activiteiten` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function selectIntroActiviteit($id) {
    // $sql = "
    // SELECT `intro`.* FROM `intro`,
    // INNER JOIN `split` ON `split`.`activiteitId` = `intro`.`id`
    // WHERE `intro`.`activiteit_id` = :id
    // ";
    $sql = "
    SELECT `intro`.* FROM `intro`,
    WHERE `intro`.`activiteit_id` = :id
    ";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }


  
}
