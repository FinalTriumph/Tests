<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Headers: Content-Disposition');

?>

<?php

// $testNames, $tests, $correctAnswers
require_once 'testdata.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  echo json_encode($testNames);
}
elseif (isset($_POST['getTest'])) {
  echo json_encode($tests[$_POST['getTest']]);
}
elseif (isset($_POST['checkAnswer']) && isset($_POST['test']) && isset($_POST['activeQuestionIndex'])) {
  echo json_encode([
    'answerCorrect' => ($correctAnswers[$_POST['test']][$_POST['activeQuestionIndex']] === $_POST['checkAnswer'])
  ]);
} else {
  echo json_encode([ 'Error' => 'Incorrect request' ]);
}

?>