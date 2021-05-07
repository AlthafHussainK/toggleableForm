import React, { useState, useRef, forwardRef, useEffect, createElement } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  let data = [
    { name: 'Log in', component: LoginForm },
    { name: 'Sign up', component: SignupForm }
  ]

  return (
    <section>
      <h2>Login / Sign up</h2>
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
  
})

ReactDOM.render(<App />, document.getElementById("root"));