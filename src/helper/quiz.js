module.exports = function(){
  const context = {
    genrateOperand : (maxRandomValue) => {
      return Math.ceil(Math.random()*maxRandomValue)
    },
    pickOperator : (operators) => {
      return operators[parseInt(Math.random()*operators.length)]
    },
    generateQuestion: ({maxRandomValue, operators, maxOperands}) =>{
      let question = []
      for (let index = 0; index < maxOperands; index++) {
        question.push(`${context.genrateOperand(maxRandomValue)} ${index < maxOperands-1 ? context.pickOperator(operators): ''}`)
      }
      return question.join(' ').trim()
    },
    generateAnswer: (question) =>{
      return eval(question)
    }
  }
  return context
}

function evaluate(expression) {
  return new Function(`return ${expression}`)();
}
