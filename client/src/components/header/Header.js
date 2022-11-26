import React, {useState} from 'react'
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom'
import { Menu, MenuItem } from '@material-ui/core';
import TopHeader from './TopHeader';

const useStyle = makeStyles((theme) => ({
  header_container: {
    width: '100%',
  },
  header: {
    color: 'white',
    backgroundColor: '#0d96d6', 
    height: '35px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold'
  },
  container: {
    display: 'flex',
    width: '100vw',
    justifyContent: 'space-around',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'space-between',
    },
  },
  list_header: {
    display: 'flex',
    height: '100%',
    width: '80%',
    justifyContent: 'center',
    fontWeight: '600',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  list_header_subs: {
    '&:hover': {
      background: '#02b2f7',
      color: 'white'
    },
    color: 'white',
    textDecoration: 'none',
    padding: '0 20px',
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  list_header_subs_mobile: {
    color: 'black',
    textDecoration: 'none',

  },
  menuButton: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  }
}))

function Header({user, setUser}) {
  const classes = useStyle()
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.header_container}>
      <TopHeader user={user} setUser={setUser} />
      <div className={classes.header}>
        <div className={classes.container}>

          {/* list header */}
          <div className={classes.list_header}>
            <Link to='/category/truyen-thong' className={classes.list_header_subs}>Truyền thống</Link>
            <Link to='/category/suc-khoe' className={classes.list_header_subs}>Sức khỏe</Link>
            <Link to='/category/am-thuc' className={classes.list_header_subs}>Ẩm thực</Link>
            <Link to='/category/xu-huong' className={classes.list_header_subs}>Xu hướng</Link>
            <Link to='/category/tinh-yeu' className={classes.list_header_subs}>Tình yêu</Link>
            <Link to='/category/cong-nghe' className={classes.list_header_subs}>Công nghệ</Link>
            <Link to='/category/goc-chia-se' className={classes.list_header_subs}>Góc chia sẻ</Link>
            {user.name === 'admin' && <Link to='/create-post' className={classes.list_header_subs}>Tạo bài viết</Link>}
          </div>

          {/* right header mobile */}
          <div className={classes.menuButton}>
            <IconButton className={classes.menuButton} onClick={handleClick}>
              <MenuIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}><Link to='/category/truyen-thong' className={classes.list_header_subs_mobile}>Truyền thống</Link></MenuItem>
              <MenuItem onClick={handleClose}><Link to='/category/suc-khoe' className={classes.list_header_subs_mobile}>Sức khỏe</Link></MenuItem>
              <MenuItem onClick={handleClose}><Link to='/category/am-thuc' className={classes.list_header_subs_mobile}>Ẩm thực</Link></MenuItem>
              <MenuItem onClick={handleClose}><Link to='/category/xu-huong' className={classes.list_header_subs_mobile}>Xu hướng</Link></MenuItem>
              <MenuItem onClick={handleClose}><Link to='/category/tinh-yeu' className={classes.list_header_subs_mobile}>Tình yêu</Link></MenuItem>
              <MenuItem onClick={handleClose}><Link to='/category/cong-nghe' className={classes.list_header_subs_mobile}>Công nghệ</Link></MenuItem>
              <MenuItem onClick={handleClose}><Link to='/category/goc-chia-se' className={classes.list_header_subs_mobile}>Góc chia sẻ</Link></MenuItem>
              <MenuItem onClick={handleClose}><Link to='/search' className={classes.list_header_subs_mobile}>Tìm kiếm</Link></MenuItem>
              {user.name === 'admin' && <MenuItem onClick={handleClose}><Link to='/create-post' className={classes.list_header_subs_mobile}>Tạo bài viết</Link></MenuItem>}
            </Menu>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header