import React, { useState } from "react"
import PT from "prop-types"
import ReactDOM from "react-dom"
import Carousel from "react-bootstrap/Carousel"
import url from "Connection/Api/api"
import {
  LightgalleryProvider,
  LightgalleryItem,
  withLightgallery,
  useLightgallery,
} from "react-lightgallery"
//
//import "./styles.css";
import "lightgallery.js/dist/css/lightgallery.css"

const GROUP3 = ["1674200159906.png", "1674200159909.png", "1674200159912.png"]

function Zoom({ scanImages }) {
  const PhotoItem = ({ image, thumb, group }) => (
    <div
      style={{
        height: "100%",
        width: "100%",
        zIndex: 0,
        //transform: `rotate(${270}deg)`,
      }}
    >
      <Carousel.Item>
        <div style={{ position: "relative" }}>
          <LightgalleryItem
            group={group}
            // src={`https://appoloniaapps3.s3.amazonaws.com/${image}`}
            src={`${url}/api/${image}`}
            thumb={thumb}
          >
            <img
              //src={`https://appoloniaapps3.s3.amazonaws.com/${image}`}
              src={`${url}/api/${image}`}
              style={{
                width: "100%",
                transform: `rotate(${270}deg)`,
              }}
            />
          </LightgalleryItem>
        </div>
      </Carousel.Item>
    </div>
  )
  PhotoItem.propTypes = {
    image: PT.string.isRequired,
    thumb: PT.string,
    group: PT.string.isRequired,
  }

  const OpenButtonWithHook = props => {
    const { openGallery } = useLightgallery()
    return (
      <button
        {...props}
        onClick={() => openGallery(props.id)}
        className={["btn btn-primary m-2", props.className || ""].join(" ")}
      >
        Open images in full screen
      </button>
    )
  }
  OpenButtonWithHook.propTypes = {
    className: PT.string,
    id: PT.string,
  }
  let groupId = "group5"
  return (
    <div className="content">
      <div>
        <LightgalleryProvider
          onBeforeOpen={() => console.info("onBeforeOpen")}
          onAfterOpen={() => console.info("onAfterOpen")}
          onSlideItemLoad={() => console.info("onSlideItemLoad")}
          onBeforeSlide={() => console.info("onBeforeSlide")}
          onAfterSlide={() => console.info("onAfterSlide")}
          onBeforePrevSlide={() => console.info("onBeforePrevSlide")}
          onBeforeNextSlide={() => console.info("onBeforeNextSlide")}
          onDragstart={() => console.info("onDragstart")}
          onDragmove={() => console.info("onDragmove")}
          onDragend={() => console.info("onDragend")}
          onSlideClick={() => console.info("onSlideClick")}
          onBeforeClose={() => console.info("onBeforeClose")}
          onCloseAfter={() => console.info("onCloseAfter")}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {scanImages.map((p, idx) => (
              <PhotoItem key={idx} image={p} group={groupId} />
            ))}
          </div>

          <div className="buttons mt-4">
            <OpenButtonWithHook id={groupId} />
          </div>
        </LightgalleryProvider>
      </div>
    </div>
  )
}

export default Zoom
