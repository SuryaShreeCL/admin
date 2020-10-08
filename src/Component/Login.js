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
                 <labe className='login__header__label'>Welcome to CareerLabs,</labe>
               </div>
               <div className='login__body'>                 
                  <div className='login__text__box'><TextField id="Username" label="Email" variant="outlined" fullWidth  size='medium' /></div>
                  <div className='login__text__box'><TextField id="Password" inputProps={{type:'password'}} label="Password" variant="outlined" fullWidth size='medium' /></div>                                                  
               </div>
               <div className='login__footer'>
                <div className='login__button'><Button variant='contained' color='primary' >Sign in</Button></div>
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
