This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



// for login component 
      <div className={`${styles.maincontainer}`}>
        <div className={`${styles.container}`}>
          <div className={styles.forms_container}>
            {/* <div className={`${styles.form_control} ${styles.signup_form}`}>
              <form action="#">
                <h2>Signup</h2>
                <input type="text" placeholder="Username" required />
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <input type="password" placeholder="Confirm password" required />
                <button>Signup</button>
              </form>
              <span>or signup with</span>
              <div className={styles.socials}>
                <i className="fab fa-facebook-f"></i>
                <i className="fab fa-google-plus-g"></i>
                <i className="fab fa-linkedin-in"></i>
              </div>
            </div> */}
            <div className={`${styles.form_control} ${styles.signin_form}`}>
              <form action="#">
                <h2>Signin</h2>
                <input type="text" name="username" value={loginData.username}  placeholder="Username" onChange={handleInputChange} required />
                <input type="password" name="password" value={loginData.password}  placeholder="Password" onChange={handleInputChange} required />
                <button onClick={handleSubmit}>Signin</button>
              </form>

              {/* <span style={{marginTop:10}}>Create new account  <Link href='/register' >Signup</Link></span> */}
              {/* <span>or signin with</span>
              <div className={styles.socials}>
                <i className="fab fa-facebook-f"></i>
                <i className="fab fa-google-plus-g"></i>
                <i className="fab fa-linkedin-in"></i>
              </div> */}
            </div>
          </div>
          {/* <div className={styles.intros_container}>
          <div className={`${styles.intro_control} ${styles.signin_intro}`}>
            <div className="intro_control__inner">
              <h2>Welcome back!</h2>
              <p>
                Welcome back! We are so happy to have you here. It's great to see you again. We hope you had a safe and enjoyable time away.
              </p>
              <button id="signup_btn">No account yet? Signup.</button>
            </div>
          </div>
          <div className="intro_control signup_intro">
            <div className="intro_control__inner">
              <h2>Come join us!</h2>
              <p>
                We are so excited to have you here.If you haven't already, create an account to get access to exclusive offers, rewards, and discounts.
              </p>
              <button id="signin_btn">Already have an account? Signin.</button>
            </div>
          </div>
        </div> */}
        </div>
      </div>