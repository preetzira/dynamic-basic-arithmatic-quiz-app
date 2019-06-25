module.exports = function(){
  return {
    genrateOperand : (maxRandomValue) => {
      return Math.ceil(Math.random()*maxRandomValue)
    },
    pickOperand : (operator) => {
      return operator[parseInt(Math.random()*4)]
    },
    getAnswer : (operatorOne, operatorTwo, operand) => {
      return eval(operatorOne + operand + operatorTwo)
    }
  }
}
