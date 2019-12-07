import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileCourse from './ProfileCourse';
import ProfileGithub from './ProfileGithub';
import { getCurrentProfile } from '../../actions/profile';
import ProfileResume from './ProfileResume';
import copy from "copy-to-clipboard";

const MyProfile = ({
  getCurrentProfile,
  profile: { profile, loading },
  auth
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <Fragment>
      {loading || profile === null ? (
        <Spinner />
      ) : (
          <Fragment>
            <Link to='/profiles' className='btn btn-light'>
              Go To Profiles
          </Link>
            {auth.isAuthenticated && auth.loading === false && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
            </Link>
            )}
            <div className='profile-grid my-1'>
              <ProfileTop profile={profile} edit={true} />
              <ProfileAbout profile={profile} edit={true} />
              <div className='profile-exp bg-white p-2'>
                <h2 className='text-primary'>
                  {' '}
                  <i className='fas fa-user-tie' /> Experience
                {auth.isAuthenticated && auth.loading === false && (
                    <Link to='/add-experience' className='btn btn-gray rightside'>
                      <i className='fas fa-plus-circle' /> Add Experience
                  </Link>
                  )}
                </h2>
                <Fragment>
                  {profile.experience.map(experience => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                      edit={true}
                    />
                  ))}
                </Fragment>
              </div>
              <div className='profile-edu bg-white p-2'>
                <h2 className='text-primary'>
                  <i className='fas fa-user-graduate' /> Education
                {auth.isAuthenticated && auth.loading === false && (
                    <Link to='/add-education' className='btn btn-gray rightside'>
                      <i className='fas fa-plus-circle' /> Add Education
                  </Link>
                  )}
                </h2>
                <Fragment>
                  {profile.education.map(education => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                      edit={true}
                    />
                  ))}
                </Fragment>
              </div>
              <div className='profile-course bg-white p-2'>
                <h2 className='text-primary'>
                  <i className='fas fa-user-graduate' /> Projects
                {auth.isAuthenticated &&
                    auth.loading === false &&
                    (<Link to='/add-course' className='btn btn-gray rightside'>
                      <i className='fas fa-plus-circle' /> Add Projects
                    </Link>
                    )}
                </h2>
                <br />
                <Fragment>
                  {profile.courses.map(course => (
                    <ProfileCourse
                      key={course._id}
                      course={course}
                      edit={true}
                    />
                  ))}
                </Fragment>
              </div>
              <div className='profile-github bg-white p-2'>
                {auth.isAuthenticated &&
                  auth.loading === false && (
                    <Link to={'/edit-profile'}>
                      <i
                        title='Edit'
                        className='fas fa-edit rightside bigger text-primary'
                      />
                    </Link>)}
                < h2 className='text-primary my-1'>
                  <i className="fab fa-github"></i> {'  '}
                  Social Network Profiles</h2>
                {profile.githubusername && (
                  <ProfileGithub username={profile.githubusername} edit={
                    true
                  } />
                )}
                <button
                  title='Copy Github'
                  onClick={() =>{copy(profile.githubusername);
                          }}
                  className='btn-del rightside'
                >
                  {}
                  <i class="fas fa-copy"></i>
                </button>
                <div class="myprofilegithub">
                  <h4>Github Profile: <a href={profile.githubusername}> {profile.githubusername}</a></h4>
                </div>
                <button
                  title='Copy LinkedIn'
                  onClick={() =>{copy(profile.social.linkedin);
                          }}
                  className='btn-del rightside'
                >
                  {}
                  <i class="fas fa-copy"></i>
                </button>
                <div class="myprofilelinkedin">
                  <h4>LinkedIN Profile: <a href={profile.social.linkedin}> {profile.social.linkedin}</a></h4>
                </div>
                <button
                  title='Copy Twitter'
                  onClick={() =>{copy(profile.social.twitter);
                          }}
                  className='btn-del rightside'
                >
                  {}
                  <i class="fas fa-copy"></i>
                </button>
                <div class="myprofiletwitter">
                  <h4>Twitter Profile: <a href={profile.social.twitter}> {profile.social.twitter}</a></h4>
                </div>
                <button
                  title='Copy Instagram'
                  onClick={() =>{copy(profile.social.instagram);
                          }}
                  className='btn-del rightside'
                >
                  {}
                  <i class="fas fa-copy"></i>
                </button>
                <div class="myprofileinstagram">
                  <h4>Instagram Profile: <a href={profile.social.instagram}> {profile.social.instagram}</a></h4>
                </div>
                <button
                  title='Copy Youtube url'
                  onClick={() =>{copy(profile.social.youtube);
                          }}
                  className='btn-del rightside'
                >
                  {}
                  <i class="fas fa-copy"></i>
                </button>
                <div class="myprofileyoutube">
                  <h4>Youtube Profile: <a href={profile.social.youtube}> {profile.social.youtube}</a></h4>
                </div>
              
              </div>

              <div className='profile-resume bg-white p-2'>
                <h2 className='text-primary'>
                  <i className="fas fa-file-pdf"></i> {'   '}
                  Resume
                    <Link to='/upload-resume' className='btn btn-gray rightside'>
                    <i className='fas fa-plus-circle' /> Add or update your resume (in pdf)
                  </Link>
                </h2>
                {profile.resume && profile.resume.url !== '' && (<ProfileResume resume={profile.resume} edit={true}
                />)}
              </div>
            </div>
          </Fragment>
        )}
    </Fragment>
  );
};

MyProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(MyProfile);
