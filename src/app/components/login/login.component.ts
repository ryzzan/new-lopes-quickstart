import { Component } from "@angular/core";
import { AuthService } from "./auth.service";

import { MyErrorHandler } from "../../utils/error-handler";
import { ActivatedRoute, Router } from "@angular/router";

import { UserInterface } from "../../interfaces/autentikigo";
import { MatSnackBar } from "@angular/material/snack-bar";
import { environment } from "src/environments/environment";
import { FormBuilder, Validators } from "@angular/forms";

export interface ParamsI {
  token?: string;
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  user?: any;
  loggedIn = false;
  isLoading = true;
  errorHandler = new MyErrorHandler;

  constructor(
    private loginFormBuilder: FormBuilder, 
    private authService: AuthService,
    private _snackbar: MatSnackBar
  ) {
  }
  
  loginForm = this.loginFormBuilder.group({
    'username': [null, [Validators.required]],
    'password': [null, [Validators.required]]
  });


  loginSubmit = (): void => {
    this.isLoading = true;
    this.authService.login(this.loginForm.value)
    .catch(err => {
      this.isLoading = false;
      const message = this.errorHandler.apiErrorMessage(err.error.error.message);
      this._snackbar.open(message, undefined, {
        duration: 4 * 1000,
      });
    })
  }

  setSessionStorage = (data: any) => {
    sessionStorage.setItem("_id", data.userData._id);
    sessionStorage.setItem("token", data.access_token);
    sessionStorage.setItem("refreshToken", data.authRefreshToken);
    sessionStorage.setItem("email", data.userData.email);
    sessionStorage.setItem(
      "permission",
      JSON.stringify(data.userData.permissionGroups)
    );

    if (data.userData.person) {
      sessionStorage.setItem("birthday", data.userData.person.birthday);
      sessionStorage.setItem("country", data.userData.person.country);
      sessionStorage.setItem("gender", data.userData.person.gender);
      sessionStorage.setItem("mother", data.userData.person.mother);
      sessionStorage.setItem("name", data.userData.person.name);
      sessionStorage.setItem("uniqueId", data.userData.person.uniqueId);
      sessionStorage.setItem("personId", data.userData.person._id);
    }

    if (data.userData.company) {
      sessionStorage.setItem("birthday", data.userData.company.birthday);
      sessionStorage.setItem("cnae", data.userData.company.cnae);
      sessionStorage.setItem(
        "corporateName",
        data.userData.company.corporateName
      );
      sessionStorage.setItem("tradeName", data.userData.company.tradeName);
      sessionStorage.setItem("companyEmail", data.userData.company.email);
      sessionStorage.setItem("responsible", data.userData.company.responsible);
      sessionStorage.setItem("uniqueId", data.userData.company.uniqueId);
      sessionStorage.setItem("companyId", data.userData.company._id);
    }
  };

  sendErrorMessage = (errorMessage: string) => {
    this._snackbar.open(errorMessage, undefined, {
      duration: 4 * 1000,
    });
  };
}
