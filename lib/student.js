

class Student {
 constructor(){
     this.first_name = 'Adriana';
     this.last_name  = 'Morales';
     this._username  = 'adrianamorales';
     this._password  = 'tmpav033'
 }

 /**
  * @return {string} the username for the student which is hardcoded.
  */
  getUsername(){
     return this._username;
 }

 /**
  * @return {string} the password for the student which is hard coded in the class
  */
  getPassword(){
     return this._password;
 }

  getFullname(){
     return `${this.first_name} ${this.last_name}`;
 }



}

module.exports = Student;