import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { getStory, deleteChapter, cleanup } from '../../redux/actions/storyActions'
import { addStoryToFavorite, removeStoryFormFavorite } from '../../redux/actions/listActions'
import PropTypes from 'prop-types'

import StoryBanner from './StoryBanner'
import StoryDetails from './StoryDetails'
import Loading from '../shared/Loading'
import NotFound from '../shared/NotFound'
import Private from '../shared/Private'

class Story extends Component {

  _isMounted = false;

  state = {
    windowWidth: window.innerWidth
  }

  updateDimensions = () => {
    this.setState({ innerWidth: window.innerWidth });
  }

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.props.getStory(this.props.match.params.id)
    }
    window.addEventListener("resize", this.updateDimensions)
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (!this.state.hasOwnProperty('rating') && nextProps.isFavorite) {
      this.setState({ rating: 1 })
    }

    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.getStory(nextProps.match.params.id)
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.props.cleanup()
    window.removeEventListener("resize", this.updateDimensions);
  }

  deleteChapter = (id, e) => {
    const confirmation = window.confirm("Do you really want to delete this chapter ?")
    if (confirmation) {
      this.props.deleteChapter(this.props.match.params.id, id, this.props.history)
    }
  }

  changeRating = e => {
    if (!this.props.isFavorite) {
      this.props.addStoryToFavorite(this.props.match.params.id, this.props.isFavorite)
      this.setState({ rating: 1 })
    } else {
      this.props.removeStoryFormFavorite(this.props.match.params.id, this.props.isFavorite)
      this.setState({ rating: 0 })
    }
  }

  render() {
    return (
      <main className="inner-main">
      {!this.props.loading ?
        !this.props.notFound ?
        this.props.story.public || (this.props.story.authorId === this.props.auth.uid) ?
        <div className="story">
          <StoryBanner story={this.props.story} id={this.props.match.params.id}/>
          <StoryDetails 
            innerWidth={this.state.windowWidth}
            chapters={this.props.chapters}
            profile={this.props.profile} 
            deleteChapter={this.deleteChapter} 
            isFavorite={this.props.isFavorite}
            auth={this.props.auth} 
            story={this.props.story} 
            id={this.props.match.params.id} 
            chapid={this.props.match.params.chapid}
            changeRating={this.changeRating}
            UI={this.props.UI}
          />
        </div>:
      <Private type="Private story" data={this.props.auth} />:
      <NotFound />:
      <Loading /> }
      </main>
    )
  }
}

Story.propTypes = {
  story: PropTypes.shape({
    summary: PropTypes.string,
    chapters: PropTypes.array,
    likesCount: PropTypes.number
  }),
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getStory: PropTypes.func.isRequired,
  deleteChapter: PropTypes.func.isRequired,
  notFound: PropTypes.bool.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const auth = state.firebase.auth
  const storiesLikes = state.firestore.ordered.storiesLikes
  const isFavorite = storiesLikes && storiesLikes.some(like => like.senderId === auth.uid && like.storyId === ownProps.match.params.id)
  return {
    story: state.story.story,
    auth,
    profile: state.firebase.profile,
    chapters: state.story.chapters,
    isFavorite,
    loading: state.story.loading,
    notFound: state.story.notFound,
    UI: state.UI
  }
}

export default compose(connect(mapStateToProps, { getStory, deleteChapter, addStoryToFavorite, removeStoryFormFavorite, cleanup }), firestoreConnect([{collection: 'stories'}, {collection: 'storiesLikes'}]))(Story)

