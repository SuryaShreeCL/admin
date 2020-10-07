import React, { Component } from 'react'
import {TextField,Button} from '@material-ui/core'
import '../Asset/Login.css';
import GoogleBtn from './GoogleBtn';

export default class Login extends Component {
  render() {
    return (
      <div>
        <div className='root__login'>    
         <div className='login__container'>
           <div className='login__left__container'>
             <img src={require('../Asset/Images/leftLoginContainer.png')} alt='not suppotted' />
           </div>         
           <div className='login__right__container'>
             <div className='login__inner__box'>
               <div className='login__header'>
                 <h3>Login</h3>
               </div>
               <div className='login__body'>                 
                  <div className='login__text__box'><TextField id="Username" label="Email" variant="outlined" fullWidth  size='small' /></div>
                  <div className='login__text__box'><TextField id="Password" label="Password" variant="outlined" fullWidth size='small' /></div>                                                  
               </div>
               <div className='login__footer'>
                <div className='login__button'><Button variant='contained' color='primary' >Sign in</Button></div>
                <div className='login__footer__label'><label className='text-secondary'>Sign in with Other?</label></div>
                <GoogleBtn />
               </div>
             </div>
           </div>
          </div> 
        </div>
      </div>
    )
  }
}
