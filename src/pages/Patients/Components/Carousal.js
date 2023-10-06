import React, { Component } from "react"
// import {
//   Carousel,
//   CarouselItem,
//   CarouselControl,
//   CarouselIndicators,
// } from "reactstrap"
import Carousel from "react-bootstrap/Carousel"
import Fullscreen from "../fullscreen"
import Zoom from "../zoom"
import url from "Connection/Api/api"
// Carousel images
// import img3 from
// import img4 from
// import img5 from

const items = [
  {
    src: "https://images.pexels.com/photos/3762453/pexels-photo-3762453.jpeg?auto=compress&cs=tinysrgb&w=1600",
    // altText: "Slide 1",
    // caption: "Slide 1",
  },
  {
    src: "https://images.pexels.com/photos/65665/smile-mouth-teeth-laugh-65665.jpeg?auto=compress&cs=tinysrgb&w=1600",
    // altText: "Slide 2",
    // caption: "Slide 2",
  },
  {
    src: "https://images.pexels.com/photos/3762402/pexels-photo-3762402.jpeg?auto=compress&cs=tinysrgb&w=1600",
    // altText: "Slide 3",
    // caption: "Slide 3",
  },
]

// class Slidewithindicator extends Component {
//   constructor(props) {
//     super(props)
//     this.state = { activeIndex: 0 }
//     this.next = this.next.bind(this)
//     this.previous = this.previous.bind(this)
//     this.goToIndex = this.goToIndex.bind(this)
//     this.onExiting = this.onExiting.bind(this)
//     this.onExited = this.onExited.bind(this)
//   }

//   onExiting() {
//     this.animating = true
//   }

//   onExited() {
//     this.animating = false
//   }

//   next() {
//     if (this.animating) return
//     const nextIndex =
//       this.state.activeIndex === items.length - 1
//         ? 0
//         : this.state.activeIndex + 1
//     this.setState({ activeIndex: nextIndex })
//   }

//   previous() {
//     if (this.animating) return
//     const nextIndex =
//       this.state.activeIndex === 0
//         ? items.length - 1
//         : this.state.activeIndex - 1
//     this.setState({ activeIndex: nextIndex })
//   }

//   goToIndex(newIndex) {
//     if (this.animating) return
//     this.setState({ activeIndex: newIndex })
//   }

//   render() {
//     console.log(this.props, "i am props")
//     const { activeIndex } = this.state

//     const slides = this.props?.scanImages?.map((item, i) => {
//       console.log(i)
//       return (
//         <CarouselItem
//           onExiting={this.onExiting}
//           onExited={this.onExited}
//           key={item}
//           // className="d-block img-fluid"
//         >
//           <img
//             style={{
//               transform: `rotate(${0}deg)`,
//               // minHeight: "200px",
//               // height: "auto",
//               width: "100%",
//               height: "100%",
//             }}
//             src={`data:image/jpeg;base64,${item}`}

//             // alt={item.altText}
//           />
//         </CarouselItem>
//       )
//     })

//     return (
//       <React.Fragment>
//         <Carousel
//           activeIndex={activeIndex}
//           next={this.next}
//           previous={this.previous}
//           interval={null}
//         >
//           <CarouselIndicators
//             items={items}
//             activeIndex={activeIndex}
//             onClickHandler={this.goToIndex}
//           />
//           {slides}
//           <CarouselControl
//             direction="prev"
//             directionText="Previous"
//             onClickHandler={this.previous}
//           />
//           <CarouselControl
//             direction="next"
//             directionText="Next"
//             onClickHandler={this.next}
//           />
//         </Carousel>
//       </React.Fragment>
//     )
//   }
// }

// export default Slidewithindicator

//   console.log(scanImages)
//   return (
//     <div
//       id="carouselExampleControls"
//       className="carousel slide"
//       data-ride="carousel"
//     >
//       <div className="carousel-inner">
//         {scanImages?.length > 0 &&
//           scanImages?.map(scanImage => {
//             return (
//               <div key={scanImage.src} className="carousel-item active">
//                 <img
//                   className="d-block w-100"
//                   // src={scanImage}
//                   src={`data:image/jpeg;base64,${scanImage}`}
//                   alt="First slide"
//                 />
//               </div>
//             )
//           })}
//       </div>
//       <a
//         className="carousel-control-prev"
//         href="#carouselExampleControls"
//         role="button"
//         data-slide="prev"
//       >
//         <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//         <span className="sr-only">Previous</span>
//       </a>
//       <a
//         className="carousel-control-next"
//         href="#carouselExampleControls"
//         role="button"
//         data-slide="next"
//       >
//         <span className="carousel-control-next-icon" aria-hidden="true"></span>
//         <span className="sr-only">Next</span>
//       </a>
//     </div>
//   )
// }

// export default Scancarousal

const Scancarousal = ({ scanImages }) => {
  return (
    <Carousel interval={null}>
      {scanImages?.map((image, i) => {
        console.log(scanImages.length, "i am scan images")
        return (
          // <Zoom key={i} scanImages={scanImages} />
          <Carousel.Item key={i}>
            <div style={{ position: "relative", overflow: "hidden" }}>
              {/* <Zoom scanImages={scanImages} /> */}
              <img
                style={{
                  transform: `rotate(${270}deg) scale(1.5)`,
                  minHeight: "200px",
                  //transform: "scale(1.2)",
                  height: "100%",
                  width: "100%",
                  //height: "80%",
                  zIndex: 0,
                }}
                //src={`https://appoloniaapps3.s3.amazonaws.com/${image}`}
                //src={`data:image/jpeg;base64,${image}`}
                src={`${url}/api/${image}`}
                // onClick={() =>
                //   window.open(
                //     `data:image/jpeg;base64,${image}`,
                //     "_blank",
                //     "noopener,noreferrer"
                //   )
                // }

                // alt={item.altText}
              />
              {/* <i
                style={{ position: "absolute", top: 10, zIndex: 5 }}
                className="fas fa-search-plus"
              ></i> */}
            </div>
          </Carousel.Item>
        )
      })}
    </Carousel>
  )
}

export default Scancarousal
