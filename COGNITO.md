// commands to chanfe "Force Password Change"
aws cognito-idp admin-set-user-password \
 --user-pool-id af-south-1_7qRU1uwbS \
 --username c2ktech100@gmail.com \
 --password Fabian@321 \
 --permanent

// command to verify user as "confirmed"

## Errors with Cognito

## User must be authenticated to use this API,..

## $ is typically caused when you’re trying to call fetchUserAttributes() before the authentication state is fully updated.

- const result = awsCognitoLogin(data.email, data.password);
- const attributes = await fetchUserAttributes();

-

## You’re not awaiting the login function. So fetchUserAttributes() runs before the login is complete — meaning the user is not yet authenticated when that call is made.

const handleLoginSubmit = async (data: FormValues) => {
try {
const result = await awsCognitoLogin(data.email, data.password);

    if (!result) {
      toaster.create({
        type: "error",
        title: "Error!!",
        description: "The login attempt was unsuccessful",
        duration: 3000,
      });
      return; // prevent going forward if login fails
    }

    const attributes = await fetchUserAttributes();
    setUserAttributes(attributes);

    toaster.create({
      type: "success",
      title: "Success!!",
      description: `Welcome Back ${attributes.name?.toUpperCase() || "User"}`,
      duration: 3000,
    });

    router.push("/dashboard");

} catch (error) {
console.error("Login error:", error);
// optionally show a failed login toaster here
}
};
