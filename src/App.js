import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Output from './components/Output';
import Select from './components/controls/Select';
import Text from './components/controls/Text';
class App extends Component {
  constructor(props){
     super(props);
     this.state={
      type:'hipster-latin',
      html:true,
      text:''
     }
  }

componentWillMount(){
  this.getSampleText();
}

getSampleText(){
  axios.get('http://hipsterjesus.com/api/?type='+this.state.type+'&html='+this.state.html)
   .then((response)=>{
    this.setState({text:response.data.text},function(){
      console.log(this.state);
    })
   })
   .catch((err)=>{
    console.log(err);
   })
  ;
}

showHtml(x){
  this.setState({html:x},this.getSampleText)
}
changetype(y){
  this.setState({type:y},this.getSampleText)
}

  render() {
    return (
      <div className="App container">
          <h1 className="text-center">ReactJS text generator</h1>
          <hr />
          <form className="form-inline">
            <div className="form-group">
               <label>HTML:</label>
               <Select value={this.state.html} onChange={this.showHtml.bind(this)}/>
             </div>
             <div className="form-group">
               <label>Types:</label>
               <Text value={this.state.type} onChange={this.changetype.bind(this)}/>
             </div>
           </form>

           <Output value={this.state.text} />
       </div>
    );
  }
}

export default App;
