import React, { useState, useRef, forwardRef, useEffect, createElement } from 'react';
import ReactDOM from 'react-dom';
import '../src/style.css'

const App = () => {
  let data = [
    { name: 'Log in', component: LoginForm },
    { name: 'Sign up', component: SignupForm }
  ]

  return (
    <section>
      <h2>Login / Sign up</h2>
      <ToggleableForm options={data} />
    </section>
  )
}

const ToggleableForm = ({ options }) => {
  const [currentForm, setCurrentForm ] = useState(0)
  let focusRef = useRef(null)

  return <>
    {options.map((el, index) => {
      return (
        <ButtonToggle 
          key={`button${index}`} 
          toggleForm={() => {
            setCurrentForm(index)
          }}
        >
          {el.name}
        </ButtonToggle>
      )
    })}
    <FormToggle currentIndex={currentForm}>
      {options.map((el, index) => {
        return (
          <div key={`form${index}`}>
            {createElement(el.component, { ref: focusRef })}
          </div>
        )
      })}
    </FormToggle>
  </>
}

const ButtonToggle = ({ children, toggleRef, toggleForm }) => {
  return (
    <button onClick={() => {
      toggleForm()
    }}>
      {children}
    </button>
  )
}

const FormToggle = ({ children, currentIndex }) => {
  if (Array.isArray(children)) {
    return <div>{children[currentIndex]}</div>
  }
  return null
}

const LoginForm = forwardRef((props, ref) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    ref.current.focus()
  }, [])

  return <>
    <input type="text" value={username} ref={ref} placeholder="Username" onChange={(e) => {
      setUsername(e.target.value)
    }} />
    <input type="password" value={password} placeholder="Password" onChange={(e) => {
      setPassword(e.target.value)
    }} />
    <button>Submit</button>
  </>
})

const SignupForm = forwardRef((props, ref) => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    ref.current.focus()
  }, [])

  return <>
    <input type="email" value={email} ref={ref} placeholder="Email" onChange={(e) => {
      setEmail(e.target.value)
    }} />
    <input type="text" value={username} placeholder="Username" onChange={(e) => {
      setUsername(e.target.value)
    }} />
    <input type="password" value={password} placeholder="Password" onChange={(e) => {
      setPassword(e.target.value)
    }} />
    <button>Submit</button>
  </>
})

ReactDOM.render(<App />, document.getElementById("root"));