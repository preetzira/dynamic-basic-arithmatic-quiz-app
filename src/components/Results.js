import React, { useEffect } from 'react'
import Question from './Question'
import ListGroup from './sharedComponents/ListGroup'
import ListItem from './sharedComponents/ListItem'
import Button from './sharedComponents/Button'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { actionRestartQuiz } from '../actions/index'

const Result = (props) => {
  const isCorrect = props.question.isCorrect
  return <div key={props.id} className="col-md-6 col-12 mx-auto my-2">
           <ListGroup>
             <ListItem>
               Q no. {Number(props.id)+1}: <Question currentQuestion={props.question}/>
             </ListItem>
             <ListItem className={`list-group-item  text-bold ${isCorrect ? "text-success" : "text-danger" }`}>
               your answer: <b>{ props.question.answered }</b> ({isCorrect ? "correct" : "incorrect" })
             </ListItem>
             <ListItem>
               correct answer is: (<b>{ props.question.answer }</b>)
             </ListItem>
           </ListGroup>
         </div>
}

const Results = (props) => {

  useEffect(()=>{
    window.onbeforeunload = function() {
        return "";
    }
  },[])

  if(!props.quizRequirements.maxQuestions){
    return <Redirect to="/index" />
  }

  const handleClick = () => {
    props.dispatch( actionRestartQuiz() )
  }
  let correct = 0
  return <div className="container">
           <div className="row mt-5">
             {props.quiz.map((question,id)=>{
               if(question.isCorrect) ++correct
               return <Result key={id} id={id} question={question}/>
             })}
             <div className="col-12">
                Time taken: <strong>{ (Date.now() - props.startedAt)/1000 }sec.</strong> <br/>
                Percentage: <strong className={(correct/props.quiz.length)>.6 ? "text-success" : "text-danger"}>{ (correct/props.quiz.length) * 100 }%</strong> <br/>
               <Button className="outline-primary d-flex mx-auto" value="Restart quiz" onClick={handleClick} />
             </div>
           </div>
         </div>
}

function mapStateToProps({state}){
  const { quiz, quizRequirements, isLoading, startedAt } = state
  return { quiz, quizRequirements, isLoading, startedAt }
}

export default connect(mapStateToProps)(Results)
