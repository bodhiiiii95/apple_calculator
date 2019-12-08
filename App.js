/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableHighlight
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const buttonDiameter = Dimensions.get("screen").width;

class App extends React.Component{
  constructor(props){
    super(props)

    this.state={
      numberShow:"0",
      secondNumberShow:"0",
      operationState:false,
      operationMode:"",
      firstNumber:0,
      secondNumber:0,
      startMode:false,
      ready:false,
      isFloat:false,
      realNumberContainer:0,
    }
    this.numberCount = 0;
    this.numberShow = 0;
  }

  numberButtonClick = (flag) => {
    if(this.state.operationState === false){
      if(this.state.numberShow === "0" && flag !== "."){
        this.setState({numberShow:flag});
      }
      else if(this.state.numberShow === "0" && flag === "."){
        this.setState({numberShow:this.state.numberShow + flag, isFloat:true})
      }
      else if(this.state.numberShow !== "0" && this.state.isFloat === false && flag === "."){
        this.setState({numberShow:this.state.numberShow + flag, isFloat:true})
      }
      else if(this.state.numberShow.includes(".") === true && flag === "."){
        let splitNumber = this.state.numberShow.split(".")
        if(splitNumber[1] === undefined){
          this.setState({numberShow:this.state.numberShow.replace(".",""), isFloat:false})
        }
        else{
          this.setState({numberShow:splitNumber[0], isFloat:false})
        }
      }
      else if(this.state.numberShow.length > 10){
        //do nothing
      }
      else{
        if(this.state.isFloat === true){
          this.setState({numberShow:this.state.numberShow + flag})
        }
        else{
          this.setState({numberShow:this.state.numberShow.replace(/,+/g , "")}, () => {
            this.setState({numberShow:this.state.numberShow + flag},() => {
              this.setState({numberShow:this.state.numberShow.replace(/\B(?=(\d{3})+(?!\d))/g,",")})
            })
          })
        }
      }
    }
    else{
      if(this.state.startMode === true){
        if(flag === "."){
          flag = "0."
          this.setState({isFloat:true})
        }
        else{
          this.setState({isFloat:false})
        }
        this.setState({numberShow:flag, startMode:false, operationState:false, ready:true}, () => {
          if(this.state.numberShow === "0" && flag !== "."){
            this.setState({numberShow:flag});
          }
          else if(this.state.numberShow === "0" && flag === "."){
            this.setState({numberShow:this.state.numberShow + flag, isFloat:true})
          }
        })
      }
      else{
        if(this.state.numberShow === "0"){
          this.setState({numberShow:flag});
        }
        else if(this.state.numberShow.includes(".") === true && flag === "."){
          let splitNumber = this.state.numberShow.split(".")
          if(splitNumber[1] === undefined){
            this.setState({numberShow:this.state.numberShow.replace(".",""), isFloat:false})
          }
          else{
            this.setState({numberShow:splitNumber[0], isFloat:false})
          }
        }
        else if(this.state.numberShow.length > 10){
          //do nothing
        }
        else{
          if(this.state.isFloat === true){
            this.setState({numberShow:this.state.numberShow + flag})
          }
          else{
            this.setState({numberShow:this.state.numberShow.replace(/,*/g , "")}, () => {
              this.setState({numberShow:this.state.numberShow + flag},() => {
                this.setState({numberShow:this.state.numberShow.replace(/\B(?=(\d{3})+(?!\d))/g,",")})
              })
            })
          }
        }
      }
    }
  }

  ACButtonClick = () => {
    this.setState({numberShow:"0", operationState:false, startMode:false, operationMode:"", ready:false, firstNumber:0, secondNumber:0, isFloat:false})
  }

  percentButtonClick = () => {
    let percent = (parseFloat(this.state.numberShow.replace(/,*/g,"")) / 100).toFixed(5)
    let percentFloat = parseFloat(percent)
    this.setState({numberShow:percentFloat.toString()})
  }

  plusMinusButtonClick = () => {
    if(this.state.numberShow === "0" || this.state.startMode === true){
      //do nothing
    }
    else{
      if(this.state.numberShow.includes("-")){
        this.setState({numberShow:this.state.numberShow.replace("-","")})
      }
      else{
        this.setState({numberShow:"-"+this.state.numberShow.toString()})
      }
    }
  }

