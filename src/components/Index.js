
import React, { useState, useEffect } from 'react'
import Card from './sharedComponents/Card'
import FormGroup from './sharedComponents/FormGroup'
import Input from './sharedComponents/Input'
import Label from './sharedComponents/Label'
import Button from './sharedComponents/Button'
import Footer from './sharedComponents/Footer'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { actionSetRequirements } from '../actions/index'

const Quizes = (props) => {

  const [maxQuestions,setMaxQuestions] = useState(20)
  const [maxOperands,setMaxOperands] = useState(2)
  const [maxRandomValue,setMaxRandomValue] = useState(10)
  const [operators,setOperators] = useState("+-*/")
  const [isSubmitted,setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    if(maxQuestions <= 0) setMaxQuestions(20)
    if(maxRandomValue <= 0) setMaxRandomValue(10)
    if(maxOperands < 2) setMaxOperands(2)
    setIsSubmitted(true)
  }

  const handleEvent = (e) => {
    if(e.which === 13){
      handleSubmit()
    }
    const operatorEvents = [42,43,45,47]
    if(e.target.name === "operators" && !operatorEvents.includes(e.which)){
      e.preventDefault()
      return
    }
  }

  useEffect(()=>{    
    if(isSubmitted){
      props.dispatch( actionSetRequirements({quizRequirements:{maxRandomValue,maxQuestions,maxOperands,operators}}) )
    }
  },[maxQuestions,maxRandomValue,operators,maxOperands,isSubmitted,props])

  if(props.quizRequirements.hasOwnProperty('maxQuestions')){
    const questionId = props.quiz.length ? props.quiz.length-1 : 1
    return <Redirect to={`/question/${questionId}`} />
  }

  return <div className="col-12 col-md-6 offset-md-3 mb-3">
          <Card className="p-5 mx-5 mb-5"
            top={
              <div className="card-title mb-5 text-center h5" >Set your preferences</div>
            }
            body={
              <>
                <FormGroup className="form-label-group">
                  <Input
                    id="questions"
                    type="number"
                    name="questions"
                    value={maxQuestions}
                    className="form-control form-control-custom"
                    aria-describedby="inputGroupPrepend"
                    placeholder="Total question you want to try"
                    onUpdate={setMaxQuestions}
                    onKeyPress={handleEvent}
                    min="1"
                  />
                  <Label htmlFor="questions" value="Total question you want to try"/>
                </FormGroup>
                <FormGroup className="form-label-group">
                  <Input
                    id="maxRandomValue"
                    type="number"
                    name="maxRandomValue"
                    value={maxRandomValue}
                    className="form-control form-control-custom"
                    aria-describedby="inputGroupPrepend"
                    placeholder="Max operand value to work with"
                    onUpdate={setMaxRandomValue}
                    onKeyPress={handleEvent}
                    min="1"
                  />
                  <Label htmlFor="maxRandomValue" value="Max operand value to work with"/>
                </FormGroup>
                <FormGroup className="form-label-group">
                  <Input
                    id="maxOperands"
                    type="number"
                    name="maxOperands"
                    value={maxOperands}
                    className="form-control form-control-custom"
                    aria-describedby="inputGroupPrepend"
                    placeholder="No. of operands to work with"
                    onUpdate={setMaxOperands}
                    onKeyPress={handleEvent}
                    min="1"
                  />
                  <Label htmlFor="maxOperands" value="No. of operands to work with"/>
                </FormGroup>
                <FormGroup className="form-label-group">
                  <Input
                    id="operators"
                    type="text"
                    name="operators"
                    value={operators}
                    className="form-control form-control-custom"
                    aria-describedby="inputGroupPrepend"
                    placeholder="Total question you want to try"
                    onUpdate={setOperators}
                    onKeyPress={handleEvent}
                    maxLength="4"
                  />
                  <Label htmlFor="operators" value="Operators you want to try"/>
                </FormGroup>
              </>
            }
            bottom={
              <Button className="outline-warning btn-lg form-control-custom" value="Start quiz" onClick={handleSubmit}/>
            }
          />
        </div>
}

const Index = (props) => {

  return <div className="container-fluid">
          <div className="header text-center text-info h2 m-5">Take mathematical quiz</div>
          <div className="row">
            <Quizes {...props} />
          </div>
          <Footer className="small fixed-bottom bg-light px-4 py-2"
            content={
                <>
                  <b className="text-danger">Caution! </b>
                  Fields with <b>illogical/blank</b> values will be set to thier initial value.
                </>
              }
          />
        </div>
}

function mapStateToProps({state}){
  return state
}

export default connect(mapStateToProps)(Index);
