import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItemAuth = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, picture, user, likes, comments, date },
  showActions
}) => (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={picture === '' ? avatar : picture} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          {/* Posted on <Moment format='lll'>{date}</Moment>
         */}
          {/* <Moment fromNow>{moment.utc(date)}</Moment> */}
          <Moment fromNow>{date}</Moment>
          {/* <p>Posted {moment(date).calendar()}</p>
        <div>Posted {moment(date).format('MM/DD/YYYY')}</div>
        Posted on <Moment format='lll'>{date}</Moment> */}
        </p>

        {showActions && (
          <Fragment>
            <button
              onClick={() => addLike(_id)}
              type='button'
              className='btn btn-gray'
            >
              <i className='fas fa-thumbs-up' />{' '}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button
              onClick={() => removeLike(_id)}
              type='button'
              className='btn btn-gray'
            >
              <i className='fas fa-thumbs-down' />
            </button>
            <Link to={`/posts-auth/${_id}`} className='btn btn-primary'>
              Discussion{' '}
              {comments.length > 0 && (
                <span className='comment-count'>{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={() => deletePost(_id)}
                type='button'
                className='btn-del rightside top1rem'
              >
                <i className='fa fa-times-circle' />
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );

PostItemAuth.defaultProps = {
  showActions: true
};

PostItemAuth.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItemAuth);