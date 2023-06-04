import React, { useEffect, useState } from 'react';
import UserSearch from '../components/UserSearch';
import Button from '../components/UI/button/Button';
import DeleteModal from '../components/DeleteModal';
import CreateUserModal from '../components/CreateUserModal';
import EditUserModal from '../components/EditUserModal';
import TransparentButton from '../components/UI/transparent-button/TransparentButton';
import ChangePasswordModal from '../components/ChangePasswordModal';
import Icon from "react-icons-kit";
import {pencil} from 'react-icons-kit/typicons/pencil'
import { useLocation, useNavigate } from 'react-router-dom';
import classes from '../styles/User.module.css';
import { useMemo } from 'react';

const Admin = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const [activeAdmin, setActiveAdmin] = useState({})

    const [deleteAdminModal, setDeleteAdminModal] = useState(false)

    const [createAdmin, setCreateAdmin] = useState(false)
    const [newAdmin, setNewAdmin] = useState({})

    const [editAdmin, setEditAdmin] = useState(false)

    const [changePswd, setChangePswd] = useState(false)

    const [admins, setAdmins] = useState([{
        oid: 1,
        givenName: 'Константин',
        familyName: 'Рыбалко',
        additionalName: 'Иванович',
        description: 'Ведущий Frontend разработчик',
        reg_date: '02.03.2023',
        emailAddres: 'k.i.rybalko@gmail.com',
        name: 'k.i.rybalko',
    },
    {
        oid: 2,
        givenName: 'Андрей',
        familyName: 'Корнещук',
        additionalName: 'Андреевич',
        description: 'Ведущий Java разработчик',
        reg_date: '02.03.2023',
        emailAddres: 'a.a.korneshchuk@gmail.com',
        name: 'a.a.korneshchuk',
    },
    {
        oid: 3,
        givenName: 'Игорь',
        familyName: 'Архипов',
        additionalName: 'Анатольевич',
        description: 'DevOps инженер',
        reg_date: '02.03.2023',
        emailAddres: 'i.a.arkhipov@gmail.com',
        name: 'i.a.arkhipov',
    },
    {
        oid: 4,
        givenName: 'Андрей',
        familyName: 'Тамплон',
        additionalName: 'Александрович',
        description: 'Ведущий аналитик',
        reg_date: '02.03.2023',
        emailAddres: 'a.a.tamplon@gmail.com',
        name: 'a.a.tamplon',
    }])
    // const [users, setUsers] = useState([])

    // useEffect(() => {
    //     const response = UserServices.getUsers()
    //     console.log(response)
    //     setUsers(response)
    // }, [])

    const sortedAdmins = useMemo(() => {
        return [...admins].sort((a, b) => {
            const nameA = a.familyName.toUpperCase();
            const nameB = b.familyName.toUpperCase();

            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        })
    }, [admins])

    const updateAdmin = admin => {
        setActiveAdmin(admin)
        const newAdmins = admins.map(a => {
            if (a.oid === admin.oid) {
                return admin
            } else {
                return a
            }
        })
        setAdmins(newAdmins)
    }

    const deleteAdmin = id => {
        let newAdmins = admins.filter(a => {
            return a.oid !== id
        })
        setAdmins(newAdmins)
        navigate('/admin')
    }

    const isNumeric = n => !isNaN(n);
    
    useEffect(() => {
        let activeId = sortedAdmins[0].oid
        if (isNumeric(location.pathname.split('/').pop())) {
            activeId = Number(location.pathname.split('/').pop())
        } else {
            navigate('/admin/' + activeId)
        }

        setActiveAdmin(admins.find((user => {return user.oid === activeId})))
    }, [location])
    
    return (
        <div className={classes.wrapper}>
            <UserSearch usersList={admins} activeId={activeAdmin.oid} setActive={setCreateAdmin} changeLink='admin'/>
            <div className={classes.mainWrapper}>
                <div className={classes.main}>
                    <div className={classes.userInfoWrapper}>
                        <div>
                            <Icon className={classes.pencilIcon} size={26} icon={pencil} onClick={() => setEditAdmin(true)}/>
                            <span className={classes.username}>{`${activeAdmin.familyName} ${activeAdmin.givenName} ${activeAdmin.additionalName}`}</span>
                        </div>
                        <div>
                            <Icon className={classes.pencilIcon} size={26} icon={pencil} onClick={() => setEditAdmin(true)}/>
                            <span>{activeAdmin.name}</span>
                        </div>
                        <TransparentButton onClick={() => setChangePswd(true)}>Change password</TransparentButton>
                    </div>
                </div>
                <Button 
                    id='delete' 
                    className={classes.deleteButton}
                    onClick={() => setDeleteAdminModal(true)}
                >
                    Delete
                </Button>
            </div>

            <DeleteModal 
                active={deleteAdminModal} 
                setActive={setDeleteAdminModal} 
                deleteText={activeAdmin?.familyName + ' ' + activeAdmin?.givenName + ' ' + activeAdmin?.additionalName}
                deleteCallback={deleteAdmin}
                deleteId={activeAdmin.oid}
            />
            <CreateUserModal 
                active={createAdmin} 
                setActive={setCreateAdmin} 
                setNewUser={setNewAdmin}
                title='Admin'
            />
            <EditUserModal 
                active={editAdmin} 
                setActive={setEditAdmin} 
                user={activeAdmin} 
                setUser={updateAdmin}
                title='Admin'
            />
            <ChangePasswordModal 
                active={changePswd}
                setActive={setChangePswd}
                id={activeAdmin.oid}
                title='admin'
            />
        </div>
    );
};

export default Admin;