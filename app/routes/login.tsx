import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
} from '@mui/material';
import { AppProvider, AuthProvider, AuthResponse, SignInPage } from '@toolpad/core';
import * as React from 'react';

const providers = [{ id: 'credentials', name: 'Email and Password' }];

function CustomEmailField() {
  return (
    <TextField
      id="input-with-icon-textfield"
      label="Username"
      name="email"
      type="email"
      size="small"
      required
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle fontSize="inherit" />
            </InputAdornment>
          ),
        },
      }}
      variant="outlined"
    />
  );
}

function CustomPasswordField() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };
  return (
    <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
      <InputLabel size="small" htmlFor="outlined-adornment-password">
        Password
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        name="password"
        size="small"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="small"
            >
              {showPassword ? (
                <VisibilityOff fontSize="inherit" />
              ) : (
                <Visibility fontSize="inherit" />
              )}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
}

function CustomButton() {
  return (
    <Button
      href = "/"
      type="submit"
      variant="outlined"
      color="info"
      size="small"
      disableElevation
      fullWidth
      sx={{ my: 2 }}
    >
      Sign In
    </Button>
  );
}

function SignUpLink() {
  return (
    <Link href="/" variant="body2">
      Sign up
    </Link>
  );
}

function ForgotPasswordLink() {
  return (
    <Link href="/" variant="body2">
      Forgot password?
    </Link>
  );
}

const signIn: (
  provider: AuthProvider,
  formData: FormData,
) => Promise<AuthResponse> | void = async (provider, formData) => {
  const promise = new Promise<AuthResponse>((resolve) => {
    setTimeout(() => {
      const email = formData?.get('email');
      const password = formData?.get('password');
      alert(
        `Signing in with "${provider.name}" and credentials: ${email}, ${password}`,
      );
      // preview-start
      resolve({
        type: 'CredentialsSignin',
        error: 'Invalid credentials.',
      });
      // preview-end
    }, 300);
  });
  return promise;
};



export const Component = function SlotsSignIn() : JSX.Element {
  return (
    <AppProvider>
      <SignInPage
        signIn={(provider, formData) =>
          alert(
            `Signing in with "${provider.name}" and credentials: ${formData.get('email')}, ${formData.get('password')}`,
          )
        }
        slots={{
          emailField: CustomEmailField,
          passwordField: CustomPasswordField,
          submitButton: CustomButton,
          signUpLink: SignUpLink,
          forgotPasswordLink: ForgotPasswordLink,
        }}
        providers={providers}
      />
    </AppProvider>
  );
}
