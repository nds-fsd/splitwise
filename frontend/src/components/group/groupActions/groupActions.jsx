import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../modal/modal';
import GroupForm from '../groupForm/groupForm';
import Icon from '../../icon/icon';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDarkMode } from '../../../context/darkModeContext';

const GroupActions = ({ group, groupMembers, editGroup, isEditing, setIsEditing, onDelete }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();

    const { darkMode } = useDarkMode();


    return (
        <>
            <Button sx={{ color: darkMode ? '#FAFAFA' : 'black', minWidth: '0px' }} id="basic-button" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
                <Icon variant='dots' className='dots' />
            </Button>
            <Menu sx={{
                '& .MuiPaper-root': { backgroundColor: darkMode ? '#333333' : '#FAFAFA', color: darkMode ? '#FAFAFA' : '#000000' }, '& .MuiMenuItem-root': {
                    transition: 'background-color 0.3s', '&:hover': { backgroundColor: darkMode ? '#09090b' : '', }
                }
            }} id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button', }}>
                <MenuItem onClick={() => navigate(`/groups/${group._id}/expenses`)}><p>View details</p></MenuItem>
                <MenuItem onClick={handleClose} >
                    <Button sx={{ color: darkMode ? '#FAFAFA' : 'black', minWidth: '0px', padding: '0', textTransform: 'none', fontSize: '16px', gap: '5px' }} onClick={() => setIsEditing(true)}>
                        <Icon variant='edit' />
                        Edit group
                    </Button>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Button sx={{ color: darkMode ? '#FAFAFA' : 'black', minWidth: '0px', padding: '0', textTransform: 'none', fontSize: '16px', gap: '5px' }} onClick={onDelete} >
                        <Icon variant='delete' id="deleteGroup" />
                        Delete group
                    </Button>
                </MenuItem>
            </Menu>
            {isEditing && <Modal><GroupForm title='Edit group' onClose={() => setIsEditing(false)} onSubmit={editGroup} groupMembers={groupMembers} defaultValues={group} /></Modal>}
        </>
    )
}

export default GroupActions;