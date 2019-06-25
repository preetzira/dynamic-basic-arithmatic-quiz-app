import quiz from '../helper/quiz'
export const ACTION_SET_REQUIREMENTS = "ACTION_SET_REQUIREMENTS"
export const ACTION_LOADING = "ACTION_TOGGLE_LOADING"
export const ACTION_ADD_QUESTION_IN_QUIZ = "ACTION_ADD_QUESTION_IN_QUIZ"
export const ACTION_SUBMIT_ANSWER = "ACTION_SUBMIT_ANSWER"
export const ACTION_RESTART_QUIZ = "ACTION_RESTART_QUIZ"

export function generateQuiz(maxRandomValue){
  return dispatch => {

    const generateQuiz = new quiz()
    const operators = ["+","-","*","/"]

    const operandOne = generateQuiz.genrateOperand(maxRandomValue)
    const operandTwo = generateQuiz.genrateOperand(maxRandomValue)
    const operator = generateQuiz.pickOperand(operators)

    const newQuiz = {
      id: Date.now(),
      operandOne,
      operandTwo,
      operator,
      answer : generateQuiz.getAnswer(operandOne,operandTwo,operator).toFixed(2),
      answered : "",
      isSubmitted: false,
      isCorrect:false
    }
    dispatch( actionAddQuiz(newQuiz) )
  }
}

export function actionSetRequirements(requirements){
  return {
    type: ACTION_SET_REQUIREMENTS,
    payload: requirements
  }
}

export function actionAddQuiz(newQuiz){
  return {
    type: ACTION_ADD_QUESTION_IN_QUIZ,
    payload: newQuiz
  }
}

export function actionLoading(){
  return {
    type: ACTION_LOADING
  }
}

export function actionSubmitAnswer(answer){
  return {
    type: ACTION_SUBMIT_ANSWER,
    payload: answer
  }
}

export function actionRestartQuiz(){
  return {
    type: ACTION_RESTART_QUIZ
  }
}
