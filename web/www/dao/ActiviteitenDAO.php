<?php
require_once __DIR__ . '/DAO.php';
class ActiviteitenDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT * FROM `activiteiten`  
    INNER JOIN `intro` ON `intro`.`activiteit_id` = `activiteiten`.`id` 
    INNER JOIN `split` ON `split`.`activiteit_id` = `activiteiten`.`id`
    INNER JOIN `optie_1` ON `optie_1`.`activiteit_id` = `activiteiten`.`id`
    INNER JOIN `optie_2` ON `optie_2`.`activiteit_id` = `activiteiten`.`id`
    INNER JOIN `einde` ON `einde`.`activiteit_id` = `activiteiten`.`id`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = " SELECT * FROM `activiteiten`  
    INNER JOIN `intro` ON `intro`.`activiteit_id` = `activiteiten`.`id` 
    INNER JOIN `split` ON `split`.`activiteit_id` = `activiteiten`.`id`
    INNER JOIN `optie_1` ON `optie_1`.`activiteit_id` = `activiteiten`.`id`
    INNER JOIN `optie_2` ON `optie_2`.`activiteit_id` = `activiteiten`.`id`
    INNER JOIN `einde` ON `einde`.`activiteit_id` = `activiteiten`.`id`
    WHERE `activiteiten`.`id` =:id
    ";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

}
