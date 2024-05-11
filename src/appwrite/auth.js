
import conf from "../Conf/Conf";
import { ID, Client, Account } from 'appwrite';

// NOTE: for reference go to : https://appwrite.io/docs/references/cloud/client-web/account#deleteSessions

export class AuthService {
  account;
  client = new Client();

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(), 
        email, 
        password, 
        name
      );

      if (userAccount) {
        // since the account is created successfully , log in the user too
        return this.logIn({ email, password });
      } else {
        // we have null 
        return userAccount;
      }
    } catch (error) {
      console.log("error while creating user account" , error)
      throw error;
    }
  }

  async logIn({ email, password }) {
    try {
      return await this.account.createEmailSession(
        email,
        password
      );
    } catch (error) {
      console.log("error in loging in" , error);
      throw error ;
    }
  }

  async getCurrentUser() {
    try{
      return await this.account.get() ;
    }catch(error) {
      console.log("error while geting the current logged in user " , error) ;
    }
    return null ;
  }

  async logOut() {
    try {
      await this.account.deleteSessions() ;
    } catch (error) {
      console.log("error while logging out " , error) ;
    }
  }
}

const authService = new AuthService() ;

export default authService ;


