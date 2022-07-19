import Button from "@mui/material/Button";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import './LoginPage.css';
import { Grid} from "@mui/material";

const LoginPage = () => {
    return <div>
        <Grid container spacing={2}
              alignItems="center"
              justifyContent="center">
            <Grid item xs={6}>
                <img alt={'foodies-login'} className={'login__img'} src={require('../../assets/foodies_login.jpg')}/>
            </Grid>
            <Grid item xs={6}>
                <div>
                    <a className="google-link" href="http://localhost:8080/auth/google">
                        <Button fullWidth={true} variant="outlined" startIcon={<GoogleIcon />}>
                            Login with Google
                        </Button>
                    </a>
                    <a className="google-link" href="http://localhost:8080/auth/facebook">
                        <Button fullWidth={true} variant="outlined" startIcon={<FacebookIcon />}>
                            Login with Facebook
                        </Button>
                    </a>
                    <a className="google-link" href="http://localhost:8080/auth/github">
                        <Button  fullWidth={true} variant="outlined" startIcon={<GitHubIcon />}>
                            Login with GitHub
                        </Button>
                    </a>
                </div>
            </Grid>
        </Grid>

    </div>;
};

export default LoginPage;