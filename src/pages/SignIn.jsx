import React, { useState } from 'react';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import { Checkbox } from '@progress/kendo-react-inputs';
import { Link } from 'react-router-dom';
import { Button } from '@progress/kendo-react-buttons';
import { SvgIcon } from '@progress/kendo-react-common'; 
import { eyeIcon } from '@progress/kendo-svg-icons';
import axios from 'axios';



export const SignIn = () => {
  const [paswordType, setPasswordType] = React.useState('password')
  const[loginValue,setLoginValue] = useState('')
  const[passwordValue,setPasswordValue] = useState('')

  const handleClick = () => {
    if (paswordType === 'password') {
      setPasswordType('text')
    } else if (paswordType === 'text') {
      setPasswordType('password')
    }
    alert("Hello");
     fetch("http://localhost:5027/WeatherForecast").then(res=>res.json()).then(t=>console.log(t));
     console.log("Hello");
  }

  const fetchData = async () => {
    try {
      console.log(sessionStorage.getItem('token').token);
      // Fetch data from your API using axios
      const response = await axios.get('http://localhost:5027/odata/Application', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}` // Include JWT token in the Authorization header
        }
      });
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

 

  const signInClick =()=>{
console.log(loginValue);
console.log(passwordValue);

fetch('http://localhost:5027/api/Authentication/login', {
  method: 'POST',
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json;odata.metadata=minimal;odata.streaming=true',
    'Access-Control-Allow-Origin':'True',
    'Access-Control-Allow-Headers': '*'
  },
  body: JSON.stringify({
    username: 'admin',
    password: '1'
  })
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  // Handle the response data
  console.log(data.token);
  
  sessionStorage.setItem('token',data.token);
  fetchData();
})
.catch(error => {
  // Handle errors
  console.error('There was a problem with the fetch operation:', error);
});

  }





   return (
      <div className="App">
      <div className="sign-in-page">
 <div className="sign-in-wrapper">
     <div className="logo-wrapper">
         <div className="logo">
         <img src={require('../assets/posmanager.png')} alt={'sign in icon'} /> 
         </div>
         <div className='banner'>
             Sign In
         </div>
         <div className="account">
             Don't have an account? <Link to="/signup">Sign up</Link>
         </div>
     </div>
     <div className="inputs-wrapper">
     <Form  render={formRenderProps => <FormElement style={{
maxWidth: 650
}}>
     <fieldset className={'k-form-fieldset'}>         
       <div className="mb-3">
         <Field name={"email"} type={"email"} component={Input} label={"Email"} value={loginValue}
         onChange={(e)=>setLoginValue(e.value)} />
       </div>
       <div className="mb-3" style={{display: 'flex'}}>
         <Field name={"password"} type={paswordType} component={Input} label={"Password"} value={passwordValue}
         onChange={(e)=>setPasswordValue(e.value)} />
         <SvgIcon icon={eyeIcon} className='password-icon' onClick={handleClick}/>
       </div>
     </fieldset>
     <fieldset className={'k-form-fieldset'}>         

     <div className="mb-3">
     <Checkbox label={'Remember Me'} />
       </div>
       </fieldset>

     <div className="k-form-buttons">
       <Link to="/home/dashboard" className="dashboard-button" style={{ textDecoration: 'none' }}>
       <Button type={'submit'} className="sign-button" onClick={signInClick}>
         Sign In
        </Button>
        </Link>
     </div>
   </FormElement>} />
         
     </div>
     <div className="continue-with-wrapper">
         <hr /> <span>Or continue with</span><hr/>
     </div>
     <div className="social-wrapper">
         <a href="/#" className='facebook'>
             <img src={require('../assets/facebook.png')} alt={'facebook icon'}></img>
         </a>
         <a href="/#" className='twitter'>
             <img src={require('../assets/twitter.png')} alt={'twitter icon'}></img>
         </a>
         <a href="/#" className='reddit'>
             <img src={require('../assets/reddit.png')} alt={'reddit icon'}></img>
         </a>
     </div>
 </div>
 <div className="frame-wrapper">
     <div className="text-wrapper">
     <h2>PUREPOS Cloud Portal</h2>
     <h4>Kassasystem - Pinautomaat - Voorraadbeheer</h4>
     
     <h4>Webshopkoppeling</h4>
     <h4>Boekhoudkoppeling</h4>
          <div className="image-wrapper">
             <img src={require('../assets/kendoka.png')} alt={'kendoka'} className="kendoka"/>
         </div>

         </div>
 </div>
 
</div>
<div className="second-image-wrapper">
         <svg shapeRendering="geometricPrecision" textRendering="geometricPrecision" viewBox="0 0 877 455" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="c" x1="-215.96" x2="-193.81" y1="3.9321" y2="481.35" gradientTransform="translate(0)" gradientUnits="userSpaceOnUse">
<stop stopColor="#3a55da" offset="0"/>
<stop stopColor="#282f89" offset="1"/>
</linearGradient>
<linearGradient id="b" x1="193" x2="189.69" y1="110.04" y2="467.14" gradientTransform="translate(0)" gradientUnits="userSpaceOnUse">
<stop stopColor="#5777ea" offset="0"/>
<stop stopColor="#282f89" offset="1"/>
</linearGradient>
</defs>
<g clipPath="url(#a)">
<path d="m508 252.23c-19.813 7.858-44.698 9.642-67.066 4.808l-372.33-80.47c-7.925-1.743-16.67-2.659-25.545-2.676h-347.11c-11.369-0.043-22.465-1.524-31.943-4.263l-227.01-63.749v349.12h1440v-349.12l-369 146.35z" fill="url(#c)"/>
<path transform="translate(0 -1.2096)" d="m614.43 65.522c-21.739-4.7239-45.629-2.7433-64.836 5.3758l-144.06 60.901c-19.56 8.268-43.951 10.162-65.973 5.121l-266.89-61.085c-7.7988-1.8116-16.334-2.7596-24.984-2.775h-341.68c-18.461 0-36.273 4.4105-50.027 12.387l-218.98 127v242.56h1440v-332.44l-262.57-57.043z" fill="url(#b)" opacity=".237"/>
<clipPath id="a">
<rect width="877" height="455" rx="0" ry="0" fill="#fff"/>
</clipPath>
</g>
</svg>
   </div>
 </div>
   )
}