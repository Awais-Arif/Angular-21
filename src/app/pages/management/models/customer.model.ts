export interface Customer {
  User: UserModel
  ProfilePicture: string
}

export interface UserModel {
  FirstName: string
  LastName: string
  Email: string
  PhoneNumber: string
}
