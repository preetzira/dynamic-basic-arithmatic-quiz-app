import React from 'react'
import Spinner from './sharedComponents/Spinner'

const Question = (props) => {
  return <div className="text-center">
            {
              props.currentQuestion.hasOwnProperty('question') ?
                <b>
                  {props.currentQuestion.question}
                </b>
              : <Spinner className="border d-flex mx-auto"/>
            }
          </div>
}

export default Question
