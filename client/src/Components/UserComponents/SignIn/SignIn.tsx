import React,{useState} from 'react'
import './SignIn.css'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const SignIn:React.FC =()=> {


  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  

 function handleSignUpClick():void{
      navigate('/sign-up')
  }

 
  //validate email
  const validateEmail = (email: string): boolean => {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);

    };
    


//controlled component state updation
function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void{
    
  setFormData({...formData,[e.target.id]:e.target.value})
}


//validation of inputs
  function onSubmitSignUp(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()

    let isValid = true;
   

    if (formData.email.trim() === '') {
      toast.error('Please enter an email address')
      isValid = false;
    }
    else if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email.');
      isValid = false;
    }


    if (formData.password.trim().length < 6) {
      toast.error('Password must be at least 6 characters long.');
      isValid = false;
    }


    if (isValid) {

      //sending form data to server
      fetch('/user/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }).then((res) => {
        return res.json()

      }).then((response) => {
        if (response?.token) {
          
          localStorage.setItem('jwt', response.token);

          

        } else {
           toast.error(response.message)
        }
      
      }).catch((error) => {
        console.log(error) 
      })

    }
  }

  return (
    <div className="signin-container">
      <ToastContainer position='bottom-right'/>
      <div className="signin-box">
        <div className="signup-header">
          <h2>SignIn To E-HUB</h2>
        </div>
        <form className="signin-form" onSubmit={onSubmitSignUp}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter a password" value={formData.password} onChange={handleInputChange}/>
          </div>
          <button type="submit" className="signin-btn">Sign In</button>
        </form>
        <div className='signup-link' onClick={handleSignUpClick}>Create an Account?</div>
      </div>
    </div>
  )
}

export default SignIn
