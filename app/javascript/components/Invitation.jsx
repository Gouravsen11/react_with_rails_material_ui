import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { register } from "./RegistrationStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { FormControl, Input, InputLabel, Button } from "@material-ui/core";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@material-ui/icons/VisibilityOffTwoTone";
import CloseIcon from "@material-ui/icons/Close";

class Invitation extends Component {
  state = {
    email: "",
    error: null,
    errorOpen: false
  };

  errorClose = e => {
    this.setState({
      errorOpen: false
    });
  };

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value
    });
  };

  isValid = () => {
    if (this.state.email === "")  {
      return false;
    }
    return true;
  };

  submitInvitation = e => {
    e.preventDefault();
    const invitedEmail = {
      email: this.state.email
    };
    console.log("this.props.invitedEmail", invitedEmail);
    
    let data = {email: invitedEmail};
    const { history } = this.props;
    
    fetch('/api/user/send_invitation', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
      },
      redirect: "error",
      body: JSON.stringify(data)
    })
    .then((data) => {
        if (data.ok) { 
          return data.json();
        }
        throw new Error("Network error.");
      })
    .then(resp => {
        console.log(resp)
        alert("Invitation Sent.")
      }).catch(error => {
        this.handleChange("error")
      });;
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        <CssBaseline />

        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PeopleAltIcon className={classes.icon} />
          </Avatar>
          <form
            className={classes.form}
            onSubmit={() => this.submitInvitation}
          >
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="email" className={classes.labels}>
                e-mail
              </InputLabel>
              <Input
                name="email"
                type="email"
                autoComplete="email"
                className={classes.inputs}
                disableUnderline={true}
                onChange={this.handleChange("email")}
              />
            </FormControl>

            <Button
              disabled={!this.isValid()}
              disableRipple
              fullWidth
              variant="outlined"
              className={classes.button}
              type="submit"
              onClick={this.submitInvitation}
            >
              Invite
            </Button>
          </form>

          {this.state.error ? (
            <Snackbar
              variant="error"
              key={this.state.error}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              open={this.state.errorOpen}
              onClose={this.errorClose}
              autoHideDuration={3000}
            >
              <SnackbarContent
                className={classes.error}
                message={
                  <div>
                    <span style={{ marginRight: "8px" }}>
                      <ErrorIcon fontSize="large" color="error" />
                    </span>
                    <span> {this.state.error} </span>
                  </div>
                }
                action={[
                  <IconButton
                    key="close"
                    aria-label="close"
                    onClick={this.errorClose}
                  >
                    <CloseIcon color="error" />
                  </IconButton>
                ]}
              />
            </Snackbar>
          ) : null}
        </Paper>
      </div>
    );
  }
}

export default withStyles(register)(Invitation);
