import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostsByCategory } from "../../api/PostApi";
import { makeStyles } from "@material-ui/styles";
import Banner from "../../img/5707708.png";
import AddImage from "../../img/Fashion-Instagram-Story-14.png";
import Post from "../utils/post/Post";
import SportImage from "../../img/pexels-guduru-ajay-bhargav-863988.jpg";
import tranditionalImage from "../../img/truyenthong.jpg";
import foodImage from "../../img/amthuc.jpg";
import trendImage from "../../img/xuhuong.jpg";
import loveImage from "../../img/tinhyeu.jpg";
import techImage from "../../img/congnghe.jpg";
import gocchiaseImage from '../../img/goc-chia-se.jpeg'

const useStyle = makeStyles((theme) => ({
  categoryPage_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    background: "#e6e3e3",
  },
  categoryPage_body: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: '30px',
  },
  add: {
    width: "14%",
    marginTop: '20px',
    position: "sticky",
    top: "20px",
    height: "100%",
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  add_image: {
    width: "100%",
    objectFit: "cover",
    position: "absolute",
  },
  content: {
    width: "67%",
    background: "white",
    padding: "0 20px",
    [theme.breakpoints.down('sm')]: {
      width: "90%",
      paddingTop: '20px'
    }
  },
  banner: {
    width: "100%",
    height: "350px",
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      height: "150px",
    }
  },
  banner_img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(30%)'
  },
  category_name: {
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    fontSize: '60px',
    transform: 'translate(-50%, -100%)',
    zIndex: '1',
    [theme.breakpoints.down('sm')]: {
      fontSize: '28px',
    }
  }
}));

function CategoryPage({ user, setUser }) {
  const classes = useStyle();
  const slug = useParams();
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState("");
  const [bannerImg, setBannerImg] = useState("");

  const initializePosts = async () => {
    try {
      setPosts(await getPostsByCategory(slug?.slug));
    } catch (e) {
      console.log({ e });
    }
  };

  useEffect(() => {
    switch (slug.slug) {
      case "goc-chia-se":
        setCategory("Góc chia sẻ");
        setBannerImg(gocchiaseImage);
        break;
      case "truyen-thong":
        setCategory("Truyền thống");
        setBannerImg(tranditionalImage);
        break;
      case "suc-khoe":
        setCategory("Sức khỏe");
        setBannerImg(SportImage);
        break;
      case "am-thuc":
        setCategory("Ẩm thực");
        setBannerImg(foodImage);
        break;
      case "xu-huong":
        setCategory("Xu hướng");
        setBannerImg(trendImage);
        break;
      case "tinh-yeu":
        setCategory("Tình yêu");
        setBannerImg(loveImage);
        break;
      case "cong-nghe":
        setCategory("Công nghệ");
        setBannerImg(techImage);
        break;
      default:
        break;
    }
  }, [slug]);

  useEffect(() => {
    initializePosts();
  }, [slug]);

  return (
    <div className={classes.categoryPage_container}>
      <div className={classes.banner}>
        <h1 className={classes.category_name}>{category}</h1>
        <img src={bannerImg} alt="banner" className={classes.banner_img}/>
      </div>
      <div className={classes.categoryPage_body}>
        <div className={classes.add} style={{marginRight: '20px'}}>
          <img src={AddImage} alt="add" className={classes.add_image} />
        </div>
        <div className={classes.content}>
          {posts.map((post) => {
            return <Post key={post._id} post={post} user={user} posts={posts} setPosts={setPosts} />;
          })}
        </div>
        <div className={classes.add} style={{marginLeft: '20px'}}>
          <img src={AddImage} alt="add" className={classes.add_image} />
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
