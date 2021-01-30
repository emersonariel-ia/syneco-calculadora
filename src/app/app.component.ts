import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  postId
  history
  exibirDadosAnteriores
  baseUrl = "http://localhost:3001/history"

  constructor(private http: HttpClient) {}

  createHistory(operand1,operator,operand2,resultado) {
    this.http.post<any>(this.baseUrl, { id: null, operand1: operand1,operator: operator, operand2: operand2, resultado: resultado }).subscribe(data => {
        this.postId = data.id;
    })
  }
  

  ngOnInit() {          
    this.http.get<SearchResults[]>(this.baseUrl).subscribe(data => {
      
      this.history = data  
    })
  }

  openHistory() {
    this.ngOnInit()
    const calculadora = document.getElementById('calculadora')
    calculadora.style.display="none"
    const history = document.getElementById('history')
    history.style.display="block"
  }

  mostraTodoCalculo() {
    this.exibirDadosAnteriores =  this.operand1.toString().replace(".", ",") + this.operator  + this.operand2.toString().replace(".", ",") + " ="
    return this.exibirDadosAnteriores
  }

  voltarCal() {
    const calculadora = document.getElementById('calculadora')
    calculadora.style.display="block"
    const history = document.getElementById('history')
    history.style.display="none"
  }

  
  displayText = '';
  firstText = '';
  operand1: number;
  operand2: number;
  operator = '';
  calculationString = '';
  answered = false;
  operatorSet = false;


  pressKey(key: string) {
    if (this.answered == true){
      this.answered = false
      this.displayText = ''
      this.exibirDadosAnteriores = ''
    }

    if (this.displayText.length === 7) {
      return;
    }
    this.displayText += key;
  }
  
  pressOperator(key){
    this.displayText = this.displayText.replace(',', '.')
    this.operand1 = parseFloat(this.displayText);
    this.displayText = '';
    this.operator = key;
  }
  
  allClear() {
    this.displayText = '';
    this.operatorSet = false;
    this.exibirDadosAnteriores = ''
  }
  
  getAnswer() {
    
    this.displayText = this.displayText.replace(',', '.')
    this.operand2 = parseFloat(this.displayText);

    if (this.operator === '/') {      
      this.displayText = (this.operand1 / this.operand2).toString().replace(".", ",");
      if (this.displayText.length > 7) {
        this.displayText = this.displayText.substr(0, 7);
      }
    } else if (this.operator === 'x') {
        this.displayText = (this.operand1 * this.operand2).toString().replace(".", ",");
      if (this.displayText.length > 7) {
        this.displayText = this.displayText.substr(0, 7);
      }
    } else if (this.operator === '-') {
      this.displayText = (this.operand1 - this.operand2).toString().replace(".", ",");
      if (this.displayText.length > 7) {
        this.displayText = this.displayText.substr(0, 7);
      }
    } else if (this.operator === '+') {      
      this.displayText = (this.operand1 + this.operand2).toString().replace(".", ",");
      if (this.displayText.length > 7) {
        this.displayText = this.displayText.substr(0, 7);
      }
    } else {
      this.displayText = 'ERROR: Invalid Operation';
    }
    
    this.createHistory(this.operand1,this.operator,this.operand2,this.displayText)
    this.mostraTodoCalculo()

    this.answered = true;
  }
}

interface SearchResults {
  operand1: number;
  operator: string;
  operand2: number;
  resultado: number;
}