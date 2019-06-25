import React from 'react'
import Spinner from './sharedComponents/Spinner'

const Question = (props) => {
  return <div className="text-center">
            {
              props.currentQuestion.hasOwnProperty('operandOne') ?
                <b>
                  {`${props.currentQuestion.operandOne} ${props.currentQuestion.operator} ${props.currentQuestion.operandTwo}`}
                </b>
              : <Spinner className="border d-flex mx-auto"/>
            }
          </div>
}

export default Question
