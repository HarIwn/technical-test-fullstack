import React, { useRef, useState } from 'react';

const HalamanUserPage = () => {
    // Menggunakan useRef untuk mendapatkan referensi ke form
    const formRef = useRef();
    const [errors, setErrors] = useState({});

    // Fungsi untuk menangani submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = formRef.current;
        const formData = new FormData(form);
        const newErrors = {};
        // Validasi frontend sederhana
        if (!formData.get('name')) newErrors.name = 'Nama Pengguna wajib diisi';
        if (!formData.get('email')) newErrors.email = 'Email wajib diisi';
        if (!formData.get('address')) newErrors.address = 'Alamat wajib diisi';
        if (!formData.get('phone')) newErrors.phone = 'No. telp wajib diisi';
        if (!formData.get('password')) newErrors.password = 'Password wajib diisi';
        if (!formData.get('role_id')) newErrors.role_id = 'Role wajib dipilih';
        // Anda bisa tambahkan validasi lain sesuai kebutuhan
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
        try {
            const response = await fetch('http://127.0.0.1:8000/api/users', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                }
            });

            console.log('Response status:', response.status);

            if (response.ok) {
                form.reset();
            } else {
                const data = await response.json();
            }
        } catch (err) {
            alert('Terjadi error: ' + err.message);
        }
    };

    // State untuk menyimpan daftar pengguna
    const [users, setUsers] = React.useState([]);
    const [roleFilter, setRoleFilter] = React.useState('');
    const [searchTerm, setSearchTerm] = React.useState('');

    React.useEffect(() => {
        fetch('http://127.0.0.1:8000/api/users')
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(() => setUsers([]));
    }, []);
    // Filter users berdasarkan role
    const filteredUsers = users.filter(user => {
        const roleSesuai = roleFilter === '' || String(user.role_id) === String(roleFilter);
        const searchSesuai = searchTerm === '' ||
            (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (user.phone && user.phone.toLowerCase().includes(searchTerm.toLowerCase()));
        return roleSesuai && searchSesuai;
    });

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
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
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
                        <div className="container-fluid">
                            <h1 className="h3 my-3 text-gray-800">Daftar Pengguna</h1>
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <div className="wrapper d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-2">
                                        <div className="mb-2 mb-md-0">
                                            <button type="button" className="btn btn-primary text-nowrap me-2" data-toggle="modal"
                                                data-target="#modalTambahPengguna">
                                                <i className="fas fa-plus"></i> Tambah Pengguna
                                            </button>
                                        </div>
                                        <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center gap-2">
                                            <select
                                                className="form-control w-100 w-md-auto mx-md-2 mb-2 mb-md-0"
                                                name="role"
                                                id="roleSelect"
                                                value={roleFilter}
                                                onChange={e => setRoleFilter(e.target.value)}
                                            >
                                                <option value="">Semua</option>
                                                <option value="1">Admin</option>
                                                <option value="2">Operator</option>
                                            </select>
                                            <input
                                                type="text"
                                                className="form-control w-100 w-md-auto search-input"
                                                id="searchInput"
                                                placeholder="Cari pengguna..."
                                                value={searchTerm}
                                                onChange={e => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th>Nama Pengguna</th>
                                                    <th>No. Telp</th>
                                                    <th>E-mail</th>
                                                    <th>Alamat</th>
                                                    <th>Foto</th>
                                                    <th>Status</th>
                                                    <th>Aksi</th>
                                                    <th>Dibuat Tanggal</th>
                                                    <th>Diupdate Tanggal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredUsers.length > 0 ? filteredUsers.map(user => (
                                                    <tr key={user.id}>
                                                        <td>{user.name}</td>
                                                        <td>{user.phone}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.address}</td>
                                                        <td>
                                                            {user.photo ? (
                                                                <img
                                                                    src={`http://127.0.0.1:8000/storage/${user.photo}`}
                                                                    style={{ maxHeight: 80, maxWidth: 80, width: "auto", height: "auto" }}
                                                                    alt="User"
                                                                    className="img-fluid rounded"
                                                                />
                                                            ) : (
                                                                <span>-</span>
                                                            )}
                                                        </td>
                                                        <td>

                                                        </td>
                                                        <td>
                                                            <a
                                                                href={`/users/update/${user.id}`}
                                                                className="btn btn-primary btn-sm mx-2"
                                                            >
                                                                <i className="fas fa-pencil"></i>
                                                            </a>
                                                            <button
                                                                className="btn btn-danger btn-sm mx-2"
                                                                onClick={async () => {
                                                                    if (window.confirm('Yakin ingin menghapus pengguna ini?')) {
                                                                        try {
                                                                            const res = await fetch(`http://127.0.0.1:8000/api/users/${user.id}`, {
                                                                                method: 'DELETE',
                                                                                headers: {
                                                                                    'Accept': 'application/json',
                                                                                },
                                                                            });
                                                                            if (res.ok) {
                                                                                setUsers(users => users.filter(u => u.id !== user.id));
                                                                            } else {
                                                                                alert('Gagal menghapus pengguna');
                                                                            }
                                                                        } catch (err) {
                                                                            alert('Terjadi error: ' + err.message);
                                                                        }
                                                                    }
                                                                }}
                                                            >
                                                                <i className="fas fa-trash"></i>
                                                            </button>
                                                        </td>
                                                        <td>{user.created_at}</td>
                                                        <td>{user.updated_at}</td>
                                                    </tr>
                                                )) : (
                                                    <tr>
                                                        <td colSpan="9" className="text-center">Tidak ada data pengguna</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
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
                {/* Modal Tambah Pengguna */}
                <div className="modal fade" id="modalTambahPengguna" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Tambah User</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form ref={formRef} onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Nama Pengguna</label>
                                        <input type="text" className="form-control" id="name" name="name" />
                                        {errors.name && <small className="text-danger">{errors.name}</small>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">No. Telp</label>
                                        <input type="text" className="form-control" id="phone" name="phone" />
                                        {errors.phone && <small className="text-danger">{errors.phone}</small>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">E-mail</label>
                                        <input type="email" className="form-control" id="email" name="email" />
                                        {errors.email && <small className="text-danger">{errors.email}</small>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" id="password" name="password" />
                                        {errors.password && <small className="text-danger">{errors.password}</small>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Alamat</label>
                                        <input type="text" className="form-control" id="address" name="address" />
                                        {errors.address && <small className="text-danger">{errors.address}</small>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="photo">Foto</label>
                                        <input type="file" className="form-control-file" id="photo" name="photo" accept="image/*" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="role_id">Role</label>
                                        <select className="form-control" id="role_id" name="role_id">
                                            <option value="">Pilih Role</option>
                                            <option value="1">Admin</option>
                                            <option value="2">Operator</option>
                                        </select>
                                        {errors.role_id && <small className="text-danger">{errors.role_id}</small>}
                                    </div>
                                    <button type="submit" className="btn btn-primary">Simpan</button>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Tutup</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HalamanUserPage