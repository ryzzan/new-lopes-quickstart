import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
}) 
export class AuthService {
  BASE_URL = environment.baseUrl;
  user = new BehaviorSubject<any>(null);

  constructor(
    public http: HttpClient,
    private router: Router
  ) {
    this.recoveryDataFromLocalStorage();
  }

  private recoveryDataFromLocalStorage(): void {
    const data: string | null = localStorage.getItem('user_data');
    if (!data) {
      return;
    }
    this.user.next(JSON.parse(data));
  }

  login = async (login: any): Promise<any> => {
    login.client_id = environment.clientId;
    login.client_secret = environment.clientSecret;
    login.grant_type = 'password';

    return this.http
      .post(`${this.BASE_URL}/auth/lopesdigital`, login)
      .toPromise();
  }

  requestPassword = async (login: { email: string }): Promise<any> => {
    return this.http
      .post(`${this.BASE_URL}/auth/request-password`, login)
      .toPromise();
  }

  logout = () => {
    this.user.next(null);
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
