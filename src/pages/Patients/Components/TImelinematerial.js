import React from "react"
import Timeline from "@mui/lab/Timeline"
import TimelineItem from "@mui/lab/TimelineItem"
import TimelineSeparator from "@mui/lab/TimelineSeparator"
import TimelineConnector from "@mui/lab/TimelineConnector"
import TimelineContent from "@mui/lab/TimelineContent"
import TimelineDot from "@mui/lab/TimelineDot"
import { makeStyles } from "@mui/styles"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import dateFormat, { masks } from "dateformat"
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll"

const useStyles = makeStyles({
  timeline: {
    transform: "rotate(90deg)",
  },
  timelineContentContainer: {
    textAlign: "left",
  },
  timelineContent: {
    display: "inline-block",
    transform: "rotate(-90deg)",
    textAlign: "center",
    // minWidth: 20,
    // width: "100px",
    marginTop: 150,
  },
  timelineIcon: {
    transform: "rotate(-90deg)",
  },
})

const Timelinematerial = ({ scans }) => {
  const classes = useStyles()

  return (
    <Timeline className={classes.timeline} align="alternate">
      <Element
        className="element"
        id="scroll-container"
        style={{
          position: "relative",
          height: "420px",
          width: "100px",
          overflowX: "scroll",
          //   marginBottom: "100px",
        }}
        horizontal={true}
      >
        <Element
          //   name="scroll-container-first-element"
          style={{
            marginBottom: "200px",
          }}
        >
          {scans?.length > 0 &&
            scans.map(scan => {
              return (
                <TimelineItem
                  className=""
                  key=""
                  onClick={() => console.log("i am clicked")}
                >
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent className={classes.timelineContentContainer}>
                    <Paper className={classes.timelineContent}>
                      <Typography>
                        {dateFormat(scan?.created, "mmmm dS, yyyy")}
                      </Typography>
                    </Paper>
                  </TimelineContent>
                </TimelineItem>
              )
            })}
        </Element>
      </Element>
    </Timeline>
  )
}

export default Timelinematerial
