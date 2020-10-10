import React, { Component } from 'react'
import {TextField,Button} from '@material-ui/core'
import '../Asset/Login.css';
import GoogleBtn from './GoogleBtn';
import { rootPath } from './RoutePaths';

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',   
      error:'',
    }
  }
  componentDidMount(){
    // sessionStorage.setItem('token','false');
  }
  handleLogin=(e)=>{
    if(this.state.username==='admin' && this.state.password==='423uK6LmxG9f2w'){
      sessionStorage.setItem('token','true');
      this.props.history.push(rootPath);
    }else{
      sessionStorage.setItem('token','false');
      this.setState({error:'Invalid Username or Password'})
    }
  }
  render() {    
    return (
      <div>
        <div className='root__login'>    
         <div className='login__container'>
           <div className='login__left__container'>
             <img src={require('../Asset/Images/ProfileBuilder.png')} alt='not suppotted' />
           </div>         
           <div className='login__right__container'>
             <div className='login__inner__box'>
               <div className='login__header'>
                 <label className='login__header__label'>Welcome to CareerLabs,</label>
               </div>
               <div className='login__body'> 
                {(this.state.error !=='') ? this.state.error : null }                
                  <div className='login__text__box'><TextField id="Username" label="Email" variant="outlined" fullWidth  size='medium' value={this.state.username} onChange={(e)=>this.setState({username:e.target.value})} /></div>
                  <div className='login__text__box'><TextField id="Password" inputProps={{type:'password'}} label="Password" variant="outlined" fullWidth size='medium' value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})} /></div>                                                  
               </div>
               <div className='login__footer'>
                <div className='login__button'><Button variant='contained' color='primary' onClick={this.handleLogin.bind(this)} >Sign in</Button></div>
                <div className='login__footer__label'><label className='text-secondary'>Sign in with Other?</label></div>
                <GoogleBtn {...this.props} />
               </div>
             </div>
           </div>
          </div> 
        </div>
      </div>
    )
  }
}
