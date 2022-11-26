import React, {useState} from 'react'
import { makeStyles } from "@material-ui/styles";
import { Link } from 'react-router-dom';
import axios from 'axios'

const useStyle = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  login_form: {
    width: '30%',
    height: '60vh',
    marginTop: '50px',
    background: 'white',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      width: '80%'
    }
  },
  input_container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    marginTop: '10px',
  },
  input_field: {
    border: '1px solid #ccc',
    width: '100%',
    height: '35px',
    marginTop:'5px',
  },
  submit_container: {
    marginTop: '20px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end'
  },
  submit_btn: {
    width: '100%',  
    cursor: 'pointer',
    height: '40px',
    marginTop: '10px',
    background: '#0d96d6',
    border: 'none',
    fontWeight: '550',
    color: 'white',
    borderRadius: '5px',
  },
  err_message: {
    color: 'red',
    marginTop: '20px',
  }
}))

function Register({user, setUser}) {
  const classes = useStyle()
  const [userLogin, setUserLogin] = useState({
    name: '', password: ''
  })
  const [checkPassword, setCheckPassword] = useState('')
  const [err, setErr] = useState('')
  const URL = 'https://news-for-youth.herokuapp.com'

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (checkPassword !== userLogin.password) {
        setErr('Nhập lại mật khẩu không chính xác')
        return;
      }
      const login_user = await axios.post(URL + '/user/register', {
        name: userLogin.name,
        password: userLogin.password
      })
      setUser(login_user.data.user)
      window.location.href = '/'
    } catch (e) {
      setErr(e.response.data.msg);
    }
  }

  const handleChange = async (e) => {
    const { name, value } = e.target
    setUserLogin({
      ...userLogin,
      [name]: value
    })
  }

  return (
    <div className={classes.container}>
      <div className={classes.login_form}>
        <form onSubmit={handleSubmit} style={{marginTop: '30px', width: '80%'}}>
          <div className={classes.input_container}>
            <label htmlFor="name_input">Tên</label>
            <input onChange={handleChange} placeholder='Tên' name='name' type="text" id='name_input' className={classes.input_field} />
          </div>
          <div className={classes.input_container}>
            <label htmlFor="password">Mật khẩu</label>
            <input onChange={handleChange} placeholder='Mật khẩu' name='password' type="password" id='password' className={classes.input_field} />
          </div>
          <div className={classes.input_container}>
            <label htmlFor="check_password">Nhập lại mật khẩu</label>
            <input onChange={(e) => setCheckPassword(e.target.value)} placeholder='Nhập lại mật khẩu' name='check_password' type="password" id='check_password' className={classes.input_field} />
          </div>
          <div className={classes.submit_container}>
            <button type='submit' className={classes.submit_btn}>ĐĂNG KÝ</button>
          </div>
          <div className={classes.err_message}>{ err  }</div>
        </form>
      </div>
    </div>
  )
}

export default Register