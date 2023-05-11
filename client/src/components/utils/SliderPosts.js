import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import FavouritePosts from "./post/FavouritePost";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles((theme) => ({
  sliderposts: {
    height:'300px',
    width: '100%',
    marginTop: '60px',
    borderBottom: '3px solid #1f7ed1',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
}))

var settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

function SliderPosts({favouritePosts}) {
  const classes = useStyle()

  return (
    <div className={classes.sliderposts}>
      <Slider {...settings}>
        {
          favouritePosts?.map((post) => {
            return <FavouritePosts post={post} key={post?._id} />
          })
        }
      </Slider>
    </div>
  );
}

export default SliderPosts