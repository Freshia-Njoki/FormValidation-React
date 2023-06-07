import './App.css'
import image from '../src/assets/R.jpeg'
import './index.css'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"

function App() {
  const schema = yup.object().shape({
    fullName: yup.string().required("full name is required"),
    email: yup.string().email().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"should start with atleast a digit or a letter and must include an @" ).required("email is required"),
    age: yup.number().positive().integer("must be a fullNumber").required("age is required"),
    password: yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "should contain special characters, letters, numbers and 8 charcacters long").required("passwird is required"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "password must match"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const sendDataToServer = (data) => {
    console.log(data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(sendDataToServer)} style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
        <img className='image' src={image} alt="" srcset="" />
        <label htmlFor="text">Enter your name:</label>
        <input type="text" id="text" placeholder='fullName' {...register("fullName")} />
        <p>{errors.fullName?.message}</p>
        <label htmlFor="email">Enter your email:</label>
        <input type="email" id="email" placeholder='email'  {...register("email")} />
        <p>{errors.email?.message}</p>
        <label htmlFor="age">Enter your age:</label>
        <input type="number" id="age" placeholder='age'  {...register("age")} />
        <p>{errors.age?.message}</p>
        <label htmlFor="password">Enter your password:</label>
        <input type="password" id='password' placeholder='password'  {...register("password")} />
        <p>{errors.password?.message}</p>
        <label htmlFor="confirmPassword">Confirm your password:</label>
        <input type="password" id="confirmPassword" placeholder='confirm Password'  {...register("confirmPassword")} />
        <p>{errors.confirmPassword?.message}</p>
        <input type="submit" value="Submit" style={{ width: "50%" }} />

      </form>
    </>
  )
}

export default App
