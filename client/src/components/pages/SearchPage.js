import React, {useState, useEffect} from 'react'
import { makeStyles } from "@material-ui/styles";
import { getPostsBySearch } from '../../api/PostApi';
import Post from '../utils/post/Post';

const useStyle = makeStyles((theme) => ({
  searchPage_container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  searchPage_body: {
    width: '70%',
    marginTop: '20px',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    }
  },
  search_container: {
    width: '100%',
    height: '150px',
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    width: '70%',
    height: '35px',
    border: '1px solid #d1d1d1'
  },
  post_list: {
    marginTop: '30px',
  }
}))

function SearchPage({user}) {
  const classes = useStyle()
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [err, setErr] = useState('')

  const onSubmitForm = async (e) => {
    e.preventDefault()
    try {
      setPosts(await getPostsBySearch(search))
      setErr('')
    } catch (e) {
      setErr(e)
      setPosts([])
    }
  }

  return (
    <div className={classes.searchPage_container}>
      <div className={classes.searchPage_body}>
        <form onSubmit={onSubmitForm} className={classes.search_container}>
          <input type="text" className={classes.search} onChange={((e) => {setSearch(e.target.value)})} />
        </form>
        <div className={classes.post_list}>
          {
            posts.length > 0 &&
              posts.map(post => {
                return <Post user={user} key={post._id} post={post} />
              })
          }
          {
            err && <div style={{textAlign: 'center'}}>{err}</div>
          }
        </div>
      </div>
    </div>
  )
}

export default SearchPage