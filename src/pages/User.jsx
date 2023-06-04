import React, { useEffect, useState } from 'react';
import UserSearch from '../components/UserSearch';
import TransparentButton from '../components/UI/transparent-button/TransparentButton';
import TransparentTeamList from '../components/UI/list/TransparentTeamList';
import Button from '../components/UI/button/Button';
import DeleteModal from '../components/DeleteModal';
import CreateUserModal from '../components/CreateUserModal';
import SelectTeamsModal from '../components/SelectTeamsModal';
import SelectChatsReposModal from '../components/SelectChatsReposModal';
import EditUserModal from '../components/EditUserModal';
import AccessManageModal from '../components/AccessManageModal';
import ChangePasswordModal from '../components/ChangePasswordModal';
import Icon from "react-icons-kit";
import {pencil} from 'react-icons-kit/typicons/pencil'
import { useLocation, useNavigate } from 'react-router-dom';
import UserService from '../api/UserService';
import classes from '../styles/User.module.css';
import { useMemo } from 'react';

const User = () => {
    const navigate = useNavigate()
    const location = useLocation()
    
    const [activeUser, setActiveUser] = useState({})

    const [deleteUserModal, setDeleteUserModal] = useState(false)

    const [deleteTeamModal, setDeleteTeamModal] = useState(false)
    const [deleteTeam, setDeleteTeam] = useState({})

    const [createUser, setCreateUser] = useState(false)
    const [newUser, setNewUser] = useState({})

    const [selectTeamsNewUser, setSelectTeamsNewUser] = useState(false)
    const [selectedTeams, setSelectedTeams] = useState([])

    const [selectChatsReposNewUser, setSelectChatsReposNewUser] = useState(false)

    const [selectTeamsAdd, setSelectTeamsAdd] = useState(false)
    const [selectedTeamsForAdd, setSelectedTeamsForAdd] = useState([])

    const [selectChatsReposAdd, setSelectChatsReposAdd] = useState(false)

    const [editUser, setEditUser] = useState(false)

    const [gitlabManageAccess, setGitlabManageAccess] = useState(false)
    const [mattermostManageAccess, setMattermostManageAccess] = useState(false)

    const [changeGitlabPswd, setChangeGitlabPswd] = useState(false)
    const [changeMattermostPswd, setChangeMattermostPswd] = useState(false)

    const [users, setUsers] = useState([])

    async function fetchUsers() {
        const res = await UserService.getAll()
        setUsers(res)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const [teamsUser, setTeamsUser] = useState([{
        uid: 1,
        teams: [{
            id: 1,
            name: 'idm-gateway'
        },
        {
            id: 2,
            name: 'ui-kit-team'
        }]
    },
    {
        uid: 2,
        teams: [{
            id: 2,
            name: 'ui-kit-team'
        }]
    },
    {
        uid: 3,
        teams: [{
            id: 1,
            name: 'idm-gateway'
        },
        {
            id: 2,
            name: 'ui-kit-team'
        }]
    },
    {
        uid: 4,
        teams: [{
            id: 1,
            name: 'idm-gateway'
        }]
    }])

    const sortedUsers = useMemo(() => {
        return [...users].sort((a, b) => {
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
    }, [users])

    const updateUser = user => {
        setActiveUser(user)
        const newUsers = users.map(u => {
            if (u.oid === user.oid) {
                return user
            } else {
                return u
            }
        })
        setUsers(newUsers)
    }

    async function deleteUser(id) {
        const res = await UserService.deleteUser(id)
        let newUsers = users.filter(u => {
            return u.oid !== id
        })
        setUsers(newUsers)
        navigate('/user')
    }

    const deleteUserTeam = teamId => {
        let newTeamsUser = teamsUser.map(tu => {
            return {...tu, teams: tu.teams.filter(t => {
                return t.id !== teamId
            })}
        })
        setTeamsUser(newTeamsUser)
    }
        
    useEffect(() => {
        let activeId = sortedUsers[0]?.oid
        if (activeId === undefined) {
            return
        }
        const arr = location.pathname.split('/')
        let tmp = arr[arr.length - 1]
        if (tmp !== 'user') {
            activeId = location.pathname.split('/').pop()
        } else {
            navigate('/user/' + activeId)
            return
        }

        setActiveUser(users.find((user => {return user.oid === activeId})))
    }, [users, location, sortedUsers])
    
    return (
        <div className={classes.wrapper}>
            {activeUser === undefined
            ? <></>
            : 
            <>
                <UserSearch usersList={users} activeId={activeUser?.oid} setActive={setCreateUser} changeLink='user'/>
                <div className={classes.mainWrapper}>
                    <div className={classes.main}>
                        <div className={classes.userInfoWrapper}>
                            <div>
                                <Icon className={classes.pencilIcon} size={26} icon={pencil} onClick={() => setEditUser(true)}/>
                                <span className={classes.username}>{`${activeUser?.familyName} ${activeUser?.givenName} ${activeUser?.additionalName}`}</span>
                            </div>
                            <div>
                                <Icon className={classes.pencilIcon} size={26} icon={pencil} onClick={() => setEditUser(true)}/>
                                <span>{activeUser?.description}</span>
                            </div>
                            <span style={{marginLeft: 'calc(1rem + 26px)'}}>{`Зарегестрирован ${activeUser?.reg_date}`}</span>
                        </div>
                        <div className={classes.serviceWrapper}>
                            <div className={classes.top}>
                                <span className={classes.serviceLabel}>GitLab</span>
                                <span>{activeUser?.name}</span>
                            </div>
                            <TransparentButton onClick={() => setGitlabManageAccess(true)}>Manage repositories access</TransparentButton>
                            <TransparentButton onClick={() => setChangeGitlabPswd(true)}>Change password</TransparentButton>
                        </div>
                        <div className={classes.serviceWrapper}>
                            <div className={classes.top}>
                                <span className={classes.serviceLabel}>Mattermost</span>
                                <span>{activeUser?.name}</span>
                            </div>
                            <TransparentButton onClick={() => setMattermostManageAccess(true)}>Manage chats access</TransparentButton>
                            <TransparentButton onClick={() => setChangeMattermostPswd(true)}>Change password</TransparentButton>
                        </div>
                    </div>
                    <Button 
                        id='delete' 
                        className={classes.deleteButton}
                        onClick={() => setDeleteUserModal(true)}
                    >
                        Delete
                    </Button>
                </div>
                <TransparentTeamList 
                    teamList={teamsUser.find(a => {return a.uid === activeUser?.oid})?.teams} 
                    setOpenModal={setSelectTeamsAdd}
                    setDeleteTeam={setDeleteTeam}
                    setDeleteTeamModal={setDeleteTeamModal}
                />

                <DeleteModal 
                    active={deleteUserModal} 
                    setActive={setDeleteUserModal} 
                    deleteText={activeUser?.familyName + ' ' + activeUser?.givenName + ' ' + activeUser?.additionalName}
                    deleteCallback={deleteUser}
                    deleteId={activeUser?.oid}
                />
                <DeleteModal 
                    active={deleteTeamModal} 
                    setActive={setDeleteTeamModal} 
                    deleteText={deleteTeam?.name}
                    deleteCallback={deleteUserTeam}
                    deleteId={deleteTeam?.id}
                />
                <CreateUserModal 
                    active={createUser} 
                    setActive={setCreateUser} 
                    setNewUser={setNewUser}
                    setNextActive={setSelectTeamsNewUser}
                    title='User'
                />
                <SelectTeamsModal 
                    active={selectTeamsNewUser} 
                    setActive={setSelectTeamsNewUser}  
                    setNextActive={setSelectChatsReposNewUser}
                    selectedTeams={selectedTeams}
                    setSelectedTeams={setSelectedTeams}
                />
                <SelectChatsReposModal 
                    active={selectChatsReposNewUser}
                    setActive={setSelectChatsReposNewUser}
                    id={newUser?.id}
                    setPrevActive={setSelectTeamsNewUser}
                    selectedTeams={selectedTeams}
                />
                <SelectTeamsModal 
                    active={selectTeamsAdd} 
                    setActive={setSelectTeamsAdd}  
                    setNextActive={setSelectChatsReposAdd}
                    selectedTeams={selectedTeamsForAdd}
                    setSelectedTeams={setSelectedTeamsForAdd}
                />
                <SelectChatsReposModal 
                    active={selectChatsReposAdd}
                    setActive={setSelectChatsReposAdd}
                    id={activeUser?.id}
                    setPrevActive={setSelectTeamsAdd}
                    selectedList={selectedTeamsForAdd}
                /> 
                <EditUserModal 
                    active={editUser} 
                    setActive={setEditUser} 
                    user={activeUser} 
                    setUser={updateUser}
                    title='User'
                />
                <AccessManageModal 
                    active={gitlabManageAccess} 
                    setActive={setGitlabManageAccess}
                    user={activeUser}
                    title='Gitlab'
                />
                <AccessManageModal 
                    active={mattermostManageAccess} 
                    setActive={setMattermostManageAccess}
                    user={activeUser}
                    title='Mattermost'
                />
                <ChangePasswordModal 
                    active={changeGitlabPswd}
                    setActive={setChangeGitlabPswd}
                    id={activeUser?.oid}
                    title='Gitlab'
                />
                <ChangePasswordModal 
                    active={changeMattermostPswd}
                    setActive={setChangeMattermostPswd}
                    id={activeUser?.oid}
                    title='Mattermost'
                />
            </>
            }
            
        </div>
    );
};

export default User;