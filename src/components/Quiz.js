
import React, { useState, useEffect } from 'react'
import ListGroup from './sharedComponents/ListGroup'
import ListItem from './sharedComponents/ListItem'
import InputGroup from './sharedComponents/InputGroup'
import Input from './sharedComponents/Input'
import Button from './sharedComponents/Button'
import Spinner from './sharedComponents/Spinner'
import Footer from './sharedComponents/Footer'
import Question from './Question'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { generateQuiz, actionSubmitAnswer, actionLoading } from '../actions/index'

const Quiz = (props) => {

  const [answer,setAnswer] = useState('')
  let questionId           = props.match.params.id
  const currentQuestion    = Object(props.quiz[questionId-1])

  useEffect(()=>{
    if(questionId){
      window.onbeforeunload = function() {
        return "";
      }
    }
    if(questionId <= props.quizRequirements.maxQuestions && (props.quiz.length < questionId || !props.quiz.length) ){
      props.dispatch( generateQuiz(props.quizRequirements) )
    }
  },[questionId,props])

  const handleSubmit = () => {
    props.dispatch( actionLoading() )
    props.dispatch( actionSubmitAnswer({currentQuestion,answer}) )
    setAnswer('')
    if(questionId === props.quizRequirements.maxQuestions){
      props.history.push('/results')
    } else props.history.push(`/question/${++questionId}`)
  }

  const handleEvent = (e) => {
    if(e.which === 13 && questionId <= props.quizRequirements.maxQuestions){
      handleSubmit()
    }
  }

  if(!props.quizRequirements.maxQuestions){
    return <Redirect to="/" />
  }

  if(props.quizRequirements.maxQuestions){
    if(props.quiz[props.quizRequirements.maxQuestions-1] !== undefined){
      if(props.quiz[props.quizRequirements.maxQuestions-1].isSubmitted){
        return <Redirect to="/results" />
      }
    }
  }

  return <>
          <div className="container-fluid">
             <div className="row mt-4">
                <div className="col-md-6 col-sm-12 mx-auto">
                  <ListGroup>
                    <ListItem>
                       Q no. {questionId}: answer the following  <br /> <Question currentQuestion={currentQuestion}/>
                    </ListItem>
                    <ListItem>
                    { props.isLoading ?
                      <Spinner className="border d-flex mx-auto"/>
                      : <InputGroup left={
                            <Input
                              type="text"
                              name="answer"
                              className="form-control"
                              placeholder="enter your answer here"
                              value = { currentQuestion.isSubmitted ? currentQuestion.answered : answer }
                              onUpdate = { currentQuestion.isSubmitted ? false : (answer) => setAnswer(answer) }
                              disabled = { currentQuestion.isSubmitted ?
                                true
                                : false }
                              onKeyPress={handleEvent}
                              autoFocus
                            />
                          }
                          right={
                            <div className="input-group-append">
                              { currentQuestion.isSubmitted ?
                                <Link className="btn btn-outline-info" to={`/question/${++questionId}`}>Next</Link>
                                : <Button className="outline-info" value="Next"
                                  onClick = {handleSubmit} />
                              }
                            </div>
                          }
                         />
                       }
                    </ListItem>
                  </ListGroup>
                </div>
             </div>
             <Footer className="small fixed-bottom bg-light px-4 py-2"
               content={
                   <>
                     <b className="text-danger">Caution! </b>
                     make sure the decimal<b className="text-danger"> * </b> are upto
                     <b> 2</b> digits.
                   </>
                 }
             />
          </div>
         </>
}

function mapStateToProps({state}){
  const { isLoading, quizRequirements, quiz } = state
  return { isLoading, quizRequirements, quiz }
}

export default connect(mapStateToProps)(Quiz);