  showResult = (result, flag) => {
    let resultFloat = parseFloat(result).toString()
    let splitResult = resultFloat.split(".")
    let float=""
    if(flag === '0'){
      flag = this.state.operationMode
    }
    else{
      //do nothing
    }
    if(splitResult[1] === undefined){
      //
    }
    else{
      float = splitResult[1]
    }
    if(splitResult.length === 1){
      if(splitResult[0].length > 7){
        let tenDivision = parseInt(splitResult[0].length) - 1
        let divideByTenFactor = Math.pow(10,tenDivision)
        let floatResult = parseFloat((parseFloat(splitResult[0]) / divideByTenFactor).toFixed(5)).toString()
        console.log(floatResult.length)
        this.setState({numberShow:floatResult+"e"+tenDivision, firstNumber:result,operationMode:flag})
      }
      else{
        this.setState({numberShow:splitResult[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g,","), firstNumber:result,operationMode:flag})
      }
    }
    else{
      if(splitResult[0].length > 7){
        let tenDivision = parseInt(splitResult[0].length) - 1
        let divideByTenFactor = Math.pow(10,tenDivision)
        let floatResult = parseFloat((parseFloat(splitResult[0]) / divideByTenFactor).toFixed(5)).toString()
        console.log(floatResult+"e"+tenDivision)
        this.setState({numberShow:floatResult+"e"+tenDivision, firstNumber:result,operationMode:flag})
      }
      else{
        this.setState({numberShow:splitResult[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")+"."+float, firstNumber:result,operationMode:flag})
      }
    }
  }

  operationModeController = (flag) => {
    
    if(this.state.ready === false && flag === '0'){
      //do nothing
    }
    else if(this.state.ready === false && flag !== '0'){
      if(this.state.ready === false){
        if(this.state.operationState === false && this.state.operationMode === ""){
          this.setState({operationState:true, operationMode:flag, startMode:true},() => {
            this.setState({firstNumber:parseFloat(this.state.numberShow.replace(/,+/g, ""))})
          })
        }
        else if(this.state.operationState === true && this.state.operationMode === flag){
          this.setState({operationState:false, operationMode:"", startMode:false})
        }
        else if(this.state.operationState === true && this.state.operationMode !== flag){
          this.setState({operationMode:flag});
        }
      }
    }
    else if(this.state.ready === true && this.state.operationState === false){
      this.setState({startMode:true, operationState:true, secondNumber:parseFloat(this.state.numberShow.replace(/,+/g, ""))}, () => {
        if(this.state.operationMode === '4'){
          let result = this.additionOperator(this.state.firstNumber, this.state.secondNumber).toFixed(5)
          this.setState({realNumberContainer:result});
            this.showResult(this.state.realNumberContainer,flag)
        }
        else if(this.state.operationMode === '3'){
          let result = this.substractOperation(this.state.firstNumber, this.state.secondNumber).toFixed(5)
          this.showResult(result,flag)  
        }
        else if(this.state.operationMode === '2'){
          let result = this.multiplicationOperation(this.state.firstNumber, this.state.secondNumber).toFixed(5)
          this.showResult(result,flag)     
        }
        else if(this.state.operationMode === '1'){
          let result = this.divisionOperation(this.state.firstNumber, this.state.secondNumber)
          if(result === "Error"){
            this.ACButtonClick();
          }
          else{
            this.showResult(result,flag)
            //this.setState({numberShow:splitResult[0].replace(/\B(?=(\d{3})+(?!\d))/g,",")+"."+splitResult[1].replace(/0+/g,""), firstNumber:result, operationMode:flag})
          }
        }
      })
    }
    else{
      if(flag !== '0'){
        this.setState({operationMode:flag})
      }
      else{
        console.log(this.state.operationMode)
        if(this.state.operationMode === '4'){
          let result = this.additionOperator(this.state.firstNumber, this.state.secondNumber).toFixed(5)
            this.showResult(result,flag)
        }
        else if(this.state.operationMode === '3'){
          let result = this.substractOperation(this.state.firstNumber, this.state.secondNumber).toFixed(5)
          this.showResult(result,flag)  
        }
        else if(this.state.operationMode === '2'){
          let result = this.multiplicationOperation(this.state.firstNumber, this.state.secondNumber).toFixed(5)
          this.showResult(result,flag)     
        }
        else if(this.state.operationMode === '1'){
          let result = this.divisionOperation(this.state.firstNumber, this.state.secondNumber)
          if(result === "Error"){
            this.ACButtonClick();
          }
          else{
            this.showResult(result,flag)
            //this.setState({numberShow:splitResult[0].replace(/\B(?=(\d{3})+(?!\d))/g,",")+"."+splitResult[1].replace(/0+/g,""), firstNumber:result, operationMode:flag})
          }
        }
      }
    }
  }

  additionOperator = (firstNumber, secondNumber) => {
    return parseFloat(firstNumber)+parseFloat(secondNumber)
  }

  substractOperation = (firstNumber, secondNumber) => {
    return parseFloat(firstNumber)-parseFloat(secondNumber)
  }

  multiplicationOperation = (firstNumber, secondNumber) => {
    return parseFloat(firstNumber)*parseFloat(secondNumber)
  }

  divisionOperation = (firstNumber, secondNumber) => {
    if(secondNumber === 0){
      return "Error";
    }
    else{
      return (firstNumber / secondNumber).toFixed(5);
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.rowView}>

        </View>
        
        <View style={styles.rowView}>
          <Text style={styles.number}>{this.state.numberShow}</Text>
        </View>

        <View style={styles.rowView}>
          <View style={styles.buttonContainer}>
            <TouchableHighlight onPress={() => this.ACButtonClick()} style={styles.miscButton}>
              
              {
                this.state.operationState === true || this.state.operationMode !== ""?
                <Text style={styles.miscButtonText}>AC</Text>
                :
                <Text style={styles.miscButtonText}>C</Text>
              }
            </TouchableHighlight>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight onPress={() => this.plusMinusButtonClick()} style={styles.miscButton}>
              <Text style={{fontSize:30}}>{"\u207a"}{"\u2215"}{"\u208b"}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight onPress={() => this.percentButtonClick()} style={styles.miscButton}>
            <Text style={styles.miscButtonText}>{"%"}</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.buttonContainer}>
            {
              this.state.operationMode === "1" && this.state.operationState === true ?
              <TouchableHighlight onPress={() => this.operationModeController("1")} style={styles.activeOperatorButton}>
                <Text style={styles.activeOperatorText}>{"\u00F7"}</Text>
              </TouchableHighlight>
              :
              <TouchableHighlight onPress={() => this.operationModeController("1")} style={styles.operatorButton}>
                <Text style={styles.buttonNumberText}>{"\u00F7"}</Text>
              </TouchableHighlight>
            }
          </View>
        </View>

        <View style={styles.rowView}>
          <View style={styles.buttonContainer}>
            <TouchableHighlight onPress={()=>this.numberButtonClick("7")} style={styles.numberButton}>
              <Text style={styles.buttonNumberText}>7</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight onPress={()=>this.numberButtonClick("8")} style={styles.numberButton}>
              <Text style={styles.buttonNumberText}>8</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight onPress={()=>this.numberButtonClick("9")} style={styles.numberButton}>
              <Text style={styles.buttonNumberText}>9</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.buttonContainer}>
          {
              this.state.operationMode === "2" && this.state.operationState === true ?
              <TouchableHighlight onPress={() => this.operationModeController("2")} style={styles.activeOperatorButton}>
                <Text style={styles.activeOperatorText}>X</Text>
              </TouchableHighlight>
              :
              <TouchableHighlight onPress={() => this.operationModeController("2")} style={styles.operatorButton}>
                <Text style={styles.buttonNumberText}>X</Text>
              </TouchableHighlight>
            }
          </View>
        </View>

        <View style={styles.rowView}>
        <View style={styles.buttonContainer}>
            <TouchableHighlight onPress={()=>this.numberButtonClick("4")} style={styles.numberButton}>
              <Text style={styles.buttonNumberText}>4</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight onPress={()=>this.numberButtonClick("5")} style={styles.numberButton}>
              <Text style={styles.buttonNumberText}>5</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight onPress={()=>this.numberButtonClick("6")} style={styles.numberButton}>
              <Text style={styles.buttonNumberText}>6</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.buttonContainer}>
            {
              this.state.operationMode === "3" && this.state.operationState === true ?
              <TouchableHighlight onPress={() => this.operationModeController("3")} style={styles.activeOperatorButton}>
                <Text style={styles.activeOperatorText}>-</Text>
              </TouchableHighlight>
              :
              <TouchableHighlight onPress={() => this.operationModeController("3")} style={styles.operatorButton}>
                <Text style={styles.buttonNumberText}>-</Text>
              </TouchableHighlight>
            }
          </View>
        </View>

        
        <View style={styles.rowView}>
          <View style={styles.buttonContainer}>
            <TouchableHighlight onPress={()=>this.numberButtonClick("1")} style={styles.numberButton}>
              <Text style={styles.buttonNumberText}>1</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight onPress={()=>this.numberButtonClick("2")} style={styles.numberButton}>
              <Text style={styles.buttonNumberText}>2</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight onPress={()=>this.numberButtonClick("3")} style={styles.numberButton}>
              <Text style={styles.buttonNumberText}>3</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.buttonContainer}>
            {
              this.state.operationMode === "4" && this.state.operationState === true ?
              <TouchableHighlight onPress={() => this.operationModeController("4")} style={styles.activeOperatorButton}>
                <Text style={styles.activeOperatorText}>+</Text>
              </TouchableHighlight>
              :
              <TouchableHighlight onPress={() => this.operationModeController("4")} style={styles.operatorButton}>
                <Text style={styles.buttonNumberText}>+</Text>
              </TouchableHighlight>
            }
          </View>
        </View>

