import React, { useEffect, useState } from 'react';
import TeamSearch from '../components/TeamSearch';
import TransparentButton from '../components/UI/transparent-button/TransparentButton';
import TransparentUserList from '../components/UI/list/TransparentUserList';
import Button from '../components/UI/button/Button';
import DeleteModal from '../components/DeleteModal';
import CreateModal from '../components/CreateModal';
import SelectModal from '../components/SelectModal';
import SelectChatsReposModal from '../components/SelectChatsReposModal';
import EditTeamModal from '../components/EditTeamModal';
import AccessManageTeamModal from '../components/AccessManageTeamModal';
import Icon from "react-icons-kit";
import {pencil} from 'react-icons-kit/typicons/pencil'
import { useLocation, useNavigate } from 'react-router-dom';
import TeamService from '../api/TeamService';
import classes from '../styles/Team.module.css';
import { useMemo } from 'react';

const Team = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const [activeTeam, setActiveTeam] = useState({})

    const [deleteTeamModal, setDeleteTeamModal] = useState(false)

    const [deleteUserModal, setDeleteUserModal] = useState(false)
    const [deleteUser, setDeleteUser] = useState({})

    const [createTeam, setCreateTeam] = useState(false)
    const [newTeam, setNewTeam] = useState({})

    const [selectChatsNewTeam, setSelectChatsNewTeam] = useState(false)
    const [selectedChats, setSelectedChats] = useState([])
    const [selectReposNewTeam, setSelectReposNewTeam] = useState(false)
    const [selectedRepos, setSelectedRepos] = useState([])
    const [selectUsersNewTeam, setSelectUsersNewTeam] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState([])

    const [selectChatsAdd, setSelectChatsAdd] = useState(false)
    const [selectedChatsAdd, setSelectedChatsAdd] = useState([])
    const [selectReposAdd, setSelectReposAdd] = useState(false)
    const [selectedReposAdd, setSelectedReposAdd] = useState([])
    const [selectUsersAdd, setSelectUsersAdd] = useState(false)
    const [selectedUsersAdd, setSelectedUsersAdd] = useState([])

    const [createChat, setCreateChat] = useState(false)
    const [createRepo, setCreateRepo] = useState(false)

    const [selectChatsReposNewTeam, setSelectChatsReposNewTeam] = useState(false)

    const [editTeam, setEditTeam] = useState(false)

    const [gitlabManageAccess, setGitlabManageAccess] = useState(false)
    const [mattermostManageAccess, setMattermostManageAccess] = useState(false)

    const [teams, setTeams] = useState([])

    async function fetchTeams() {
        const response = await TeamService.getAll()
        setTeams(response)
    }

    useEffect(() => {
        fetchTeams()
    }, [])

    const [teamsUser, setTeamsUser] = useState([{
        tid: 1,
        users: [{
            id: 1,
            givenName: 'Константин',
            familyName: 'Рыбалко',
            additionalName: 'Иванович',
            description: 'Ведущий Frontend разработчик',
            reg_date: '02.03.2023',
            emailAddres: 'k.i.rybalko@gmail.com',
            name: 'k.i.rybalko',
        },
        {
            id: 2,
            givenName: 'Андрей',
            familyName: 'Корнещук',
            additionalName: 'Андреевич',
            description: 'Ведущий Java разработчик',
            reg_date: '02.03.2023',
            emailAddres: 'a.a.korneshchuk@gmail.com',
            name: 'a.a.korneshchuk',
        }]
    },
    {
        tid: 2,
        users: [{
            id: 3,
            givenName: 'Игорь',
            familyName: 'Архипов',
            additionalName: 'Анатольевич',
            description: 'DevOps инженер',
            reg_date: '02.03.2023',
            emailAddres: 'i.a.arkhipov@gmail.com',
            name: 'i.a.arkhipov',
        }]
    },
    {
        tid: 3,
        users: [{
            id: 4,
            givenName: 'Андрей',
            familyName: 'Тамплон',
            additionalName: 'Александрович',
            description: 'Ведущий аналитик',
            reg_date: '02.03.2023',
            emailAddres: 'a.a.tamplon@gmail.com',
            name: 'a.a.tamplon',
        },
        {
            id: 5,
            givenName: 'Вячеслав',
            familyName: 'Шинкевич',
            additionalName: 'Сергеевич',
            description: 'Java разработчик',
            reg_date: '02.03.2023',
            emailAddres: 'v.s.shinkevich@gmail.com',
            name: 'v.s.shinkevich',
        }]
    },
    {
        tid: 4,
        users: [{
            id: 1,
            givenName: 'Константин',
            familyName: 'Рыбалко',
            additionalName: 'Иванович',
            description: 'Ведущий Frontend разработчик',
            reg_date: '02.03.2023',
            emailAddres: 'k.i.rybalko@gmail.com',
            name: 'k.i.rybalko',
        }]
    }])

    const sortedTeams = useMemo(() => {
        return [...teams].sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        })
    }, [teams])

    const updateTeam = team => {
        setActiveTeam(team)
        let newTeams = teams.map(t => {
            if (t.oid === team.oid) {
                return team
            } else {
                return t
            }
        })
        setTeams(newTeams)
    }

    async function deleteTeam(id) {
        const res = await TeamService.deleteTeam(id)
        let newTeams = teams.filter(t => {
            return t.oid !== id
        })
        setTeams(newTeams)
        navigate('/team')
    }

    async function createNewTeam(name, displayName, description) {
        const res = await TeamService.createTeam(name, displayName, description)
        window.location.reload(false)
    }

    const deleteUserTeam = userId => {
        let newTeamsUser = teamsUser.map(tu => {
            return {...tu, users: tu.users.filter(u => {
                return u.id !== userId
            })}
        })
        setTeamsUser(newTeamsUser)
    }
        
    useEffect(() => {
        let activeId = sortedTeams[0]?.oid
        if (activeId === undefined) {
            return
        }
        const arr = location.pathname.split('/')
        let tmp = arr[arr.length - 1]
        if (tmp !== 'team') {
            activeId = location.pathname.split('/').pop()
        } else {
            navigate('/team/' + activeId)
            return
        }

        setActiveTeam(teams.find((team => {return team.oid === activeId})))
    }, [teams, location, sortedTeams])
    
    return (
        <div className={classes.wrapper}>
            <TeamSearch teamsList={teams} activeId={activeTeam.oid} setActive={setCreateTeam}/>
            <div className={classes.mainWrapper}>
                <div className={classes.main}>
                    <div className={classes.userInfoWrapper}>
                        <div>
                            <Icon className={classes.pencilIcon} size={26} icon={pencil} onClick={() => setEditTeam(true)}/>
                            <span className={classes.username}>{activeTeam.name}</span>
                        </div>
                        <div style={{display: 'flex'}}>
                            <Icon className={classes.pencilIcon} size={26} icon={pencil} onClick={() => setEditTeam(true)}/>
                            <div className={classes.descriptionWrapper}>
                                <span>{activeTeam.description}</span>
                            </div>
                        </div>
                        <span style={{marginLeft: 'calc(1rem + 26px)'}}>{`Создана: ${activeTeam.reg_date}`}</span>
                    </div>
                    <div className={classes.serviceWrapper}>
                        <div className={classes.top}>
                            <span className={classes.serviceLabel}>GitLab. repos</span>
                        </div>
                        <TransparentButton onClick={() => setGitlabManageAccess(true)}>Manage repositories access</TransparentButton>
                        <TransparentButton onClick={() => setSelectReposAdd(true)}>Add</TransparentButton>
                    </div>
                    <div className={classes.serviceWrapper}>
                        <div className={classes.top}>
                            <span className={classes.serviceLabel}>Mattermost. chats</span>
                        </div>
                        <TransparentButton onClick={() => setMattermostManageAccess(true)}>Manage chats access</TransparentButton>
                        <TransparentButton onClick={() => setSelectChatsAdd(true)}>Add</TransparentButton>
                    </div>
                </div>
                <Button 
                    id='delete' 
                    className={classes.deleteButton}
                    onClick={() => setDeleteTeamModal(true)}
                >
                    Delete
                </Button>
            </div>
            <TransparentUserList 
                userList={teamsUser.find(a => {return a.tid === activeTeam?.oid})?.users} 
                setOpenModal={setSelectUsersAdd}
                setDeleteUser={setDeleteUser}
                setDeleteUserModal={setDeleteUserModal}
            />

            <DeleteModal 
                active={deleteTeamModal} 
                setActive={setDeleteTeamModal} 
                deleteText={activeTeam.name}
                deleteCallback={deleteTeam}
                deleteId={activeTeam.oid}
            />
            <DeleteModal 
                active={deleteUserModal} 
                setActive={setDeleteUserModal} 
                deleteText={deleteUser?.familyName + ' ' + deleteUser?.givenName + ' ' + deleteUser?.additionalName}
                deleteCallback={deleteUserTeam}
                deleteId={deleteUser.id}
            />
            <CreateModal 
                title='Team'
                active={createTeam} 
                setActive={setCreateTeam} 
                setNextActive={setSelectChatsNewTeam}
                setNew={setNewTeam}
                createCallback={createNewTeam}
            />
            <SelectModal 
                title='Chats'
                active={selectChatsNewTeam} 
                setActive={setSelectChatsNewTeam}  
                setNextActive={setSelectReposNewTeam}
                selectedList={selectedChats}
                setSelectedList={setSelectedChats}
                withCreate
                setCreateActive={setCreateChat}
            />
            <CreateModal 
                title='Chat'
                active={createChat} 
                setActive={setCreateChat} 
                setNextActive={setSelectChatsNewTeam}
                setPrevActive={setSelectChatsNewTeam}
                isCreate
            />
            <SelectModal 
                title='Repositories'
                active={selectReposNewTeam} 
                setActive={setSelectReposNewTeam}  
                setNextActive={setSelectUsersNewTeam}
                selectedList={selectedRepos}
                setSelectedList={setSelectedRepos}
                withCreate
                setCreateActive={setCreateRepo}
            />
            <CreateModal 
                title='Repository'
                active={createRepo} 
                setActive={setCreateRepo} 
                setNextActive={setSelectChatsNewTeam}
                isCreate
            />
            <SelectModal 
                title='Users'
                active={selectUsersNewTeam} 
                setActive={setSelectUsersNewTeam}  
                setNextActive={setSelectChatsReposNewTeam}
                selectedList={selectedUsers}
                setSelectedList={setSelectedUsers}
            />
            <SelectChatsReposModal 
                active={selectChatsReposNewTeam}
                setActive={setSelectChatsReposNewTeam}
                id={newTeam?.id}
                setPrevActive={setSelectUsersNewTeam}
                selectedList={selectedUsers.map(user => {
                    return ({...user, chats: selectedChats, repos: selectedRepos})
                })}
            />
            <EditTeamModal 
                active={editTeam} 
                setActive={setEditTeam} 
                team={activeTeam} 
                setTeam={updateTeam}
            />
            <AccessManageTeamModal 
                active={gitlabManageAccess} 
                setActive={setGitlabManageAccess}
                team={activeTeam}
                title='Gitlab'
            />
            <AccessManageTeamModal 
                active={mattermostManageAccess} 
                setActive={setMattermostManageAccess}
                team={activeTeam}
                title='Mattermost'
            />
            <SelectModal 
                title='Chats'
                active={selectChatsAdd} 
                setActive={setSelectChatsAdd}  
                selectedList={selectedChatsAdd}
                setSelectedList={setSelectedChatsAdd}
                withCreate
                setCreateActive={setCreateChat}
            />
            <SelectModal 
                title='Repositories'
                active={selectReposAdd} 
                setActive={setSelectReposAdd}  
                selectedList={selectedReposAdd}
                setSelectedList={setSelectedReposAdd}
                withCreate
                setCreateActive={setCreateRepo}
            />
            <SelectModal 
                title='Users'
                active={selectUsersAdd} 
                setActive={setSelectUsersAdd}  
                selectedList={selectedUsersAdd}
                setSelectedList={setSelectedUsersAdd}
            />
        </div>
    );
};

export default Team;