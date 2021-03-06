import React from "react";
import { Button } from 'reactstrap'
import { Sentry } from 'react-activity';
import 'react-activity/lib/Sentry/Sentry.css';
import { defaultAvatar } from '../default/defaultImages'
import Report from '../shared/Report';
import ProfileLoading from './ProfileLoading'
import CustomTooltip from '../hoc/CustomTooltip'

const Banner = ({ user, changeAvatar, triggerClick, id, auth, toggleFollow, verifyEmail, isFavorite, UI, loading}) => {
  return (
    <section className="banner">
    {!loading ? 
      <div className="inner-banner flex spb ac frw">
        <div className="left-col flex fc ac jc">
          {!id ? <div className="avatar private-avatar mb-3 flex jc ac fc" onClick={triggerClick} style={{ background: `url(${user.image ? user.image : defaultAvatar}) no-repeat center / cover` }}>
            { UI.loading ?
              <Sentry/>:
              <input id="changeAvatar" onChange={changeAvatar} name="banner" hidden type="file" />
            }
          </div>:
          <div className="mb-3 flex jc ac fc avatar" style={{ background: `url(${user.image ? user.image : defaultAvatar}) no-repeat center / cover` }}/>
          }
          {!id && !auth.emailVerified && (
            <Button outline color="danger" size="sm" onClick={verifyEmail}>
              Verify your email
            </Button>
          )} 
          {!id && 
            <React.Fragment>
              <i className="fas fa-info-circle" id="imageInfo"></i>
              <CustomTooltip placement="bottom" target="imageInfo">
                <small>
                  <strong>Format accepted</strong>: jpg, png<br />
                  <strong>Maximum width</strong>: 1200px<br />
                  <strong>Maximum height</strong>: 1200px
                </small>
              </CustomTooltip>
            </React.Fragment>
          }
          {((id && auth.uid !== user.id) || (id && !auth.uid)) && <Report type="profile" data={user} />}
        </div>
        <div className="right-col">
          <header className="author-name flex spb afs">
            <h2>{user.username}</h2>
            {(id && (auth.uid !== id)) && (
              <button className={`follow-btn ${isFavorite ? 'follow-btn-outlined': 'follow-btn-full'}`} onClick={toggleFollow}>{isFavorite ? 'Unfollow': 'Follow'}</button>
            )}
          </header>
          <div className="stats">
            <span className="mr-2">
              <strong>{user.stories.length}</strong>{" "}
              {user.stories.length > 1 ? "stories" : "story"}
            </span>
            <span className="mr-2">
              <strong>{user.likesCount}</strong>{" "}
              {user.likesCount > 1 ? "followers" : "follower"}
            </span>
            <span>
              <strong>{user.favorites.followings && user.favorites.followings.length}</strong> 
              {" "} following
              {user.favorites.followings && user.favorites.followings.length > 1 ? "s" : ""}{" "}
            </span>
          </div>
          <hr/>
          <p className="biography">{user.biography}</p>
          <div className="social flex fs ac mt-3">
            {user.twitter && 
              <div className="icon twitter">
                <a href={user.twitter} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter" />
                </a>
              </div>
            }
            {user.facebook &&
              <div className="icon facebook">
                <a href={user.facebook} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook" />
                </a>
              </div>
            }
            {user.instagram &&
              <div className="icon instagram">
                <a href={user.instagram} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram" />
                </a>
              </div>
            }
          </div>
        </div>
      </div>:
      <ProfileLoading/>}
    </section>
  );
};

export default Banner;
