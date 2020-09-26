import { Binary } from '@angular/compiler';

export class User {
  Id: number;
  Username: string;
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  Organization: string;
  Hash: string;
  Salt: string;
  HashByte: number;
  Token: string;
  isLoggedIn: boolean;
  timeLoggedIn: Date;
  timeLoggedOut: Date;
  isLoggedInString: string;
  isPasswordHashed: boolean;
}