        <View style={styles.rowView}>
          <View style={styles.zeroButtonContainer}>
            <TouchableHighlight onPress={()=>this.numberButtonClick("0")} style={styles.zeroNumberButton}>
              <Text style={styles.zeroButtonNumberText}>0</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight onPress={() => this.numberButtonClick(".")} style={styles.numberButton}>
              <Text style={styles.buttonNumberText}>.</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight onPress={() => this.operationModeController("0")} style={styles.operatorButton}>
              <Text style={styles.buttonNumberText}>=</Text>
            </TouchableHighlight>
          </View>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex:1,
  },
  rowView:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-end'
  },
  number:{
    color:'white',
    fontSize:75,
    fontFamily:'Helvetica'
  },
  buttonContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  zeroButtonContainer:{
    flex:2,
    justifyContent:'center',
    alignItems:'center'
  },
  numberButton:{
    backgroundColor:'#424242',
    borderRadius:100,
    width:buttonDiameter/4-10,
    height:buttonDiameter/4-10,
    justifyContent:'center',
    alignItems:'center'
  },
  zeroNumberButton:{
    backgroundColor:'#424242',
    borderRadius:100,
    width:buttonDiameter/2-10,
    height:buttonDiameter/4-10,
    justifyContent:'center',
  },
  buttonNumberText:{
    color:'white',
    fontSize:35,
    fontFamily:'Helvetica'
  },
  zeroButtonNumberText:{
    color:'white',
    fontSize:35,
    fontFamily:'Helvetica',
    marginLeft:buttonDiameter/9
  },
  miscButton:{
    backgroundColor:'#c7c7c7',
    borderRadius:100,
    width:buttonDiameter/4-10,
    height:buttonDiameter/4-10,
    justifyContent:'center',
    alignItems:'center'
  },
  miscButtonText:{
    color:'black',
    fontSize:30,
    fontFamily:'Helvetica'
  },
  operatorButton:{
    backgroundColor:'#ff962e',
    borderRadius:100,
    width:buttonDiameter/4-10,
    height:buttonDiameter/4-10,
    justifyContent:'center',
    alignItems:'center'
  },
  activeOperatorButton:{
    backgroundColor:'white',
    borderRadius:100,
    width:buttonDiameter/4-10,
    height:buttonDiameter/4-10,
    justifyContent:'center',
    alignItems:'center'
  },
  activeOperatorText:{
    color:'#ff962e',
    fontSize:35,
    fontFamily:'Helvetica'
  },
});

export default App;
