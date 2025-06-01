import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUserPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        address: '',
        role_id: '',
        photo: null,
    });
    const [errors, setErrors] = useState({});

    async function getUser() {
        const res = await fetch(`http://127.0.0.1:8000/api/users/${userId}`);
        const data = await res.json();
        if (res.ok) {
            setFormData({
                name: data.name || '',
                phone: data.phone || '',
                email: data.email || '',
                password: data.password || '',
                address: data.address || '',
                role_id: data.role_id ? String(data.role_id) : '',
                photo: null,
            });
        } else {
            navigate('/users');
        }
    }

    async function handleUpdate(e) {
        e.preventDefault();
        setErrors({});
        const sendData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'password' && !value) return;
            if (value !== null && value !== undefined && value !== '') {
                sendData.append(key, value);
            }
        });
        sendData.append('_method', 'PUT');
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
                method: 'POST',
                body: sendData,
                headers: {
                    'Accept': 'application/json',
                }
            });
            const data = await res.json();
            if (data.errors) {
                setErrors(data.errors);
            } else if (res.ok) {
                navigate('/pages/user');
            }
        } catch (error) {
            setErrors({ general: ['Terjadi kesalahan saat mengupdate data.'] });
        }
    }

    useEffect(() => {
        getUser();
    }, []);
    return (
        <>
            <div id="wrapper">
                {/* Sidebar */}
                <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                    <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/home">
                        <div className="sidebar-brand-icon rotate-n-15">
                            <i className="fas fa-laugh-wink"></i>
                        </div>
                        <div className="sidebar-brand-text mx-3">Admin</div>
                    </a>
                    <hr className="sidebar-divider my-0" />
                    <li className="nav-item active">
                        <a className="nav-link" href="/home">
                            <i className="fas fa-fw fa-tachometer-alt"></i>
                            <span>Dashboard</span></a>
                    </li>
                    <hr className="sidebar-divider" />
                    <div className="sidebar-heading">HALAMAN</div>
                    <li className="nav-item">
                        <a className="nav-link" href="/pages/user">
                            <i className="fas fa-fw fa-table"></i>
                            <span>Daftar User</span></a>
                    </li>
                </ul>
                {/* End of Sidebar */}

                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        {/* Navbar */}
                        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                                <i className="fa fa-bars"></i>
                            </button>
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item dropdown no-arrow">
                                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">Admin</span>
                                        <img className="img-profile rounded-circle" src="https://ui-avatars.com/api/?name=Admin" alt="profile" width="32" height="32" />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                                        <a className="dropdown-item" href="#">
                                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Profile
                                        </a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="login.html">
                                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Logout
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                        {/* End of Navbar */}
                        <div className="container-fluid">
                            <h1 className="h3 my-3 text-gray-800">Update Data Pengguna</h1>
                            <div className="card shadow mb-4">
                                <div className="card-body py-3">
                                    <form onSubmit={handleUpdate} className="w-1/2 mx-auto space-y-6" encType="multipart/form-data">
                                        <div>
                                            <label htmlFor="">Nama Pengguna</label>
                                            <input className='form-control mb-4' type="text" placeholder="Nama Pengguna" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                            {errors.name && <p className="error">{errors.name[0]}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="">Password</label>
                                            <input className='form-control mb-4' type="password" placeholder="Password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
                                            {errors.password && <p className="error">{errors.password[0]}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="">No. Telp</label>
                                            <input className='form-control mb-4' type="text" placeholder="No. Telp" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                            {errors.phone && <p className="error">{errors.phone[0]}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="">E-mail</label>
                                            <input className='form-control mb-4' type="email" placeholder="E-mail" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                            {errors.email && <p className="error">{errors.email[0]}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="">Alamat</label>
                                            <textarea className='form-control mb-4' type="text" placeholder="Alamat" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                                            {errors.address && <p className="error">{errors.address[0]}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="">Roles</label>
                                            <select className='form-control mb-4' value={formData.role_id} onChange={e => setFormData({ ...formData, role_id: e.target.value })}>
                                                <option value="">Pilih Role</option>
                                                <option value="1">Admin</option>
                                                <option value="2">Operator</option>
                                            </select>
                                            {errors.role_id && <p className="error">{errors.role_id[0]}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="">Foto</label>
                                            <input className='form-control mb-4' type="file" onChange={e => setFormData({ ...formData, photo: e.target.files[0] })} />
                                            {errors.photo && <p className="error">{errors.photo[0]}</p>}
                                        </div>
                                        <div>
                                            <button type='submit' className="btn btn-primary">Update</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <footer className="sticky-footer bg-white">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Copyright &copy; Your Website 2021</span>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>
            </div>
        </>
    )
}

export default UpdateUserPage