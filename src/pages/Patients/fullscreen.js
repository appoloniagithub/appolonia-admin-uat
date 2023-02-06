import React, { useState } from "react"
import PT from "prop-types"
import ReactDOM from "react-dom"
import {
  LightgalleryProvider,
  LightgalleryItem,
  withLightgallery,
  useLightgallery,
} from "react-lightgallery"
import "lightgallery.js/dist/css/lightgallery.css"

function Fullscreen({ selectedScanImages1, imageId }) {
  //console.log(scanImages, "scan img")
  const PhotoItem = ({ image, thumb, group }) => (
    <div className="mx-1 rounded" style={{ height: "32%", width: "32%" }}>
      <LightgalleryItem
        group={group}
        src={`https://appoloniaapps3.s3.amazonaws.com/${image}`}
        thumb={thumb}
      >
        {console.log("image in photo item", image)}
        <img
          src={`https://appoloniaapps3.s3.amazonaws.com/${image}`}
          style={{ width: "100%" }}
        />
      </LightgalleryItem>
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
  let groupId = imageId
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
            {selectedScanImages1.map((p, idx) => (
              <PhotoItem key={idx} image={p} group={groupId} />
            ))}
          </div>
          {/* <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {scanImages.map((p, idx) => (
              <PhotoItem key={idx} image={p} group={groupId} />
            ))}
          </div> */}
          <div className="buttons mt-4">
            <OpenButtonWithHook id={groupId} />
          </div>
        </LightgalleryProvider>
      </div>
    </div>
  )
}

export default Fullscreen
