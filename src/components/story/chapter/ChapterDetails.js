import React, {Fragment} from 'react'
import CharactersAndLocationsInChapter from './CharactersAndLocationsInChapter';
import Comments from './Comments'
import { Link } from 'react-router-dom'
import Moment from 'react-moment';
import { Squares } from 'react-activity';
import 'react-activity/lib/Squares/Squares.css';
import SimpleBar from 'simplebar-react';
import { languages } from '../addStory/metadatas'
import { defaultBanner } from '../../default/defaultImages'

import ChapterNotFound from './ChapterNotFound'
import Ratings from './Ratings'
import { siteName } from '../../../config/keys'
import ShareButtons from '../../shared/ShareButtons';

const ChapterDetails = ({ previous, next, locations, characters, story, chapter, match, comments, params, category, loading, auth, chapterNotFound, innerWidth, innerHeight }) => {
  const language = languages.find(l => l.code === story.language)
  const title = `Read: ${story.title} - ${chapter.title} on ${siteName}`
  const height = innerHeight <= 720 ? 'calc(100vh - 90px)': '80vh'
  return innerWidth >= 850 ?
    <SimpleBar style={{ height: height }}>
      <section className="story-details p-4">
        { !chapterNotFound ?
          !loading ? 
        <Fragment>
          <div className="upper-band flex as spb">
            <Link className="square-btn primary-btn outlined" to={`/story/${match.params.id}/`}>
              <i className="fas fa-long-arrow-alt-left"></i> Back to story
            </Link>
            {auth.uid === chapter.authorId &&
              <Link className="square-btn primary-btn outlined" to={`/story/${story.id}/chapter/${chapter.id}/edit`}>
                <i className="far fa-edit"></i> Edit
              </Link>
            }
          </div>
          <hr/>
          <div className="chapter-content">
            <h3 className="text-center mb-4">{chapter && chapter.title}</h3>
            <div className="meta">
              <small>
                Posted <Moment fromNow>{new Date(chapter.createdAt)}</Moment>
              </small>
            </div>
            <hr/>
              <p dangerouslySetInnerHTML={{__html: chapter && chapter.body}} className="body"></p>
          </div>
          {story.public && <Ratings chapter={chapter} id={params.id} chapid={params.chapid} /> }
          <nav className="chapter-nav flex spb ac frn mt-4">
            <Link className={`square-btn primary-btn outlined ${!previous ? 'hidden': null}`} to={`/story/${story.id}/chapter/${previous && previous.id}`}>Prev</Link>
            <Link className={`square-btn primary-btn outlined ${!next ? 'hidden': null}`} to={`/story/${story.id}/chapter/${next && next.id}`}>Next</Link>
          </nav>
          <hr/>
          <CharactersAndLocationsInChapter locations={chapter.locations} auth={auth} characters={chapter.characters}/>
          <hr/>
          {story.public && <Comments story={story} chapter={chapter} params={params} comments={comments}/>}
        </Fragment>: 
        <Squares/>:
        <ChapterNotFound link={`/story/${story.id}`}/>}
      </section>
    </SimpleBar>:
    <section className="story-details p-4">
      {!chapterNotFound ?
        !loading ?
          <Fragment>
            <div className="upper-band flex as spb">
              <Link className="square-btn primary-btn outlined" to={`/story/${match.params.id}/`}>
                <i className="fas fa-long-arrow-alt-left"></i> Back to story
            </Link>
              {auth.uid === chapter.authorId &&
                <Link className="square-btn primary-btn outlined" to={`/story/${story.id}/chapter/${chapter.id}/edit`}>
                <i className="far fa-edit"></i> Edit
              </Link>
              }
            </div>
            <hr />
            <div className="chapter-content">
              <h3 className="text-center mb-4">{chapter && chapter.title}</h3>
              <div className="meta">
                <small>
                  Posted <Moment fromNow>{new Date(chapter.createdAt)}</Moment>
                </small>
                <br />
                <small className="meta-responsive">
                  Author: <Link to={`/profile/${story.authorId}`}> {story.authorName}</Link>  /
                Status: {story.status} /
                Genre: <Link to={`/categories/${category && category.id}`}>{category && category.name}</Link> /
                Rating: {story.rating} /
                Language: {`${language && language.lang} (${language && language.code})`}
                </small>
              </div>
              <hr />
              <p dangerouslySetInnerHTML={{ __html: chapter && chapter.body }} className="body"></p>
            </div>
            {story.public && <Ratings chapter={chapter} id={params.id} chapid={params.chapid} /> }
            <small>Share this chapter on social media</small>
            <ShareButtons title={title} image={story.banner ? story.banner: defaultBanner}/>
            <nav className="chapter-nav flex spb ac frn mt-4">
              <Link className={`square-btn primary-btn outlined ${!previous ? 'hidden' : null}`} to={`/story/${story.id}/chapter/${previous && previous.id}`}>Prev</Link>
              <Link className={`square-btn primary-btn outlined ${!next ? 'hidden' : null}`} to={`/story/${story.id}/chapter/${next && next.id}`}>Next</Link>
            </nav>
            <hr />
            <CharactersAndLocationsInChapter locations={chapter.locations} auth={auth} characters={chapter.characters} />
            <hr />
            {story.public && <Comments story={story} chapter={chapter} params={params} comments={comments} />}
          </Fragment> :
          <Squares /> :
        <ChapterNotFound link={`/story/${story.id}`} />}
    </section>
}

export default ChapterDetails
