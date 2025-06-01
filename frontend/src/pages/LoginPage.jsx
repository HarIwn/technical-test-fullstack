import React from 'react'

const LoginPage = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errors, setErrors] = React.useState({});
    const [redirect, setRedirect] = React.useState(false);
        // Validasi ke database users
        const validate = async () => {
            const newErrors = {};
            if (!email) {
                newErrors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                newErrors.email = 'Email is invalid';
            }
            if (!password) {
                newErrors.password = 'Password is required';
            }
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return false;
            }
            try {
                const res = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });
                if (!res.ok) {
                    setErrors({ invalid: true });
                    return false;
                }
                setErrors({});
                return true;
            } catch (err) {
                setErrors({ invalid: true });
                return false;
            }
        };
    
        const handleSubmit = (e) => {
            e.preventDefault();
            if (validate()) {
                setRedirect(true);
            }
        };
    
        return (
            <div className="container-fluid px-3 px-md-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 col-xl-6">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                    <div className="row">
                        <div className="d-none d-md-block col-md-5 col-lg-6 bg-login-image"></div>
                        <div className="col-12 col-md-7 col-lg-6">
                        <div className="p-4 p-md-5">
                            <div className="text-center">
                            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                            </div>
                            {errors.invalid && (
                            <div className="alert alert-danger" role="alert">
                                Username atau password salah
                            </div>
                            )}
                            <form className="user" onSubmit={handleSubmit} noValidate>
                            <div className="form-group">
                                <input
                                type="email"
                                className={`form-control form-control-user ${errors.email ? 'is-invalid' : ''}`}
                                id="exampleInputEmail"
                                aria-describedby="emailHelp"
                                placeholder="Enter Email Address..."
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                />
                                {errors.email && (
                                <div className="invalid-feedback">{errors.email}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <input
                                type="password"
                                className={`form-control form-control-user ${errors.password ? 'is-invalid' : ''}`}
                                id="exampleInputPassword"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                />
                                {errors.password && (
                                <div className="invalid-feedback">{errors.password}</div>
                                )}
                            </div>
                            <div className="form-group">
                                <div className="custom-control custom-checkbox small">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="customCheck"
                                />
                                <label className="custom-control-label" htmlFor="customCheck">
                                    Remember Me
                                </label>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-user btn-block">
                                Login
                            </button>
                            </form>
                            <hr />
                            <div className="text-center">
                            <a className="small" href="forgot-password.html">
                                Forgot Password?
                            </a>
                            </div>
                            <div className="text-center">
                            <a className="small" href="register.html">
                                Create an Account!
                            </a>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        );
    }
    
    export default LoginPage
