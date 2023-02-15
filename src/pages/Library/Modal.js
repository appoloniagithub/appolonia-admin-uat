import React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import { Button } from "reactstrap"
function DialogModal(props) {
  const { open, handleClose, deleteData, articleId } = props
  //   const [open, setOpen] = useState(false)

  //   const handleClickOpen = () => {
  //     setOpen(true)
  //   }

  //   const handleClose = () => {
  //     setOpen(false)
  //   }
  console.log(articleId, "test")
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          className="btn btn-primary m-2 "
          color="primary"
          onClick={handleClose}
        >
          CANCEL
        </Button>
        <Button
          className="btn btn-primary m-2 "
          color="primary"
          onClick={() => deleteData(articleId)}
        >
          DELETE
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogModal
