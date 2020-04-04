
import { ACTION_SET_REQUIREMENTS,
         ACTION_LOADING ,
         ACTION_ADD_QUESTION_IN_QUIZ,
         ACTION_SUBMIT_ANSWER,
         ACTION_RESTART_QUIZ  } from '../actions/index'

const initialState = {
  startedAt:null,
  isLoading : false,
  quizRequirements : {},
  quiz:[]
}

export default function(state = initialState, action){

  switch(action.type){
    case ACTION_SET_REQUIREMENTS:
      return {
        ...state,
        quizRequirements : action.payload.quizRequirements,
        startedAt : Date.now()
      }
    case ACTION_LOADING:
        return {
          ...state,
          isLoading : true
        }
    case ACTION_ADD_QUESTION_IN_QUIZ:
        return {
          ...state,
          quiz : [...state.quiz, action.payload],
          isLoading : false
        }
    case ACTION_SUBMIT_ANSWER:
        return {
          ...state,
          quiz: [...state.quiz].map((question)=>{
                  if(question.id === action.payload.currentQuestion.id){
                    const answered = (action.payload.answer && parseFloat(action.payload.answer).toFixed(2)) || "blank"
                    question.answered = answered
                    question.isSubmitted = true

                    if(question.answer === answered){
                      question.isCorrect = true
                    }
                  }
                  return question
                }
              ),
          isLoading : false
        }
    case ACTION_RESTART_QUIZ:
        return {
          ...state,
          isLoading : false,
          quizRequirements : {},
          quiz : [],
          startedAt : null
        }
    default:
      return state
  }
}
