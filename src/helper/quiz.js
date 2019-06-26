module.exports = function(){
  return {
    genrateOperand : (maxRandomValue) => {
      return Math.ceil(Math.random()*maxRandomValue)
    },
    pickOperator : (operators) => {
      return operators[parseInt(Math.random()*operators.length)]
    },
    getAnswer : (operandOne, operandTwo, operator) => {
      return eval(operandOne + operator + operandTwo)
    }
  }
}
