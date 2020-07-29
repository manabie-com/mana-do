### Welcome to Manabie coding challenge

Hello!

We're excited that you're interested in joining the Manabie. Below are the requirements and explanations for the challenge.

##### Notes: 
- Use React, Vue, or any relevant library/framework you like. (with Typescript is a plus)
- If you use React, please use React hook
- Up to your choice to implement UI components as long as all required functionalities are satisfied.
- We prefer not to use any CSS framework, we want to see your CSS skills :v:.
- Some tests are required to demonstrate your TDD skills.
- All provided codes are in this repository. Please fork, complete your challenge, and send back your github link (or your can zip and send mail) to us.
- Our provided API simulator located in ```sdk/``` folder.

##### Requirements:
- We are making 2 forms: **Sign in** & **Sign up**.
- It is required not to use any form library.
- Please note that you also need to validate form fields.
- Our example sdk response will be in form of a JSON like this <br/> 
```json 
    {
        success: true | false, 
        message: "Email is required"
    }
```

**1. A sign in form**
- Fields: 
    ```ts
      export interface SignInRequest {
        email: string
        password: string
      }
    ```
- There is a checkbox for **"Remember me"**, which will store the user email whenever the API call is successful. If user reload the page after the previous success sign in, the **"Email"** field is filled.
- User can toggle reveal the **"Password"** field. 

**2. A sign up form**
- Fields: 
    ```ts
        export type Gender = 'Male' | 'Female' | 'Other'
        export interface SignUpRequest { 
             firstName: string
             lastName?: string
             gender: Gender
             email: string
             password: string
        }
  ```
- User can toggle reveal the **"Password"** field.
- There is a checkbox accept our **"Term of service"**, user cannot submit in case the checkbox is not checked.
- In case the signUp API call is fail, unchecked the **"Term of service"** checkbox.
- In case the signUp API call is success, redirect user to the **Sign in** with **"Email"** field filled.
- There is a small link-like button that can redirect user to **Sign in** named **"Sign in instead"** 
- There is a less attractive **"Reset"** button that will clear our form when clicked.