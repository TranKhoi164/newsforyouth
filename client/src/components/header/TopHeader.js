import React from 'react'
import { makeStyles } from '@material-ui/styles'
import {Typography} from '@material-ui/core'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SearchIcon from '@material-ui/icons/Search';
import '../../App.css'
import { useNavigate } from 'react-router-dom';
import {Avatar} from '@material-ui/core'
import {Link} from 'react-router-dom'
import Logo from '../../img/Logo.png'

const useStyle = makeStyles((theme) => ({
  top_header: {
    height: '70px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: '100',
    backgroundColor: 'white',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
    }
  },
  btn: {
    display: 'flex',
    color: '#0d96d6',
    flexDirection: 'column',
    fontSize: '12px',
    alignItems: 'center'
  }, 
  category_name: {
    color: '#0d96d6',
    fontSize: '40px',
    fontFamily: 'Cambria, Cochin, Georgia, Times, Times New Roman, serif',
    fontWeight: '550',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  search_btn: {
    paddingLeft: '10px',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  },
  login_btn: {
    paddingRight: '10px',
    borderRight: '1px solid #d9dbda',
    [theme.breakpoints.down('sm')]: {
      borderRight: 'none',
      paddingRight :'20px',
    }
  },
  user_inf: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: '10px',
    borderRight: '1px solid #a9abaa',
    [theme.breakpoints.down('sm')]: {
      borderRight: 'none',
    }
  },
  logo: {
    height: '70%',
    [theme.breakpoints.down('sm')]: {
      height: '45%',
      marginLeft: '20px'
    }
  }
}))

function TopHeader({user, setUser}) {
  const navigate = useNavigate()
  const classes = useStyle()

  const navigateToLoginPage = () => {
    navigate('/login')
  }

  const logout = () => {
    setUser({})
    localStorage.setItem('user', JSON.stringify({}));
  }

  return (
    <div className={classes.top_header}>
      <Link to='/' style={{height: '100%', display: 'flex', alignItems: 'center'}}><img className={classes.logo} src={Logo} alt="logo" /></Link>
      
      <div  style={{cursor: 'pointer', color: '#7d7c78', display: 'flex', fontWeight: '550'}}>
        { 
          Object.keys(user).length === 0 
          ? <div onClick={navigateToLoginPage}  className={`${classes.btn} ${classes.login_btn}`}>
              <PersonOutlineIcon />
              Đăng nhập
            </div>
          : <div className={classes.user_inf}>
            <Avatar alt="Remy Sharp" src={user.avatar} style={{marginRight: '5px'}} /> {user.name} | <span onClick={logout}> đăng xuất</span>
          </div>
        }
        <div className={`${classes.btn} ${classes.search_btn}`} onClick={() => {navigate('/search')}} >
          <SearchIcon /> 
          Tìm kiếm
        </div>
      </div>
    </div>
  )
}

export default TopHeader