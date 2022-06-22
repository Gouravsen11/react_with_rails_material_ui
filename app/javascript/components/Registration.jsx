import React, { Component } from "react";
import { Link } from "react-router-dom";
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

class Registration extends Component {
  state = {
    email: "",
    username: "",
    bio: "",
    password: "",
    password_confirmation: "",
    hidePassword: true,
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

  passwordMatch = () => this.state.password === this.state.password_confirmation;

  showPassword = () => {
    this.setState(prevState => ({ hidePassword: !prevState.hidePassword }));
  };

  isValid = () => {
    if (this.state.email === "" || this.state.username === "")  {
      return false;
    }
    return true;
  };

  submitRegistration = e => {
    e.preventDefault();
    if (!this.passwordMatch()) {
      this.setState({
        errorOpen: true,
        error: "Passwords don't match"
      });
    }
    const newUserCredentials = {
      email: this.state.email,
      username: this.state.username,
      bio: this.state.bio,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    };
    console.log("this.props.newUserCredentials", newUserCredentials);
    let data = {user: newUserCredentials};
    const { history } = this.props;
    fetch('/api/users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "error",
      body: JSON.stringify(data)
    }).then(res => {
        e.preventDefault();
        window.location.href = "/login";
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
            onSubmit={() => this.submitRegistration}
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

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="username" className={classes.labels}>
                username
              </InputLabel>
              <Input
                name="username"
                type="text"
                autoComplete="username"
                className={classes.inputs}
                disableUnderline={true}
                onChange={this.handleChange("username")}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="bio" className={classes.labels}>
                bio
              </InputLabel>
              <Input
                name="bio"
                type="text"
                autoComplete="bio"
                className={classes.inputs}
                disableUnderline={true}
                onChange={this.handleChange("bio")}
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="password" className={classes.labels}>
                password
              </InputLabel>
              <Input
                name="password"
                autoComplete="password"
                className={classes.inputs}
                disableUnderline={true}
                onChange={this.handleChange("password")}
                type={this.state.hidePassword ? "password" : "input"}
                endAdornment={
                  this.state.hidePassword ? (
                    <InputAdornment position="end">
                      <VisibilityOffTwoToneIcon
                        fontSize="medium"
                        className={classes.passwordEye}
                        onClick={this.showPassword}
                      />
                    </InputAdornment>
                  ) : (
                    <InputAdornment position="end">
                      <VisibilityTwoToneIcon
                        fontSize="medium"
                        className={classes.passwordEye}
                        onClick={this.showPassword}
                      />
                    </InputAdornment>
                  )
                }
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="passwordConfrim" className={classes.labels}>
                confirm password
              </InputLabel>
              <Input
                name="password_confirmation"
                autoComplete="password_confirmation"
                className={classes.inputs}
                disableUnderline={true}
                onClick={this.state.showPassword}
                onChange={this.handleChange("password_confirmation")}
                type={this.state.hidePassword ? "password" : "input"}
                endAdornment={
                  this.state.hidePassword ? (
                    <InputAdornment position="end">
                      <VisibilityOffTwoToneIcon
                        fontSize="medium"
                        className={classes.passwordEye}
                        onClick={this.showPassword}
                      />
                    </InputAdornment>
                  ) : (
                    <InputAdornment position="end">
                      <VisibilityTwoToneIcon
                        fontSize="medium"
                        className={classes.passwordEye}
                        onClick={this.showPassword}
                      />
                    </InputAdornment>
                  )
                }
              />
            </FormControl>
            <Button
              disabled={!this.isValid()}
              disableRipple
              fullWidth
              variant="outlined"
              className={classes.button}
              type="submit"
              onClick={this.submitRegistration}
            >
              SignUp
            </Button>
           
          </form>
          
          <hr />
            <Link
              to="/login"
            >
              Already exists? Login Here
            </Link>

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

export default withStyles(register)(Registration);
