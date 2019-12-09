import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileGithub from './ProfileGithub';
import copy from "copy-to-clipboard";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    social,
    githubusername,
    git = 'https://www.github.com/' + githubusername,
    user: { name }
  },
  edit
}) => (
    <div className='profile-about bg-light p-2'>
      {bio && (
        <Fragment>
          {edit && (
            <Link to={'/edit-profile'}>
              <i title='Edit' className='fas fa-edit bigger rightside' />
            </Link>
          )}
          <h2 className='text-primary text-center'>About Me</h2>
          <br />
          <p>{bio}</p>
          <br />
          <div className='line' />
        </Fragment>
      )}
      {social && (
        <Fragment>
      <h2 className='text-primary'>Social Network Profiles</h2>
      <div className='profiles'>
        <button
          title='Copy Github'
          onClick={() =>{copy(git);
                  }}
          className='btn-del rightside'
        >
          {}
          <i class="fas fa-copy"></i>
        </button>
        <div class="myprofilegithub text-left">
          <h4>Github Profile: <a href={git}> {git}</a></h4>
        </div>
        <button
          title='Copy LinkedIn'
          onClick={() =>{copy(social.linkedin);
                  }}
          className='btn-del rightside'
        >
          {}
          <i class="fas fa-copy"></i>
        </button>
        <div className='myprofilelinkedin text-left'>
          <h4>LinkedIn Profile: <a href={social.linkedin}> {social.linkedin}</a></h4>
        </div>
        <button
          title='Copy Leetcode'
          onClick={() =>{copy(social.leetcode);
                  }}
          className='btn-del rightside'
        >
          {}
          <i class="fas fa-copy"></i>
        </button>
        <div class="myprofileleetcode text-left">
          <h4>Leetcode Profile: <a href={social.leetcode}> {social.leetcode}</a></h4>
        </div>
        <button
          title='Copy Twitter'
          onClick={() =>{copy(social.twitter);
                  }}
          className='btn-del rightside'
        >
          {}
          <i class="fas fa-copy"></i>
        </button>
        <div class='myprofiletwittter text-left'>
          <h4>Twitter Profile: <a href={social.twitter}> {social.twitter}</a></h4>
        </div>
        <button
          title='Copy Instagram'
          onClick={() =>{copy(social.instagram);
                  }}
          className='btn-del rightside'
        >
          {}
          <i class="fas fa-copy"></i>
        </button>
        <div class="myprofileinstagram text-left">
          <h4>Instagram Profile: <a href={social.instagram}> {social.instagram}</a></h4>
        </div>
      </div>
      <div className=''></div>
      </Fragment>)}
    </div>
  );

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
