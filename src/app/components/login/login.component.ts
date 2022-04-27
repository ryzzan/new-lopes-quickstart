import { Component } from "@angular/core";
import { AuthService } from "./auth.service";

import { MyErrorHandler } from "../../utils/error-handler";
import { Router } from "@angular/router";

import { MatSnackBar } from "@angular/material/snack-bar";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  user?: any;
  loggedIn = false;
  isLoading = false;
  errorHandler = new MyErrorHandler();

  constructor(
    private loginFormBuilder: FormBuilder,
    private authService: AuthService,
    private _snackbar: MatSnackBar,
    private _router: Router
  ) {}

  loginForm = this.loginFormBuilder.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  loginSubmit = async () => {
    this.isLoading = true;
    try {      
      const result: any = await this.authService.login(this.loginForm.value);
      
      if (result.access_token) {
        this.setSessionStorage(result);
        this._router.navigate(["/main"]);
      }
    } catch (error: any) {
      this.isLoading = false;
      const message = this.errorHandler.apiErrorMessage(error.error.error.message);
      this._snackbar.open(message, undefined, {
        duration: 4 * 1000,
      });      
    }
  };

  setSessionStorage = (data: any) => {
    const userData = this.parseJwt(data.access_token);
    
    sessionStorage.setItem("token", data.access_token);
    sessionStorage.setItem("refreshToken", data.refresh_token);
    sessionStorage.setItem("_id", userData.external_id);
    sessionStorage.setItem("email", userData.email);
    // sessionStorage.setItem(
    //   "permission",
    //   JSON.stringify(data.userData.permissionGroups)
    // );
  };

  sendErrorMessage = (errorMessage: string) => {
    this._snackbar.open(errorMessage, undefined, {
      duration: 4 * 1000,
    });
  };

  parseJwt = (token: string) => {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };
}
