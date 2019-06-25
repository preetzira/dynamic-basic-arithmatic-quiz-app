
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
      break;
    case ACTION_LOADING:
        return {
          ...state,
          isLoading : true
        }
        break;
    case ACTION_ADD_QUESTION_IN_QUIZ:
        return {
          ...state,
          quiz : [...state.quiz, action.payload],
          isLoading : false
        }
        break;
    case ACTION_SUBMIT_ANSWER:
        return {
          ...state,
          quiz: [...state.quiz].map((question)=>{
                  if(question.id === action.payload.currentQuestion.id){

                    question.answered = action.payload.answer
                    question.isSubmitted = true

                    if(question.answer == action.payload.answer){
                      question.isCorrect = true
                    }
                  }
                  return question
                }
              ),
          isLoading : false
        }
        break;
    case ACTION_RESTART_QUIZ:
        return {
          ...state,
          isLoading : false,
          quizRequirements : {},
          quiz : [],
          startedAt : null
        }
        break;
    default:
      return state
  }
}
