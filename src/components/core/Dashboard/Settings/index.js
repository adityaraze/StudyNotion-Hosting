import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'

const Settings = () => {
  return (
    <>
        <h1>Edit Profile</h1>
        {/* chnage profile picture */}
        <ChangeProfilePicture/>
        {/* profile */}
        <EditProfile/>
        {/* password */}
        <UpdatePassword/>
        {/* Delete Account */}
        <DeleteAccount/>
    </>
  )
}

export default Settings