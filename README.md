
Welcome to the Book Catalog Application project [SERVER]! This is an Books Catalog website that provides a platform for where ShowCase Different Types Of Books

## Features

- User authentication and authorization
- Course Create,Update,Delete,Read
- Interactive learning materials
- Discussion forums
- Assignments and assessments
- Progress tracking
- Notifications and announcements

## Technologies Used

- Backend: Node.js, Express.js,Typescript
- Database: MongoDB
- Deployment: Vercel
- Authentication: JWT
- Packages Used: bcrypt,http-errors,http-status-codes,zod


If you have any questions, feel free to reach out to us:

- Email: hasibulislam1670@gmail.com
- Website: https://client-summer-school.vercel.app/
- GitHub: https://github.com/hasibul1670


#### Book Catalog Application
### Live Link(vercel): https://summer-camp-school-server-sigma.vercel.app
### Application Routes:
#### student

- https://summer-camp-school-server-sigma.vercel.app/api/v1/students/create-students [POST]
- https://summer-camp-school-server-sigma.vercel.app/api/v1/students [get all users] (GET)
- https://summer-camp-school-server-sigma.vercel.app/api/v1/students/6497381fc9fbf4e29d55ee7f (get Single student) (GET)
- https://summer-camp-school-server-sigma.vercel.app/api/v1/students/6497381fc9fbf4e29d55ee7f (Update Single student) (PATCH)

#### instructor

- https://summer-camp-school-server-sigma.vercel.app/api/v1/instructors/create-Instructor [create an Instructor]  [POST]
- https://summer-camp-school-server-sigma.vercel.app/api/v1/students/create-students [POST]
- https://summer-camp-school-server-sigma.vercel.app/api/v1/students/6497381fc9fbf4e29d55ee7f (get Single student) (GET)
- https://summer-camp-school-server-sigma.vercel.app/api/v1/students/6497381fc9fbf4e29d55ee7f (Update Single student) (PATCH)
#### courses
- https://summer-camp-school-server-sigma.vercel.app/api/v1/courses/create-courses [create a courses] (POST)
- https://summer-camp-school-server-sigma.vercel.app/api/v1/courses [get all courses] (GET)
- https://summer-camp-school-server-sigma.vercel.app/api/v1/courses/648ca42c17d2d4e64a734513 [create a single courses] (GET)
- https://summer-camp-school-server-sigma.vercel.app/api/v1/courses/648ca42c17d2d4e64a734513 [Update a single courses] (PATCH)
- https://summer-camp-school-server-sigma.vercel.app/api/v1/courses/648ca42c17d2d4e64a734513 [Delete a single courses] (DELETE)


#### Login
- https://summer-camp-school-server-sigma.vercel.app/api/v1/auth/login [Login] (POST)
- https://summer-camp-school-server-sigma.vercel.app/api/v1/auth/change-password (POST)
### Sample courses Data for create a courses

```json
{
  "title": "Introduction to Python",
  "year": "2023",
  "startMonth": "January",
  "endMonth": "March"
}
```
### Sample courses Data for create a Student

```json
{
  "name": {
    "firstName": "luka",
    "lastName": "Doe48"
  },
  "gender": "male",
  "role": "student",
  "dateOfBirth": "1990-01-01",
  "email": "luka@gmail.com",
  "contactNo": "1234567890",
  "address": "123 Main St, City"
}
```
### Sample courses Data for create an instructor

```json
{
  "role": "instructor",
  "email": "john@example.com",
  "name": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "phoneNumber": "123-456-7890",
  "address": "123 Main Street",
  "expertise": "Computer Science",
  "course": "64972c9866bfd19bfa9c412b"
}
```




### Sample courses Order Data to create a Order

```json
{
  "courses": "648dbe893f8caeacd1d92178",
  "student": "648dbdd53f8caeacd1d92154"
}
```

### Password Chnage Data Sample 

```json
{
  "oldPassword":"110330",
  "newPassword":"110220"
}
```
### Login Data Sample (POST)[POST]

```json
{
  "password": "110220",
  "email": "rika@gmail.com"
}
```


# Server_Book_Catalog_Application
