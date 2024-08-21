const installment = require("./installment")

module.exports = class Loan {
  static #fee = 1.05

  constructor(value,installments){
    this.value=value
    this.installments=[]

    for (let i=1; i <= installments;i++){
      this.installments.push(new installment((value * Loan.#fee)/ installments),i)
    }
    this.createdAt = new Date()
  }
  static get fee(){
    return Loan.#fee
  }
  static set fee(newFeePorcentege){
  Loan.#fee = 1 + (newFeePorcentege/100)
  }
}