import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = `${environment.apiUrl}/user`;
  uploadImageUrl = `${environment.apiUrl}/upload/user-img`;
  urlPassword = `${environment.apiUrl}/password`;
  urlResetPassword = `${environment.apiUrl}/reset`;

  constructor(private http: HttpClient) { }

getUser(id) {

return this.http.get(`${this.url}/${id}`);

}

uploadImage(id, file: File) {
  const userPhoto = new FormData();
  userPhoto.append('userPhoto', file);

  return this.http.put(`${this.uploadImageUrl}/${id}`, userPhoto);
}

createUser(user) {
  return this.http.post(this.url, user);
}

removeUser(id, permanent) {
const isPermanent = permanent || false;

return this.http.delete(`${this.url}/${id}?fromdb=${isPermanent}`);

}

createPassword(token: string, password: string) {

  const body = {
    password
  };
  return this.http.post(`${this.urlPassword}/${token}`, body);
}

resetPassword(email) {

const body = {
  email
};
return this.http.post(this.urlResetPassword, body);
}

}
